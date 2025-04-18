import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils"; // 用于合并 className 的工具函数

interface HtmlRendererProps {
  html: string;
  className?: string;
  maxTextLength?: number; // 可选：截断文字长度，默认 200
}

export default function HtmlRendererWithImage({
                                                html,
                                                className,
                                                maxTextLength = 200,
                                              }: HtmlRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const temp = document.createElement("div");
    temp.innerHTML = html;

    const img = temp.querySelector("img");
    const textOnly = temp.textContent || "";

    // 限制图片数量为 1 张，并设定样式类
    if (img) {
      const allImgs = temp.querySelectorAll("img");
      allImgs.forEach((img, idx) => {
        if (idx > 0) img.remove(); // 删除多余图片
        else img.className = "tailwind-safe-img"; // 注册好的类名
      });

      // 包裹图片和文字
      const wrapper = document.createElement("div");
      wrapper.className = "flex gap-4"; // 图片和文字并排
      wrapper.appendChild(img.cloneNode(true));

      const textDiv = document.createElement("div");
      textDiv.className = "text-sm text-gray-800 hover:text-blue-600 transition-all";
      textDiv.textContent = expanded
        ? textOnly
        : textOnly.slice(0, maxTextLength) + (textOnly.length > maxTextLength ? "..." : "");
      wrapper.appendChild(textDiv);

      container.innerHTML = "";
      container.appendChild(wrapper);
    } else {
      // 无图，仅处理文字
      container.innerHTML = `
        <div class="text-sm text-gray-800 hover:text-blue-600 transition-all">
          ${expanded
        ? textOnly
        : textOnly.slice(0, maxTextLength) + (textOnly.length > maxTextLength ? "..." : "")}
        </div>`;
    }

    return () => {
      container.innerHTML = "";
    };
  }, [html, expanded]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={containerRef} className="overflow-hidden" />
      <button
        className="mt-2 text-sm text-blue-500 hover:underline"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "收起" : "展开全文"}
      </button>
    </div>
  );
}
