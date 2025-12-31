"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardFilterBar } from "@/components/dashboard/DashboardFilterBar";
import { PresentationCard } from "@/components/dashboard/PresentationCard";
import { EmptyState } from "@/components/dashboard/EmptyStates";
import { usePresentationState } from "@/states/presentation-state";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DocumentType } from "@prisma/client";

// Mock data for demo
const mockPresentations = [
  {
    id: "1",
    type: DocumentType.PRESENTATION,
    userId: "demo-user",
    createdAt: new Date("2025-12-20"),
    updatedAt: new Date("2025-12-30"),
    title: "Hello: The Power of a Simple Greeting",
    thumbnailUrl: null,
    isPublic: false,
    documentType: "presentation",
    presentation: {
      id: "p1",
      content: {},
      theme: "default",
    },
  },
  {
    id: "2",
    type: DocumentType.PRESENTATION,
    userId: "demo-user",
    createdAt: new Date("2025-12-18"),
    updatedAt: new Date("2025-12-28"),
    title: "Q4 Marketing Strategy",
    thumbnailUrl: null,
    isPublic: false,
    documentType: "presentation",
    presentation: {
      id: "p2",
      content: {},
      theme: "default",
    },
  },
  {
    id: "3",
    type: DocumentType.PRESENTATION,
    userId: "demo-user",
    createdAt: new Date("2025-12-15"),
    updatedAt: new Date("2025-12-25"),
    title: "Product Launch Deck 2025",
    thumbnailUrl: null,
    isPublic: true,
    documentType: "presentation",
    presentation: {
      id: "p3",
      content: {},
      theme: "default",
    },
  },
  {
    id: "4",
    type: DocumentType.PRESENTATION,
    userId: "demo-user",
    createdAt: new Date("2025-12-10"),
    updatedAt: new Date("2025-12-20"),
    title: "Team Update - December",
    thumbnailUrl: null,
    isPublic: false,
    documentType: "presentation",
    presentation: {
      id: "p4",
      content: {},
      theme: "default",
    },
  },
  {
    id: "5",
    type: DocumentType.PRESENTATION,
    userId: "demo-user",
    createdAt: new Date("2025-12-05"),
    updatedAt: new Date("2025-12-15"),
    title: "Sales Performance Review",
    thumbnailUrl: null,
    isPublic: false,
    documentType: "presentation",
    presentation: {
      id: "p5",
      content: {},
      theme: "default",
    },
  },
  {
    id: "6",
    type: DocumentType.PRESENTATION,
    userId: "demo-user",
    createdAt: new Date("2025-12-01"),
    updatedAt: new Date("2025-12-10"),
    title: "Company Vision 2026",
    thumbnailUrl: null,
    isPublic: true,
    documentType: "presentation",
    presentation: {
      id: "p6",
      content: {},
      theme: "default",
    },
  },
];

export default function DashboardDemoPage() {
  const { dashboardFilter, dashboardView, setCreditBalance } = usePresentationState();
  const [isLoading, setIsLoading] = useState(true);

  // Set mock credit balance
  useEffect(() => {
    setCreditBalance(360);
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [setCreditBalance]);

  const filteredPresentations = mockPresentations.filter((p) => {
    if (dashboardFilter === "all") return true;
    if (dashboardFilter === "created") return true; // All are created by demo user
    if (dashboardFilter === "favorites") return false; // None are favorited in demo
    if (dashboardFilter === "recent") return true; // All are recent
    return true;
  });

  return (
    <DashboardLayout
      sidebar={<DashboardSidebar />}
      header={<DashboardHeader />}
    >
      <div className="flex flex-col h-full">
        {/* Demo Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
          <div className="flex items-center justify-center gap-2 text-amber-800">
            <span className="font-semibold">📺 DEMO MODE</span>
            <span className="text-sm">
              This is a preview with mock data - no authentication or database required
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <DashboardFilterBar />

        {/* Content area */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
              </div>
            ) : filteredPresentations.length === 0 ? (
              <EmptyState filter={dashboardFilter} />
            ) : (
              <div
                className={cn(
                  dashboardView === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "flex flex-col gap-4"
                )}
              >
                {filteredPresentations.map((presentation) => (
                  <PresentationCard
                    key={presentation.id}
                    presentation={presentation}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
