"use client";

import {
    ActivityIcon,
    BarChart,
    BarChartIcon,
    CheckSquare,
    Circle,
    Code,
    FileText,
    Heading1,
    Heading2,
    Heading3,
    ImageIcon,
    Info,
    LayoutGrid,
    LineChartIcon,
    Link,
    List,
    ListOrdered,
    MessageSquare,
    Network,
    PenTool,
    PieChartIcon,
    PilcrowIcon,
    Quote,
    Shapes,
    Table,
    Type,
    Video,
    Workflow,
    Youtube,
} from "lucide-react";
import { KEYS } from "platejs";
import { useEditorRef } from "platejs/react";
import React from "react";

import {
    insertBlock,
    insertInlineElement,
} from "@/components/plate/utils/transforms";
import {
    AREA_CHART_ELEMENT,
    BAR_CHART_ELEMENT,
    LINE_CHART_ELEMENT,
    PIE_CHART_ELEMENT,
} from "@/components/presentation/editor/lib";
import { usePresentationState } from "@/states/presentation-state";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const SIDEBAR_CATEGORIES = [
    {
        id: "text",
        label: "Text & Lists",
        icon: <Type size={20} />,
        items: [
            {
                label: "Paragraph",
                value: KEYS.p,
                icon: <PilcrowIcon size={16} />,
                action: insertBlock,
            },
            {
                label: "Heading 1",
                value: "h1",
                icon: <Heading1 size={16} />,
                action: insertBlock,
            },
            {
                label: "Heading 2",
                value: "h2",
                icon: <Heading2 size={16} />,
                action: insertBlock,
            },
            {
                label: "Heading 3",
                value: "h3",
                icon: <Heading3 size={16} />,
                action: insertBlock,
            },
            {
                label: "Quote",
                value: KEYS.blockquote,
                icon: <Quote size={16} />,
                action: insertBlock,
            },
            {
                label: "Callout Box",
                value: KEYS.callout,
                icon: <Info size={16} />,
                action: insertBlock,
            },
            {
                label: "Bulleted List",
                value: KEYS.ul,
                icon: <List size={16} />,
                action: insertBlock,
            },
            {
                label: "Numbered List",
                value: KEYS.ol,
                icon: <ListOrdered size={16} />,
                action: insertBlock,
            },
            {
                label: "To-Do List",
                value: KEYS.listTodo,
                icon: <CheckSquare size={16} />,
                action: insertBlock,
            },
        ],
    },
    {
        id: "media",
        label: "Images & Video",
        icon: <ImageIcon size={20} />,
        items: [
            {
                label: "Image",
                value: KEYS.img,
                icon: <ImageIcon size={16} />,
                action: insertBlock,
            },
            {
                label: "Video",
                value: KEYS.video,
                icon: <Video size={16} />,
                action: insertBlock,
            },
            {
                label: "YouTube Embed",
                value: "youtube",
                icon: <Youtube size={16} />,
                action: insertBlock,
            },
        ],
    },
    {
        id: "diagrams",
        label: "Diagrams",
        icon: <Network size={20} />,
        items: [
            {
                label: "Flowchart",
                value: "flowchart",
                icon: <Workflow size={16} />,
                action: insertBlock,
            },
            {
                label: "Mind Map",
                value: "mindmap",
                icon: <Network size={16} />,
                action: insertBlock,
            },
            {
                label: "Process Diagram",
                value: "process",
                icon: <Shapes size={16} />,
                action: insertBlock,
            },
        ],
    },
    {
        id: "charts",
        label: "Charts",
        icon: <BarChart size={20} />,
        items: [
            {
                label: "Pie Chart",
                value: PIE_CHART_ELEMENT,
                icon: <PieChartIcon size={16} />,
                customAction: (editor: any, value: string) => {
                    editor.tf.insertNodes(
                        editor.api.create.block({
                            type: value,
                            data: [
                                { label: "Segment A", value: 400 },
                                { label: "Segment B", value: 300 },
                                { label: "Segment C", value: 300 },
                                { label: "Segment D", value: 200 },
                            ],
                        }),
                        { select: true },
                    );
                },
            },
            {
                label: "Bar Chart",
                value: BAR_CHART_ELEMENT,
                icon: <BarChartIcon size={16} />,
                customAction: (editor: any, value: string) => {
                    editor.tf.insertNodes(
                        editor.api.create.block({
                            type: value,
                            data: [
                                { name: "Jan", total: 1200 },
                                { name: "Feb", total: 900 },
                                { name: "Mar", total: 1600 },
                                { name: "Apr", total: 1000 },
                            ],
                        }),
                        { select: true },
                    );
                },
            },
            {
                label: "Line Chart",
                value: LINE_CHART_ELEMENT,
                icon: <LineChartIcon size={16} />,
                customAction: (editor: any, value: string) => {
                    editor.tf.insertNodes(
                        editor.api.create.block({
                            type: value,
                            data: [
                                { name: "Jan", sales: 400 },
                                { name: "Feb", sales: 300 },
                                { name: "Mar", sales: 200 },
                                { name: "Apr", sales: 278 },
                                { name: "May", sales: 189 },
                            ],
                        }),
                        { select: true },
                    );
                },
            },
            {
                label: "Area Chart",
                value: AREA_CHART_ELEMENT,
                icon: <ActivityIcon size={16} />,
                customAction: (editor: any, value: string) => {
                    editor.tf.insertNodes(
                        editor.api.create.block({
                            type: value,
                            data: [
                                { month: "January", desktop: 186 },
                                { month: "February", desktop: 305 },
                                { month: "March", desktop: 237 },
                                { month: "April", desktop: 73 },
                                { month: "May", desktop: 209 },
                                { month: "June", desktop: 214 },
                            ],
                        }),
                        { select: true },
                    );
                },
            },
        ],
    },
    {
        id: "layout",
        label: "Smart Layouts",
        icon: <LayoutGrid size={20} />,
        items: [
            {
                label: "Table",
                value: KEYS.table,
                icon: <Table size={16} />,
                action: insertBlock,
            },
            {
                label: "2-Column Layout",
                value: KEYS.column,
                icon: <LayoutGrid size={16} />,
                action: insertBlock,
            },
            {
                label: "Code Block",
                value: KEYS.codeBlock,
                icon: <Code size={16} />,
                action: insertBlock,
            },
        ],
    },
    {
        id: "interactive",
        label: "Interactive",
        icon: <Link size={20} />,
        items: [
            {
                label: "Link/Button",
                value: KEYS.a,
                icon: <Link size={16} />,
                action: insertInlineElement,
            },
            {
                label: "Comment",
                value: KEYS.comment,
                icon: <MessageSquare size={16} />,
                action: insertBlock,
            },
        ],
    },
];

export function EditorSidebar() {
    const isPresenting = usePresentationState((s) => s.isPresenting);
    // Get editor reference from context
    const editor = useEditorRef();

    if (isPresenting) return null;

    return (
        <div className="fixed right-4 top-1/2 z-40 -translate-y-1/2 flex flex-col gap-2 rounded-full border bg-background p-2 shadow-lg transition-all duration-200">
            <TooltipProvider delayDuration={0}>
                {SIDEBAR_CATEGORIES.map((category) => (
                    <Popover key={category.id}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                                        disabled={!editor}
                                    >
                                        {category.icon}
                                    </Button>
                                </PopoverTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                <p>{category.label}</p>
                            </TooltipContent>
                        </Tooltip>

                        <PopoverContent side="left" className="w-56 p-2" align="start">
                            <div className="grid gap-1">
                                <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                                    Insert {category.label}
                                </p>
                                {category.items.map((item) => (
                                    <Button
                                        key={item.label}
                                        variant="ghost"
                                        className="justify-start gap-2 h-9 px-2 text-sm font-normal"
                                        onClick={() => {
                                            if (editor) {
                                                if ('customAction' in item && item.customAction) {
                                                    item.customAction(editor, item.value);
                                                } else if ('action' in item && item.action) {
                                                    item.action(editor, item.value);
                                                }
                                                // Focus editor after insertion
                                                setTimeout(() => editor.tf.focus(), 0);
                                            }
                                        }}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                ))}
            </TooltipProvider>
        </div>
    );
}
