import { useState } from 'react';
import { MdEditor, ToolbarTips } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

export default function Md() {
  const [text, setText] = useState('hello md-editor-rt！');
  const [toolbars] = useState<(keyof ToolbarTips)[] | undefined>(
    [
      'bold',
      'underline',
      'italic',
      '-',
      'strikeThrough',
      'title',
      'sub',
      'sup',
      'quote',
      'unorderedList',
      'orderedList',
      '-',
      'codeRow',
      'code',
      'link',
      'image',
      'table',
      '-',
      'revoke',
      'next',
      'save',
      '=',
      'pageFullscreen',
      'fullscreen',
      'preview',
      'htmlPreview',
    ]
  );

  return <MdEditor
    modelValue={text}
    onChange={setText}
    toolbars={toolbars}
  />;
}
