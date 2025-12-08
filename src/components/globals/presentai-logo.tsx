import { cn } from "@/lib/utils";
import type React from "react";

export default function PresentAILogo(
    props: React.ButtonHTMLAttributes<HTMLDivElement> & { className?: string },
) {
    return (
        <div className={cn("h-7 w-24", props.className)} {...props}>
            <svg viewBox="0 0 85 15" className="h-full w-full">
                <text
                    x="1"
                    y="12"
                    className="fill-dbi font-semibold tracking-tight"
                    fontSize="13"
                >
                    PresentAI
                </text>
            </svg>
        </div>
    );
}
