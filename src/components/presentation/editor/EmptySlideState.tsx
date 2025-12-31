"use client";

import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Type,
  ImageIcon,
  LayoutGrid,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptySlideStateProps {
  onAddText?: () => void;
  onAddImage?: () => void;
  onAddLayout?: () => void;
  onUseAI?: () => void;
  className?: string;
}

export function EmptySlideState({
  onAddText,
  onAddImage,
  onAddLayout,
  onUseAI,
  className,
}: EmptySlideStateProps) {
  const quickActions = [
    {
      label: "Add Text",
      icon: <Type className="h-5 w-5" />,
      action: onAddText,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      label: "Add Image",
      icon: <ImageIcon className="h-5 w-5" />,
      action: onAddImage,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      label: "Add Layout",
      icon: <LayoutGrid className="h-5 w-5" />,
      action: onAddLayout,
      gradient: "from-orange-500 to-red-500",
    },
    {
      label: "Use AI",
      icon: <Sparkles className="h-5 w-5" />,
      action: onUseAI,
      gradient: "from-violet-500 to-indigo-500",
    },
  ];

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center p-12",
        className
      )}
    >
      <div className="text-center space-y-8 max-w-md">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 blur-2xl opacity-20 animate-pulse" />
            <div className="relative rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 p-6">
              <Lightbulb className="h-12 w-12 text-violet-600" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Start Creating
          </h3>
          <p className="text-muted-foreground text-sm">
            Click anywhere to start typing, or choose a quick action below
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className={cn(
                "h-auto flex-col gap-2 py-4 hover:scale-105 transition-all duration-200",
                "hover:shadow-lg border-2"
              )}
              onClick={action.action}
            >
              <div
                className={cn(
                  "rounded-full p-2 bg-gradient-to-br",
                  action.gradient
                )}
              >
                <div className="text-white">{action.icon}</div>
              </div>
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Tip */}
        <div className="pt-4 text-xs text-muted-foreground italic">
          💡 Pro tip: Use the vertical toolbar on the right for more options
        </div>
      </div>
    </div>
  );
}
