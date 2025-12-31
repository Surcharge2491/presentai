"use client";

import {
  deletePresentations,
  duplicatePresentation,
  getPresentationContent,
  updatePresentationTitle,
} from "@/app/_actions/presentation/presentationActions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { usePresentationState } from "@/states/presentation-state";
import { type BaseDocument } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExportPresentation } from "@/hooks/use-export-presentation";
import {
  Check,
  Copy,
  Download,
  EllipsisVertical,
  Loader2,
  Pencil,
  Presentation,
  Trash2,
  Lock,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";

interface PresentationCardProps {
  presentation: BaseDocument & {
    presentation: {
      id: string;
      content: unknown;
      theme: string;
    } | null;
  };
  isSelecting?: boolean;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
  isLoading?: boolean;
}

export function PresentationCard({
  presentation,
  isSelecting = false,
  onSelect,
  isSelected = false,
  isLoading: initialLoading = false,
}: PresentationCardProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isExporting, handleExport } = useExportPresentation();
  const setCurrentPresentation = usePresentationState(
    (state) => state.setCurrentPresentation,
  );

  const { mutate: deletePresentationMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: async () => {
        const result = await deletePresentations([presentation.id]);
        if (!result.success && !result.partialSuccess) {
          throw new Error(result.message ?? "Failed to delete presentation");
        }
        return result;
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["dashboard-presentations"],
        });
        setIsDeleteDialogOpen(false);
        toast({
          title: "Success",
          description: "Presentation deleted successfully",
        });
      },
      onError: (error) => {
        console.error("Failed to delete presentation:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete presentation",
        });
      },
    });

  const { mutate: renameMutation, isPending: isRenaming } = useMutation({
    mutationFn: async () => {
      const newTitle = prompt("Enter new title", presentation.title || "");
      if (!newTitle) return null;

      const result = await updatePresentationTitle(presentation.id, newTitle);
      if (!result.success) {
        throw new Error(result.message ?? "Failed to rename presentation");
      }
      return result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["dashboard-presentations"],
      });
      toast({
        title: "Success",
        description: "Presentation renamed successfully",
      });
    },
    onError: (error) => {
      console.error("Failed to rename presentation:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to rename presentation",
      });
    },
  });

  const { mutate: duplicateMutation, isPending: isDuplicating } = useMutation({
    mutationFn: async () => {
      const result = await duplicatePresentation(presentation.id);
      if (!result.success) {
        throw new Error(result.message ?? "Failed to duplicate presentation");
      }
      return result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["dashboard-presentations"],
      });
      toast({
        title: "Success",
        description: "Presentation duplicated successfully",
      });
    },
    onError: (error) => {
      console.error("Failed to duplicate presentation:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to duplicate presentation",
      });
    },
  });

  const handleClick = async (e: React.MouseEvent) => {
    if (isSelecting && onSelect) {
      e.preventDefault();
      onSelect(presentation.id);
      return;
    }

    try {
      setIsNavigating(true);
      setCurrentPresentation(presentation.id, presentation.title);

      const response = await getPresentationContent(presentation.id);

      if (!response.success) {
        throw new Error(
          response.message ?? "Failed to check presentation status",
        );
      }

      if (Object.keys(response?.presentation?.content ?? {}).length > 0) {
        router.push(`/presentation/${presentation.id}`);
      } else {
        router.push(`/presentation/generate/${presentation.id}`);
      }
    } catch (error) {
      console.error("Failed to navigate:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to open presentation",
      });
    } finally {
      setIsNavigating(false);
    }
  };

  const isLoading = initialLoading || isNavigating;

  return (
    <>
      <Card
        className={cn(
          "group relative overflow-hidden transition-all hover:shadow-lg",
          isSelected && "ring-2 ring-primary",
          isLoading && "pointer-events-none opacity-70",
        )}
      >
        {/* Thumbnail */}
        <div
          className="relative aspect-video w-full cursor-pointer overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100"
          onClick={handleClick}
        >
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : presentation.thumbnailUrl ? (
            <Image
              src={presentation.thumbnailUrl}
              alt={presentation.title || "Presentation thumbnail"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Presentation className="h-12 w-12 text-indigo-400" />
            </div>
          )}

          {/* Selection checkbox */}
          {isSelecting && (
            <div className="absolute left-3 top-3">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white shadow-sm",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-gray-300",
                )}
              >
                {isSelected && <Check className="h-4 w-4" />}
              </div>
            </div>
          )}

          {/* Private badge */}
          {!presentation.isPublic && !isSelecting && (
            <div className="absolute right-3 top-3">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                <Lock className="mr-1 h-3 w-3" />
                Private
              </Badge>
            </div>
          )}

          {/* Dropdown menu */}
          {!isSelecting && (
            <div className="absolute right-3 bottom-3 opacity-0 transition-opacity group-hover:opacity-100">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white/90 backdrop-blur-sm shadow-sm"
                  >
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => renameMutation()}
                    disabled={isRenaming}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => duplicateMutation()}
                    disabled={isDuplicating}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport(presentation.id, presentation.title)}
                    disabled={isExporting}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    disabled={isDeleting}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Card content */}
        <CardContent className="p-4">
          <h3
            className="truncate font-semibold text-foreground cursor-pointer hover:text-primary"
            onClick={handleClick}
          >
            {presentation.title || "Untitled"}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Created by you</span>
            <span>•</span>
            <span>{format(new Date(presentation.createdAt), "MMM d, yyyy")}</span>
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              presentation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePresentationMutation()}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
