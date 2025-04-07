import { useState } from 'react';
import { MdEditor, ToolbarTips } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { upload } from "@/lib/nezha-api.ts"
import { UploadImgCallBack } from "md-editor-rt/lib/types/MdEditor/type"

interface MDProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Md(props: MDProps) {
  const {
    value: valueProp,
    onValueChange,
  } = props;
  // const [text, setText] = useState(value);
  const [toolbars] = useState<(keyof ToolbarTips)[] | undefined>(
    [
      "bold",
      "underline",
      "italic",
      "strikeThrough",
      "-",
      "title",
      "sub",
      "sup",
      "quote",
      "unorderedList",
      "orderedList",
      "task",
      "-",
      "codeRow",
      "code",
      "link",
      "image",
      "table",
      // "mermaid",
      // "katex",
      "-",
      "revoke",
      "next",
      // "save",
      "-",
      // "pageFullscreen",
      "preview",
      // "htmlPreview",
      "catalog",
      "=",
      // 0,
      "fullscreen",
    ]
  );

  // const style: React.CSSProperties = {
  //   height: "400px",
  // };

  const onUpload = async (files: File[], callback: UploadImgCallBack) => {
    let urls: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const newItem = await upload(file);
        // const items = valueProp?[...valueProp, newItem]:[newItem]
        // if (onValueChange) {
        //     onValueChange(items)
        // }
        // console.log(newItem.url);
        if (newItem.url.indexOf('http://') > -1 || newItem.url.indexOf('https://') > -1) {
          urls = urls ? [...urls, newItem.url] : [newItem.url];
        } else {
          const localUrl = "http://localhost:8008/api/v1/"+newItem.url
          urls = urls ? [...urls, localUrl] : [localUrl];
        }
        // urls = urls ? [...urls, newItem.url] : [newItem.url];
      } catch (e) {
        console.error(e)
      }
    }
    // console.log(urls);
    callback(urls);
  }

  // async function onUpload(files, callback) {
  //   const res = await Promise.all(
  //     files.map((file) => {
  //       return new Promise((rev, rej) => {
  //         const formData = new FormData();
  //         formData.append("file", file);
  //         upload(file)
  //           .then((res) => rev(res))
  //           .catch((error) => rej(error));
  //       });
  //     })
  //   );
  //   callback(res.map((item) => item.url));
  // }

  return <MdEditor
    value={valueProp}
    onChange={onValueChange}
    toolbars={toolbars}
    preview={false}
    // style={style}
    onUploadImg={onUpload}
  />;
}
