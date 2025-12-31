"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardFilterBar } from "@/components/dashboard/DashboardFilterBar";
import { PresentationCard } from "@/components/dashboard/PresentationCard";
import { EmptyState } from "@/components/dashboard/EmptyStates";
import { usePresentationState } from "@/states/presentation-state";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPresentations } from "@/app/_actions/presentation/fetchPresentations";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { dashboardFilter, dashboardView, setCreditBalance } = usePresentationState();
  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch presentations with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["dashboard-presentations", dashboardFilter],
    queryFn: ({ pageParam = 0 }) => fetchPresentations(pageParam, dashboardFilter),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasMore) {
        return allPages.length;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Mock credit balance (replace with actual fetch from user data)
  useEffect(() => {
    setCreditBalance(360);
  }, [setCreditBalance]);

  const allPresentations = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <DashboardLayout
      sidebar={<DashboardSidebar />}
      header={<DashboardHeader />}
    >
      <div className="flex flex-col h-full">
        {/* Filter bar */}
        <DashboardFilterBar />

        {/* Content area */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-red-600 font-semibold mb-2">Error loading presentations</p>
                <p className="text-gray-600">Please try refreshing the page</p>
              </div>
            ) : allPresentations.length === 0 ? (
              <EmptyState filter={dashboardFilter} />
            ) : (
              <>
                {/* Grid or List view */}
                <div
                  className={cn(
                    dashboardView === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "flex flex-col gap-4"
                  )}
                >
                  {allPresentations.map((presentation) => (
                    <PresentationCard
                      key={presentation.id}
                      presentation={presentation}
                    />
                  ))}
                </div>

                {/* Loading indicator for infinite scroll */}
                <div ref={observerTarget} className="py-8 flex justify-center">
                  {isFetchingNextPage && (
                    <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
