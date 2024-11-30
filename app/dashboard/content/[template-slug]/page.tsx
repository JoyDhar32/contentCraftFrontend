"use client";

import React from "react";
import { useParams } from "next/navigation"; // Import useParams
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../../_component/TemplateListSection";

export default function CreateContent() {
  const params = useParams(); // Use useParams hook to get the params
  const templateSlug = params["template-slug"]; // Access 'template-slug'

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === templateSlug
  ); // Get the selected template from URL

const GenerateAIContent=(formData:any)=>{
    // Call the AI service to generate content
    console.log(formData);
}


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5">
      {/* Form Section */}
      <FormSection
        selectedTemplate={selectedTemplate}
        userFormInput={(v: any) => GenerateAIContent(v)}
      />

      {/* Output Section */}
      <div className="col-span-2">
        <OutputSection />
      </div>
    </div>
  );
}
