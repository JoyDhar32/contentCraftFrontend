"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation"; // Import useParams
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../../_component/TemplateListSection";
import { chatSession } from "../../_component/AIMODEL";

export default function CreateContent() {
  const params = useParams(); // Use useParams hook to get the params
  const templateSlug = params["template-slug"]; // Access 'template-slug'

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === templateSlug
  ); // Get the selected template from URL
  const [loading, setLoading] = useState(false);

const GenerateAIContent=async(formData:any)=>{
  setLoading(true);
const SelectedPrompt=selectedTemplate?.aiPrompt;
const FinalAIPrompt=JSON.stringify(formData)+", "+SelectedPrompt;
const result = await chatSession.sendMessage(FinalAIPrompt);
console.log(result.response.text());
setLoading(false);
}


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5">
      {/* Form Section */}
      <FormSection
        selectedTemplate={selectedTemplate}
        userFormInput={(v: any) => GenerateAIContent(v)}
        loading={loading}/>

      {/* Output Section */}
      <div className="col-span-2">
        <OutputSection />
      </div>
    </div>
  );
}
