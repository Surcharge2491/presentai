"use client";

import * as React from "react";

import { type DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import {
  CalendarIcon,
  ChevronRightIcon,
  Columns3Icon,
  FileCodeIcon,
  FilmIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PilcrowIcon,
  PlusIcon,
  QuoteIcon,
  RadicalIcon,
  SquareIcon,
  TableIcon,
  TableOfContentsIcon,
  PieChartIcon,
  BarChartIcon,
  LineChartIcon,
  ActivityIcon,
} from "lucide-react";
import { KEYS } from "platejs";
import { type PlateEditor, useEditorRef } from "platejs/react";

import {
  AREA_CHART_ELEMENT,
  BAR_CHART_ELEMENT,
  LINE_CHART_ELEMENT,
  PIE_CHART_ELEMENT,
} from "@/components/presentation/editor/lib";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/plate/ui/dropdown-menu";
import {
  insertBlock,
  insertInlineElement,
} from "@/components/plate/utils/transforms";

import { ToolbarButton, ToolbarMenuGroup } from "./toolbar";

type Group = {
  group: string;
  items: Item[];
};

interface Item {
  icon: React.ReactNode;
  value: string;
  onSelect: (editor: PlateEditor, value: string) => void;
  focusEditor?: boolean;
  label?: string;
}



const groups: Group[] = [
  {
    group: "Charts",
    items: [
      {
        icon: <PieChartIcon />,
        label: "Pie Chart",
        value: PIE_CHART_ELEMENT,
        onSelect: (editor, value) => {
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
        icon: <BarChartIcon />,
        label: "Bar Chart",
        value: BAR_CHART_ELEMENT,
        onSelect: (editor, value) => {
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
        icon: <LineChartIcon />,
        label: "Line Chart",
        value: LINE_CHART_ELEMENT,
        onSelect: (editor, value) => {
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
        icon: <ActivityIcon />,
        label: "Area Chart",
        value: AREA_CHART_ELEMENT,
        onSelect: (editor, value) => {
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
    group: "Basic blocks",
    items: [
      {
        icon: <PilcrowIcon />,
        label: "Paragraph",
        value: KEYS.p,
      },
      {
        icon: <Heading1Icon />,
        label: "Heading 1",
        value: "h1",
      },
      {
        icon: <Heading2Icon />,
        label: "Heading 2",
        value: "h2",
      },
      {
        icon: <Heading3Icon />,
        label: "Heading 3",
        value: "h3",
      },
      {
        icon: <TableIcon />,
        label: "Table",
        value: KEYS.table,
      },
      {
        icon: <FileCodeIcon />,
        label: "Code",
        value: KEYS.codeBlock,
      },
      {
        icon: <QuoteIcon />,
        label: "Quote",
        value: KEYS.blockquote,
      },
      {
        icon: <MinusIcon />,
        label: "Divider",
        value: KEYS.hr,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "Lists",
    items: [
      {
        icon: <ListIcon />,
        label: "Bulleted list",
        value: KEYS.ul,
      },
      {
        icon: <ListOrderedIcon />,
        label: "Numbered list",
        value: KEYS.ol,
      },
      {
        icon: <SquareIcon />,
        label: "To-do list",
        value: KEYS.listTodo,
      },
      {
        icon: <ChevronRightIcon />,
        label: "Toggle list",
        value: KEYS.toggle,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "Media",
    items: [
      {
        icon: <ImageIcon />,
        label: "Image",
        value: KEYS.img,
      },
      {
        icon: <FilmIcon />,
        label: "Embed",
        value: KEYS.mediaEmbed,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "Advanced blocks",
    items: [
      {
        icon: <TableOfContentsIcon />,
        label: "Table of contents",
        value: KEYS.toc,
      },
      {
        icon: <Columns3Icon />,
        label: "3 columns",
        value: "action_three_columns",
      },
      {
        focusEditor: false,
        icon: <RadicalIcon />,
        label: "Equation",
        value: KEYS.equation,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "Inline",
    items: [
      {
        icon: <Link2Icon />,
        label: "Link",
        value: KEYS.link,
      },
      {
        focusEditor: true,
        icon: <CalendarIcon />,
        label: "Date",
        value: KEYS.date,
      },
      {
        focusEditor: false,
        icon: <RadicalIcon />,
        label: "Inline Equation",
        value: KEYS.inlineEquation,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value);
      },
    })),
  },
];

export function InsertToolbarButton(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={open} tooltip="Insert" isDropdown>
          <PlusIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex max-h-[500px] min-w-0 flex-col overflow-y-auto"
        align="start"
      >
        {groups.map(({ group, items: nestedItems }) => (
          <ToolbarMenuGroup key={group} label={group}>
            {nestedItems.map(({ icon, label, value, onSelect }) => (
              <DropdownMenuItem
                key={value}
                className="min-w-[180px]"
                onSelect={() => {
                  onSelect(editor, value);
                  editor.tf.focus();
                }}
              >
                {icon}
                {label}
              </DropdownMenuItem>
            ))}
          </ToolbarMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
