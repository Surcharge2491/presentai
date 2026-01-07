import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { type LanguageModelV1 } from "ai";

/**
 * Centralized model picker function for all presentation generation routes
 * Supports OpenAI, Anthropic, and LM Studio models
 */
export function modelPicker(
  modelProvider: string,
  modelId?: string,
): LanguageModelV1 {
  if (modelProvider === "anthropic" && modelId) {
    // Use Anthropic Claude models
    const anthropic = createAnthropic();
    return anthropic(modelId) as unknown as LanguageModelV1;
  }

  if (modelProvider === "lmstudio" && modelId) {
    // Use LM Studio with OpenAI compatible provider
    const lmstudio = createOpenAI({
      name: "lmstudio",
      baseURL: "http://localhost:1234/v1",
      apiKey: "lmstudio",
    });
    return lmstudio(modelId) as unknown as LanguageModelV1;
  }

  // Default to OpenAI
  const openai = createOpenAI();
  return openai("gpt-4o-mini") as unknown as LanguageModelV1;
}
