"use server";

import { utapi } from "@/app/api/uploadthing/core";
import { env } from "@/env";
import { requireUser } from "@/lib/supabase-server";
import { db } from "@/server/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Together from "together-ai";
import { UTFile } from "uploadthing/server";

const together = new Together({ apiKey: env.TOGETHER_AI_API_KEY });
const genAI = new GoogleGenerativeAI(env.GOOGLE_AI_API_KEY ?? "");

export type ImageModelList =
  | "black-forest-labs/FLUX1.1-pro"
  | "black-forest-labs/FLUX.1-schnell"
  | "black-forest-labs/FLUX.1-schnell-Free"
  | "black-forest-labs/FLUX.1-pro"
  | "black-forest-labs/FLUX.1-dev"
  | "gemini-2.5-flash-image"
  | "gemini-3-pro-image-preview";

export async function generateImageAction(
  prompt: string,
  model: ImageModelList = "black-forest-labs/FLUX.1-schnell-Free",
) {
  // Get the current user
  const user = await requireUser();

  try {
    console.log(`Generating image with model: ${model}`);

    let imageUrl: string;

    // Check if using Gemini (Nano Banana) or Together AI (FLUX)
    if (model.startsWith("gemini")) {
      // Use Google Generative AI (Nano Banana)
      const geminiModel = genAI.getGenerativeModel({ model });
      const result = await geminiModel.generateContent(prompt);
      const response = result.response;

      // Extract base64 image from response
      const imagePart = response.candidates?.[0]?.content?.parts?.[0];
      if (!imagePart || !("inlineData" in imagePart) || !imagePart.inlineData) {
        throw new Error("Failed to generate image with Gemini");
      }

      // Convert base64 to URL for downloading
      const base64Data = imagePart.inlineData.data;
      const mimeType = imagePart.inlineData.mimeType;
      imageUrl = `data:${mimeType};base64,${base64Data}`;
    } else {
      // Use Together AI for FLUX models
      const response = (await together.images.create({
        model: model,
        prompt: prompt,
        width: 1024,
        height: 768,
        steps: model.includes("schnell") ? 4 : 28,
        n: 1,
      })) as unknown as {
        id: string;
        model: string;
        object: string;
        data: {
          url: string;
        }[];
      };

      imageUrl = response.data[0]?.url ?? "";

      if (!imageUrl) {
        throw new Error("Failed to generate image");
      }
    }

    console.log(`Generated image URL: ${imageUrl}`);

    // Download the image from Together AI or Gemini Nano Banana
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error("Failed to download generated image");
    }

    const imageBlob = await imageResponse.blob();
    const imageBuffer = await imageBlob.arrayBuffer();

    // Generate a filename based on the prompt
    const filename = `${prompt.substring(0, 20).replace(/[^a-z0-9]/gi, "_")}_${Date.now()}.png`;

    // Create a UTFile from the downloaded image
    const utFile = new UTFile([new Uint8Array(imageBuffer)], filename);

    // Upload to UploadThing
    const uploadResult = await utapi.uploadFiles([utFile]);

    if (!uploadResult[0]?.data?.ufsUrl) {
      console.error("Upload error:", uploadResult[0]?.error);
      throw new Error("Failed to upload image to UploadThing");
    }

    console.log(uploadResult);
    const permanentUrl = uploadResult[0].data.ufsUrl;
    console.log(`Uploaded to UploadThing URL: ${permanentUrl}`);

    // Store in database with the permanent URL
    const generatedImage = await db.generatedImage.create({
      data: {
        url: permanentUrl, // Store the UploadThing URL instead of the Together AI URL
        prompt: prompt,
        userId: user.id,
      },
    });

    return {
      success: true,
      image: generatedImage,
    };
  } catch (error) {
    console.error("Error generating image:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate image",
    };
  }
}
