import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface Props {
  aiOutput: string;
  contentInputId: number;
}

export default function OutputSection({ aiOutput, contentInputId }: Props) {
  const editorRef = useRef<any>(null);
  const API = process.env.BACKEND_API_URL;

  const saveAIOutput = async (content: string) => {
    if (!contentInputId) {
      console.error("ContentInputId is missing. Unable to save the output.");
      return;
    }

    try {
      const response = await axios.post(`${API}/store-content`, {
        content_input_id: contentInputId,
        content,
      });
      console.log("Content saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving AI output:", error);
    }
  };

  useEffect(() => {
    if (editorRef.current && aiOutput) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(aiOutput);
      saveAIOutput(aiOutput);
    }
  }, [aiOutput, contentInputId]);


  const handleCopy = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const content = editorInstance.getMarkdown(); // Get the Markdown content
      navigator.clipboard.writeText(content).then(() => {
        alert("Content copied to clipboard!");
      }).catch(err => {
        console.error("Failed to copy content:", err);
      });
    }
  };

  return (
    <div className="bg-white shadow-lg border">
      <div className="flex justify-between items-center p-5">
        <h1 className="text-2xl font-semibold text-custom">Output</h1>
        <Button variant="custom" onClick={handleCopy}>
          <Copy /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue={aiOutput || "Generated content will appear here."}
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
      />
    </div>
  );
}
