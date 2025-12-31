"use client";

import { usePresentationState } from "@/states/presentation-state";
import {
  FileText,
  Share2,
  Globe,
  Image as ImageIcon,
  Folder,
  Layout,
  Palette,
  Type,
  Trash2,
  Settings,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  disabled?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    items: [
      { id: "gammas", label: "Gammas", icon: FileText, href: "/dashboard" },
      {
        id: "shared",
        label: "Shared with you",
        icon: Share2,
        href: "/dashboard/shared",
        disabled: true,
      },
      {
        id: "sites",
        label: "Sites",
        icon: Globe,
        href: "/dashboard/sites",
        disabled: true,
      },
      {
        id: "ai-images",
        label: "AI Images",
        icon: ImageIcon,
        href: "/dashboard/ai-images",
        disabled: true,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        id: "folders",
        label: "Folders",
        icon: Folder,
        href: "/dashboard/folders",
        disabled: true,
      },
    ],
  },
];

const bottomNavigationItems: NavItem[] = [
  {
    id: "templates",
    label: "Templates",
    icon: Layout,
    href: "/dashboard/templates",
    disabled: true,
  },
  {
    id: "themes",
    label: "Themes",
    icon: Palette,
    href: "/dashboard/themes",
    disabled: true,
  },
  {
    id: "custom-fonts",
    label: "Custom fonts",
    icon: Type,
    href: "/dashboard/custom-fonts",
    disabled: true,
  },
  { id: "trash", label: "Trash", icon: Trash2, href: "/dashboard/trash", disabled: true },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  { id: "support", label: "Support", icon: HelpCircle, href: "/support", disabled: true },
];

export function DashboardSidebar() {
  const { dashboardSidebarSection, setDashboardSidebarSection } = usePresentationState();

  const handleNavClick = (itemId: string) => {
    setDashboardSidebarSection(itemId);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
            P
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            PresentAI
          </span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navigationSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            {section.title && (
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = dashboardSidebarSection === item.id;
                const isDisabled = item.disabled;

                if (isDisabled) {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-not-allowed opacity-50"
                      title="Coming soon"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href ?? "#"}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 px-3 py-4">
        <div className="space-y-1">
          {bottomNavigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = dashboardSidebarSection === item.id;
            const isDisabled = item.disabled;

            if (isDisabled) {
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-not-allowed opacity-50"
                  title="Coming soon"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href ?? "#"}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
