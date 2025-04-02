import { useState } from "react"
import ReactMarkdown from "react-markdown"

import { MarkdownToolbar } from "./MarkdownToolbar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DEFAULT_MARKDOWN = `# Hello, Markdown!

This is a **bold** text, and this is an *italic* text.

## Lists

Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item

## Links and Images

[Visit Next.js](https://nextjs.org)

![Placeholder Image](/placeholder.svg?height=200&width=400)

## Code

Inline \`code\` example.

\`\`\`javascript
// Code block
function greet() {
  console.log("Hello, world!");
}
\`\`\`

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

## Tables

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)
  const [view, setView] = useState<"split" | "edit" | "preview">("split")

  const handleInsertMarkdown = (markdownToInsert: string) => {
    const textarea = document.getElementById("markdown-textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value

    const before = text.substring(0, start)
    const after = text.substring(end)
    const newText = before + markdownToInsert + after

    setMarkdown(newText)

    // Set cursor position after the inserted markdown
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + markdownToInsert.length
      textarea.selectionEnd = start + markdownToInsert.length
    }, 0)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex flex-col rounded-lg border bg-card shadow">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "split" | "edit" | "preview")}>
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="split">Split</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(markdown)}>
            Copy Markdown
          </Button>
        </div>
      </div>

      <MarkdownToolbar onInsert={handleInsertMarkdown} />

      <div className="flex min-h-[500px] flex-col md:flex-row">
        {view !== "preview" && (
          <div className={cn("flex-1 border-b md:border-b-0 md:border-r", view === "split" ? "md:w-1/2" : "w-full")}>
            <textarea
              id="markdown-textarea"
              className="h-full w-full resize-none bg-background p-4 font-mono text-sm outline-none"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type your markdown here..."
            />
          </div>
        )}

        {view !== "edit" && (
          <div className={cn("flex-1 overflow-auto", view === "split" ? "md:w-1/2" : "w-full")}>
            <div className="prose prose-sm max-w-none p-4 dark:prose-invert">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

