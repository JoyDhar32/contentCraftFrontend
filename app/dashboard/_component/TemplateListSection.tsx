"use client";
import Templates from '@/app/(data)/Templates';
import React, { useEffect, useState } from 'react';
import TemplateCard from './TemplateCard';

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

export default function TemplateListSection({ userSearchInput }: any) {
  const [templateList, setTemplateList] = useState([...Templates]);

  useEffect(() => {
    if (userSearchInput.trim()) {
      const searchResult = Templates.filter((item: TEMPLATE) =>
        item.name.toLowerCase().includes(userSearchInput.trim().toLowerCase())
      );
      setTemplateList([...searchResult]); // Update state with a new reference
    } else {
      setTemplateList([...Templates]); // Reset to original list
    }
  }, [userSearchInput]);


  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 ">
      {templateList.map((item: TEMPLATE, index: number) => {
        return <TemplateCard key={index} {...item} />;
      })}
    </div>
  );
}
