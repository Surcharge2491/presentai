"use client";

import { usePresentationState } from "@/states/presentation-state";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardFilterBar() {
  const { dashboardFilter, setDashboardFilter, dashboardView, setDashboardView } =
    usePresentationState();

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      {/* Filter tabs */}
      <Tabs
        value={dashboardFilter}
        onValueChange={(value) =>
          setDashboardFilter(value as "all" | "recent" | "created" | "favorites")
        }
      >
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="recent">Recently viewed</TabsTrigger>
          <TabsTrigger value="created">Created by you</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* View toggle */}
      <div className="flex items-center gap-1 rounded-md border border-gray-200 p-1">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0",
            dashboardView === "grid" && "bg-gray-100"
          )}
          onClick={() => setDashboardView("grid")}
          title="Grid view"
        >
          <Grid3x3 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0",
            dashboardView === "list" && "bg-gray-100"
          )}
          onClick={() => setDashboardView("list")}
          title="List view"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
