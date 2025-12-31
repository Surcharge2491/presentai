"use client";

import { usePresentationState } from "@/states/presentation-state";
import { Menu } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

export function DashboardLayout({
  sidebar,
  header,
  children,
}: DashboardLayoutProps) {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = usePresentationState();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile overlay */}
      {!isSidebarCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:sticky lg:translate-x-0",
          isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
        )}
      >
        {sidebar}
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-4 px-4 py-3 lg:px-6">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsSidebarCollapsed(false)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            {header}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
