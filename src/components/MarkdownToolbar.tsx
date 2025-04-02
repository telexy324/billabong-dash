import type React from "react"

import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Table,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MarkdownToolbarProps {
  onInsert: (markdown: string) => void
}

interface ToolbarItem {
  icon: React.ElementType
  tooltip: string
  markdown: string
  shortcut?: string
}

export function MarkdownToolbar({ onInsert }: MarkdownToolbarProps) {
  const toolbarItems: ToolbarItem[] = [
    {
      icon: Bold,
      tooltip: "Bold",
      markdown: "**Bold text**",
      shortcut: "Ctrl+B",
    },
    {
      icon: Italic,
      tooltip: "Italic",
      markdown: "*Italic text*",
      shortcut: "Ctrl+I",
    },
    {
      icon: Heading1,
      tooltip: "Heading 1",
      markdown: "# Heading 1",
    },
    {
      icon: Heading2,
      tooltip: "Heading 2",
      markdown: "## Heading 2",
    },
    {
      icon: Heading3,
      tooltip: "Heading 3",
      markdown: "### Heading 3",
    },
    {
      icon: List,
      tooltip: "Bullet List",
      markdown: "- List item\n- List item\n- List item",
    },
    {
      icon: ListOrdered,
      tooltip: "Numbered List",
      markdown: "1. First item\n2. Second item\n3. Third item",
    },
    {
      icon: Link,
      tooltip: "Link",
      markdown: "[Link text](https://example.com)",
    },
    {
      icon: Image,
      tooltip: "Image",
      markdown: "![Alt text](/placeholder.svg?height=200&width=400)",
    },
    {
      icon: Code,
      tooltip: "Code Block",
      markdown: "```\ncode block\n```",
    },
    {
      icon: Quote,
      tooltip: "Blockquote",
      markdown: "> Blockquote",
    },
    {
      icon: Table,
      tooltip: "Table",
      markdown: "| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n| Cell 3   | Cell 4   |",
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-1 border-b bg-muted/40 p-1">
      <TooltipProvider>
        {toolbarItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onInsert(item.markdown)}>
                <item.icon className="h-4 w-4" />
                <span className="sr-only">{item.tooltip}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>
                {item.tooltip}{" "}
                {item.shortcut && <span className="text-xs text-muted-foreground">({item.shortcut})</span>}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}

