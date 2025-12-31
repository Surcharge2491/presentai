"use server";
import "server-only";

import { requireUser } from "@/lib/supabase-server";
import { db } from "@/server/db";
import { type Prisma, DocumentType } from "@prisma/client";

export type PresentationDocument = Prisma.BaseDocumentGetPayload<{
  include: {
    presentation: true;
  };
}>;

const ITEMS_PER_PAGE = 10;

export type DashboardFilter = "all" | "recent" | "created" | "favorites";

export async function fetchPresentations(
  page = 0,
  filter: DashboardFilter = "all"
) {
  const user = await requireUser();

  const skip = page * ITEMS_PER_PAGE;

  // Base where clause
  const baseWhere: Prisma.BaseDocumentWhereInput = {
    userId: user.id,
    type: DocumentType.PRESENTATION,
  };

  // Modify query based on filter
  let orderBy: Prisma.BaseDocumentOrderByWithRelationInput = {
    updatedAt: "desc",
  };

  // For favorites filter, we need to join with FavoriteDocument
  if (filter === "favorites") {
    const items = await db.baseDocument.findMany({
      where: {
        ...baseWhere,
        favorites: {
          some: {
            userId: user.id,
          },
        },
      },
      orderBy,
      take: ITEMS_PER_PAGE,
      skip: skip,
      include: {
        presentation: true,
        favorites: {
          where: {
            userId: user.id,
          },
        },
      },
    });

    const hasMore = items.length === ITEMS_PER_PAGE;

    return {
      items,
      hasMore,
    };
  }

  // For recent filter, we would use lastViewedAt if it existed
  // For now, it falls back to updatedAt like "all" and "created"
  if (filter === "recent") {
    // TODO: Add lastViewedAt field to BaseDocument schema
    // orderBy = { lastViewedAt: "desc" };
  }

  // "all" and "created" use the same query (both filter by userId already)
  const items = await db.baseDocument.findMany({
    where: baseWhere,
    orderBy,
    take: ITEMS_PER_PAGE,
    skip: skip,
    include: {
      presentation: true,
    },
  });

  const hasMore = items.length === ITEMS_PER_PAGE;

  return {
    items,
    hasMore,
  };
}

export async function fetchPublicPresentations(page = 0) {
  const skip = page * ITEMS_PER_PAGE;

  const [items, total] = await Promise.all([
    db.baseDocument.findMany({
      where: {
        type: DocumentType.PRESENTATION,
        isPublic: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: skip,
      include: {
        presentation: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    }),
    db.baseDocument.count({
      where: {
        type: DocumentType.PRESENTATION,
        isPublic: true,
      },
    }),
  ]);

  const hasMore = skip + ITEMS_PER_PAGE < total;

  return {
    items,
    hasMore,
  };
}

export async function fetchUserPresentations(userId: string, page = 0) {
  const user = await requireUser();
  const currentUserId = user.id;

  const skip = page * ITEMS_PER_PAGE;

  const [items, total] = await Promise.all([
    db.baseDocument.findMany({
      where: {
        userId,
        type: DocumentType.PRESENTATION,
        OR: [
          { isPublic: true },
          { userId: currentUserId }, // Include private presentations if the user is viewing their own
        ],
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: skip,
      include: {
        presentation: true,
      },
    }),
    db.baseDocument.count({
      where: {
        userId,
        type: DocumentType.PRESENTATION,
        OR: [{ isPublic: true }, { userId: currentUserId }],
      },
    }),
  ]);

  const hasMore = skip + ITEMS_PER_PAGE < total;

  return {
    items,
    hasMore,
  };
}
