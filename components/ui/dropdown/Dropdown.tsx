"use client";

import { ChevronDown } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface DropdownItem {
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
  icon?: React.ReactNode;
}

interface DropdownProps {
  label?: string;
  items: DropdownItem[];
  position?: "left" | "right";
  className?: string;
}

export default function Dropdown({
  label = "Options",
  items,
  position = "right",
  className = "",
}: DropdownProps) {
  return (
    <div className={`relative inline-block text-${position} ${className}`}>
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-white border border-white/10 hover:bg-gray-700 transition">
          {label}
          <ChevronDown className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor={`bottom`}
          className="w-48 origin-top-right rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm p-1 text-sm text-white shadow-lg ring-1 ring-black/5 transition duration-300 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          {items.map((item, index) => (
            <MenuItem key={index}>
              <button
                onClick={item.onClick}
                className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 transition 
                  ${
                    item.variant === "danger"
                      ? "text-red-400 hover:bg-red-500/10"
                      : "hover:bg-white/10"
                  }`}
              >
                {item.icon && <span className="text-primary">{item.icon}</span>}
                {item.label}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
