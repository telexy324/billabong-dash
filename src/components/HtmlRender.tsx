interface HtmlRendererProps {
  html: string;
  className?: string;
}

export default function HtmlRenderer(props: HtmlRendererProps) {
  return (
    <div
      className={props.className}
      dangerouslySetInnerHTML={{ __html: props.html }}
    />
  );
}
