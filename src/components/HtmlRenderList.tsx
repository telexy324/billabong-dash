import { cn } from "@/lib/utils"

interface HtmlRendererProps {
  html: string;
  className?: string;
}

export default function HtmlRendererList(props: HtmlRendererProps) {
  return (
    <div
      className={cn(props.className, "prose max-w-none overflow-hidden text-ellipsis line-clamp-4",
        "[&_img]:max-h-48 [&_img]:object-cover [&_img]:rounded-md",
        "[&_img]:mx-auto [&_img:nth-of-type(n+2)]:hidden")}
      dangerouslySetInnerHTML={{ __html: props.html }}
    />
  );
}
