"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePresentationState } from "@/states/presentation-state";
import {
  Sparkles,
  Plus,
  Upload,
  FileText,
  Image as ImageIcon,
  Coins,
  Crown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import SideBarDropdown from "@/components/auth/Dropdown";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  const router = useRouter();
  const { creditBalance } = usePresentationState();

  const handleNewPresentation = () => {
    router.push("/presentation");
  };

  const handleCreateWithAI = () => {
    // Trigger AI generation modal or flow
    router.push("/presentation?ai=true");
  };

  return (
    <div className="flex flex-1 items-center justify-between">
      {/* Left side - Action buttons */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handleCreateWithAI}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Create new AI
        </Button>

        <Button onClick={handleNewPresentation} variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          New gamma
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem disabled className="cursor-not-allowed opacity-50">
              <FileText className="mr-2 h-4 w-4" />
              Import PPTX
            </DropdownMenuItem>
            <DropdownMenuItem disabled className="cursor-not-allowed opacity-50">
              <FileText className="mr-2 h-4 w-4" />
              Import PDF
            </DropdownMenuItem>
            <DropdownMenuItem disabled className="cursor-not-allowed opacity-50">
              <ImageIcon className="mr-2 h-4 w-4" />
              Import Images
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right side - Credits and profile */}
      <div className="flex items-center gap-4">
        {/* Credit balance */}
        <Badge
          variant="secondary"
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium"
        >
          <Coins className="h-4 w-4 text-amber-500" />
          <span>{creditBalance} credits</span>
        </Badge>

        {/* Upgrade to Pro button */}
        <Button
          onClick={() => router.push("/pricing")}
          variant="default"
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
        >
          <Crown className="mr-2 h-4 w-4" />
          Upgrade to Pro
        </Button>

        {/* User profile dropdown */}
        <SideBarDropdown />
      </div>
    </div>
  );
}
