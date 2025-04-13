import React, { useRef } from "react";
// import styles from "./text-editor.module.css";

interface TextEditorProps {
  value: string;
  onChange: (val: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  // autoFocus?: boolean;
  className?: string;
  rows?: number;
}

export const TextEditor: React.FC<TextEditorProps> = ({
                                                        value,
                                                        onChange,
                                                        onKeyDown,
                                                        onFocus,
                                                        onBlur,
                                                        placeholder = "请输入内容...",
                                                        // autoFocus = false,
                                                        className = "",
                                                        rows = 3,
                                                      }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <textarea
      ref={inputRef}
      className={`${className}`}
      placeholder={placeholder}
      rows={rows}
      value={value}
      onInput={(e) => onChange(e.currentTarget.value)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      // autoFocus={autoFocus}
    />
  );
};