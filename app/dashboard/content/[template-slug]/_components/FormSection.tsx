"use client";
import { TEMPLATE } from "@/app/dashboard/_component/TemplateListSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React, { useState } from "react";
import { VscLoading } from "react-icons/vsc";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: any;
  loading: boolean;
}

export default function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Extract the field name and value
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value, // Store inputs dynamically based on their name
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData); // Debugging: Check the collected inputs
    userFormInput(formData); // Pass the collected inputs to the parent function
  };
  

  return (
    <div className="p-5 shadow-md border rounded-lg bg-slate-50">
      <div className="flex flex-col justify-center items-center">
        {selectedTemplate?.icon && (
          <Image
            src={selectedTemplate.icon}
            alt={selectedTemplate.name || "Template Icon"}
            width={60}
            height={60}
            unoptimized
          />
        )}

        <h1 className="text-2xl font-semibold text-custom">
          {selectedTemplate?.name || "No template selected"}
        </h1>
        <p className="text-gray-900">{selectedTemplate?.desc || "No description available"}</p>
      </div>
      <form onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index} className="mt-4">
            <label className="text-gray-900">{item.label}</label>

            <Input
              name={item.name}
              placeholder={item.name}
              required={item?.required}
              onChange={handleInputChange}
              className="py-5 mt-2"
            />







          </div>
        ))}
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            variant="custom"
            className="mt-4 w-2/3 py-5 shadow-lg"
            disabled={loading || saving}
          >
            {loading || saving ? <VscLoading className="animate-spin" /> : "Generate Content"}
          </Button>
        </div>
      </form>
    </div>
  );
}
