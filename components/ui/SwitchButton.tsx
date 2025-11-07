"use client";

import { Switch } from "@headlessui/react";
import { useState } from "react";

interface SwitchButtonProps {
  label?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function SwitchButton({
  label,
  defaultChecked = false,
  onChange,
}: SwitchButtonProps) {
  const [enabled, setEnabled] = useState(defaultChecked);

  const handleChange = (checked: boolean) => {
    setEnabled(checked);
    onChange?.(checked);
  };

  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-sm text-gray-700">{label}</span>}

      <div className="flex items-center gap-2">
        <Switch
          checked={enabled}
          onChange={handleChange}
          className={`group relative flex h-7 w-14 cursor-pointer rounded-full p-1 transition-all duration-300 ${
            enabled ? "bg-primary" : "bg-white"
          }`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block size-5 transform rounded-full bg-black shadow-lg ring-0 transition duration-300 ease-in-out ${
              enabled ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </Switch>
      </div>
    </div>
  );
}
