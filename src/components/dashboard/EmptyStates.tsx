"use client";

import { Button } from "@/components/ui/button";
import { FileText, Star, Clock, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { type DashboardFilter } from "@/app/_actions/presentation/fetchPresentations";

interface EmptyStateProps {
  filter: DashboardFilter;
}

export function EmptyState({ filter }: EmptyStateProps) {
  const router = useRouter();

  const handleCreateNew = () => {
    router.push("/presentation");
  };

  const handleCreateWithAI = () => {
    router.push("/presentation?ai=true");
  };

  const emptyStates: Record<
    DashboardFilter,
    {
      icon: React.ComponentType<{ className?: string }>;
      title: string;
      description: string;
      showActions: boolean;
    }
  > = {
    all: {
      icon: FileText,
      title: "No presentations yet",
      description:
        "Get started by creating your first presentation. You can create one from scratch or use AI to generate it for you.",
      showActions: true,
    },
    recent: {
      icon: Clock,
      title: "No recently viewed presentations",
      description:
        "Presentations you've recently opened will appear here. Start by opening a presentation or creating a new one.",
      showActions: true,
    },
    created: {
      icon: FileText,
      title: "No presentations created",
      description:
        "You haven't created any presentations yet. Create your first presentation to get started.",
      showActions: true,
    },
    favorites: {
      icon: Star,
      title: "No favorite presentations",
      description:
        "You haven't favorited any presentations yet. Star presentations you want quick access to and they'll appear here.",
      showActions: false,
    },
  };

  const state = emptyStates[filter];
  const Icon = state.icon;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 p-6 mb-6">
        <Icon className="h-12 w-12 text-indigo-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{state.title}</h2>
      <p className="text-center text-gray-600 max-w-md mb-8">
        {state.description}
      </p>
      {state.showActions && (
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCreateWithAI}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Create with AI
          </Button>
          <Button onClick={handleCreateNew} variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Create from scratch
          </Button>
        </div>
      )}
    </div>
  );
}
