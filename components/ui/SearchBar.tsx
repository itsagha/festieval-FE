"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  placeholder = "Cari sesuatu",
  onSearch,
}: {
  placeholder?: string;
  onSearch?: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border border-primary w-full max-w-md rounded-lg px-4 py-2 shadow-sm"
    >
      <Search className="text-primary w-5 h-5 mr-2" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent focus:outline-none text-sm text-gray-200 placeholder-gray-400"
      />
    </form>
  );
}
