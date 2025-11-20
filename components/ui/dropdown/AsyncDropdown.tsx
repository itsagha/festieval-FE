"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";
import api from "@/services/api";
import clsx from "clsx";

interface AsyncDropdownProps {
  label?: string;
  apiUrl: string;
  placeholder?: string;
  onSelect: (item: {
    id: number;
    name: string;
    categoryId: number;
    categoryName: string;
  }) => void;
}

export default function AsyncDropdown({
  label = "Pilih Opsi",
  apiUrl,
  placeholder = "Cari kategori...",
  onSelect,
}: AsyncDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(apiUrl);
      setItems(res.data.data);
      setFiltered(res.data.data);
    };
    fetchData();
  }, [apiUrl]);

  // Filter logic
  useEffect(() => {
    if (query === "") return setFiltered(items);

    const filteredData = items
      .map((cat) => ({
        ...cat,
        subcategories: cat.subcategories.filter((sub: any) =>
          sub.name.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter(
        (cat) =>
          cat.name.toLowerCase().includes(query.toLowerCase()) ||
          cat.subcategories.length > 0
      );

    setFiltered(filteredData);
  }, [query, items]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center bg-white rounded-lg px-4 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 transition"
      >
        {selected || label}
        <ChevronDown
          className={clsx(
            "w-4 h-4 text-gray-800 transition-transform duration-500",
            open && "rotate-180"
          )}
        />
      </button>

      {/* DROPDOWN */}
      <div
        className={clsx(
          "absolute z-50 mt-2 w-full bg-black/50 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 p-2 max-h-64 overflow-y-auto transition-all duration-300 origin-top",
          open
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        )}
      >
        {/* Search bar */}
        <div className="flex items-center gap-2 px-2 py-1 border-b border-white/10 mb-2">
          <Search className="w-4 h-4 text-white" />
          <input
            type="text"
            placeholder={placeholder}
            className="flex-1 text-sm outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Category list */}
        {filtered.map((category) => (
          <div key={category.id} className="mb-1">
            <p className="text-sm font-semibold px-2 text-white/80">
              {category.name}
            </p>

            {category.subcategories.map((sub: any) => (
              <button
                key={sub.id}
                className="w-full text-left px-3 py-1.5 rounded-md text-sm text-white hover:bg-primary/10 hover:text-primary mt-1 transition"
                onClick={() => {
                  setSelected(`${category.name} - ${sub.name}`);
                  onSelect({
                    id: sub.id,
                    name: sub.name,
                    categoryId: category.id,
                    categoryName: category.name,
                  });
                  setOpen(false);
                }}
              >
                {sub.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}