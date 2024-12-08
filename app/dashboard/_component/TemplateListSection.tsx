"use client";

import React, { useEffect, useState } from 'react';
import TemplateCard from './TemplateCard';
import axios from 'axios';

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
  const [templateList, setTemplateList] = useState<TEMPLATE[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API = process.env.BACKEND_API_URL;

  useEffect(() => {
    // Fetch templates from the backend API
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/templates`);
        setTemplateList(response.data);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError('Failed to load templates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [API]);

  useEffect(() => {
    if (userSearchInput.trim()) {
      const searchResult = templateList.filter((item: TEMPLATE) =>
        item.name.toLowerCase().includes(userSearchInput.trim().toLowerCase())
      );
      setTemplateList([...searchResult]);
    }
  }, [userSearchInput, templateList]);

  if (loading) {
    return <div>Loading templates...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      {templateList.map((item: TEMPLATE, index: number) => (
        <TemplateCard key={index} {...item} />
      ))}
    </div>
  );
}
