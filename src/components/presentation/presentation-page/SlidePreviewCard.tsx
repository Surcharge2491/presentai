import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface SlidePreviewCardProps {
  index: number;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function SlidePreviewCard({
  index,
  isActive,
  onClick,
  children,
}: SlidePreviewCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.2);
  const [height, setHeight] = useState<number | undefined>(undefined);

  const BASE_WIDTH = 1024; // Logical slide width to scale from

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    const update = () => {
      const containerRect = container.getBoundingClientRect();
      const newScale =
        containerRect.width > 0 ? containerRect.width / BASE_WIDTH : 0.2;
      setScale(newScale);

      // After scale is applied, measure scaled height
      requestAnimationFrame(() => {
        if (!contentRef.current) return;
        const rect = contentRef.current.getBoundingClientRect();
        setHeight(rect.height || undefined);
      });
    };

    const resizeObserver = new ResizeObserver(() => update());
    resizeObserver.observe(container);
    // also observe content in case fonts load and change height
    resizeObserver.observe(content);

    update();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300",
        "hover:shadow-lg hover:scale-105 hover:-translate-y-0.5",
        isActive
          ? "border-primary ring-2 ring-primary/20 shadow-xl shadow-primary/10"
          : "border-border/50 hover:border-primary/50",
      )}
      onClick={onClick}
    >
      <div className={cn(
        "absolute left-2 top-2 z-10 rounded-md px-2 py-1 text-xs font-bold shadow-sm transition-all",
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-background/80 backdrop-blur-sm text-muted-foreground group-hover:bg-primary/10"
      )}>
        {index + 1}
      </div>
      <div
        ref={containerRef}
        className="pointer-events-none w-full overflow-hidden bg-card"
        style={{
          height: height ?? undefined,
          aspectRatio: height === undefined ? "16/9" : undefined,
          // scale: height === undefined ? `${scale}` : undefined,
          transition: "height 150ms ease-in-out",
        }}
      >
        <div
          ref={contentRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: BASE_WIDTH,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
