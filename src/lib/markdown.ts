export function getMarkdownPlaceholder(): string {
  return `# Hello, Markdown!

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
}

