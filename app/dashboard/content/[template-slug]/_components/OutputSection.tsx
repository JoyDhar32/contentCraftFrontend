import React from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useRef } from 'react';
export default function OutputSection() {
  const editorRef:any = useRef();
  return (
    <div className="bg-white shadow-lg border">
      <div className="flex justify-between items-center p-5">
        <h1 className="text-2xl font-semibold text-custom">Output</h1>
        <Button variant="custom"><Copy /> Copy</Button>
      </div>
      <Editor
      ref={editorRef}
        initialValue="Here is the output" 
        height="600px"
        initialEditType="WYSIWYG"
        useCommandShortcut={true}
        onChange={() => console.log(editorRef.current.getInstance().getMarkdown())}
      />
      </div>
  )
}
