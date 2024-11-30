"use client";
import React from "react";
import SearchSection from "./_component/SearchSection";
import TemplateListSection from "./_component/TemplateListSection";

export default function Dashboard() {
  const [userSearchInput, setUserSearchInput] = React.useState<string>("");

  return (
    <div>
      {/* Update state when input changes */}
      <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />
      {/* Pass the updated state to TemplateListSection */}
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
}
