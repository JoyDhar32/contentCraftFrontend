"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Import useParams
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import { TEMPLATE } from "../../_component/TemplateListSection";
import { chatSession } from "../../_component/AIMODEL";
import axios from "axios";

export default function CreateContent() {
  const params = useParams();
  const templateSlug = params["template-slug"];
  const [templates, setTemplates] = useState<TEMPLATE[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<TEMPLATE | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const [contentInputId, setContentInputId] = useState<number | null>(null); // Track contentInputId

  const API = process.env.BACKEND_API_URL;

  // Fetch templates from API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${API}/templates`);
        const fetchedTemplates = response.data.map((template: TEMPLATE) => ({
          ...template,
          form: template.form ? JSON.parse(template.form) : [], // Parse the form field
        }));
        setTemplates(fetchedTemplates);
  
        // Find the selected template by slug
        const foundTemplate = fetchedTemplates.find((item: TEMPLATE) => item.slug === templateSlug);
        setSelectedTemplate(foundTemplate);
      } catch (error) {
        console.error("Error fetching templates:", error);
        alert("Failed to load templates. Please try again.");
      }
    };
  
    fetchTemplates();
  }, [API, templateSlug]);

  const GenerateAIContent = async (formData: any) => {
    try {
      setLoading(true);
      console.log("Form Data:", formData);

      // Save user input and get contentInputId
      const userInputResponse = await axios.post(`${API}/store-user-input`, {
        user_id: 1, // Replace with dynamic user ID if needed
        title: selectedTemplate?.name || "Default Title", // Use the template's name as the title
        form_data: JSON.stringify(formData), // Pass the entire form data as JSON
      });

      const savedContentInputId = userInputResponse.data.data.id; // Extract contentInputId
      setContentInputId(savedContentInputId);

      // Generate AI output
      const selectedPrompt = selectedTemplate?.aiPrompt;
      const finalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

      const result = await chatSession.sendMessage(finalAIPrompt);
      setAiOutput(result?.response.text());
    } catch (error) {
      console.error("Error generating AI content:", error);
      alert("Failed to generate AI content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedTemplate) {
    return <div>Loading template...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5">
      {/* Form Section */}
      <FormSection
        selectedTemplate={selectedTemplate}
        userFormInput={(formData: any) => GenerateAIContent(formData)}
        loading={loading}
      />

      {/* Output Section */}
      <div className="col-span-2">
        {contentInputId ? (
          <>
            <OutputSection aiOutput={aiOutput} contentInputId={contentInputId} />
          </>
        ) : (
          <p className="text-sm text-gray-600 mb-4">
            <OutputSection aiOutput={aiOutput} />
          </p>
        )}
      </div>
    </div>
  );
}
