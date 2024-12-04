"use client";
import { TEMPLATE } from '@/app/dashboard/_component/TemplateListSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import React, { useState } from 'react';
import { VscLoading } from 'react-icons/vsc';

interface PROPS {
    selectedTemplate?: TEMPLATE; 
    userFormInput:any
    loading: boolean;
    // Allow optional selectedTemplate
}

export default function FormSection({ selectedTemplate,userFormInput,loading }: PROPS) {
    const [formData, setFormData] = useState<Record<string, any>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userFormInput(formData);
    };

    return (
        <div className="p-5 shadow-md border rounded-lg bg-slate-50">
            {/* Check if selectedTemplate and icon are defined */}
            <div className="flex flex-col justify-center items-center">
            {selectedTemplate?.icon && (
                <Image
                    src={selectedTemplate.icon}
                    alt={selectedTemplate.name || 'Template Icon'}
                    width={60}
                    height={60}
                    unoptimized
                />
            )}

            <h1 className="text-2xl font-semibold text-custom">
                {selectedTemplate?.name || 'No template selected'}
            </h1>
            <p className="text-gray-900">
                {selectedTemplate?.desc || 'No description available'}
            </p>
</div>
            <form onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item, index) => (
                    <div key={index} className="mt-4">
                        <label className="text-gray-900">{item.label}</label>
                        {item.field === 'input' ? (
                            <Input
                                name={item.name} // Correctly set the name attribute
                                placeholder={item.name}
                                required={item?.required}
                                onChange={handleInputChange}
                                className="py-5 mt-2"
                            />
                        ) : (
                            <Textarea
                                name={item.name} // Correctly set the name attribute
                                placeholder={item.name}
                                required={item?.required}
                                onChange={handleInputChange}
                                className="min-h-28"
                            />
                        )}
                    </div>
                ))}
                <div className="flex justify-center items-center">
                    <Button type="submit" variant="custom" className="mt-4 w-2/3 py-5 shadow-lg" disabled={loading}>
                    {loading?<VscLoading className="animate-spin"/>: "Generate Content"}
                       
                    </Button>
                </div>
            </form>
        </div>
    );
}
