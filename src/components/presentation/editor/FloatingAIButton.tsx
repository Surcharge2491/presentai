"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sparkles, Wand2, RefreshCw, Lightbulb } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingAIButtonProps {
  onGenerateContent?: () => void;
  onRewrite?: () => void;
  onImprove?: () => void;
  onSuggest?: () => void;
  className?: string;
}

export function FloatingAIButton({
  onGenerateContent,
  onRewrite,
  onImprove,
  onSuggest,
  className,
}: FloatingAIButtonProps) {
  const [open, setOpen] = useState(false);

  const aiActions = [
    {
      label: "Generate Content",
      icon: <Sparkles className="h-4 w-4" />,
      action: onGenerateContent,
      description: "AI writes content for this slide",
    },
    {
      label: "Rewrite",
      icon: <RefreshCw className="h-4 w-4" />,
      action: onRewrite,
      description: "Improve existing content",
    },
    {
      label: "Improve",
      icon: <Wand2 className="h-4 w-4" />,
      action: onImprove,
      description: "Enhance clarity and style",
    },
    {
      label: "Get Suggestions",
      icon: <Lightbulb className="h-4 w-4" />,
      action: onSuggest,
      description: "AI-powered recommendations",
    },
  ];

  return (
    <div className={cn("fixed bottom-8 left-1/2 -translate-x-1/2 z-50", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            className={cn(
              "rounded-full shadow-2xl transition-all duration-300",
              "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700",
              "text-white font-semibold px-6 py-6 h-auto",
              "hover:scale-110 hover:shadow-violet-500/50",
              "animate-pulse hover:animate-none"
            )}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Ask AI
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className="w-80 p-3 bg-white/95 backdrop-blur-lg border-violet-200 shadow-2xl"
        >
          <div className="space-y-1">
            <p className="text-sm font-semibold text-violet-900 mb-3 px-2">
              ✨ AI Actions
            </p>
            {aiActions.map((action) => (
              <Button
                key={action.label}
                variant="ghost"
                className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-violet-50 hover:text-violet-900 transition-colors"
                onClick={() => {
                  action.action?.();
                  setOpen(false);
                }}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="mt-0.5 text-violet-600">{action.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{action.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {action.description}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
