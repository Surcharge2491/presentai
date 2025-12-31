"use client";

import { cn } from "@/lib/utils";

import { Toolbar } from "./toolbar";

export function FixedToolbar(props: React.ComponentProps<typeof Toolbar>) {
  return (
    <Toolbar
      {...props}
      className={cn(
        "supports-backdrop-blur:bg-background/60 fixed-toolbar sticky left-0 top-0 z-50 w-full justify-between overflow-x-auto border-b border-b-border/50 bg-background/80 backdrop-blur-md scrollbar-hide transition-all duration-200 opacity-0 hover:opacity-100 focus-within:opacity-100 -translate-y-full hover:translate-y-0 focus-within:translate-y-0",
        props.className,
      )}
    />
  );
}
