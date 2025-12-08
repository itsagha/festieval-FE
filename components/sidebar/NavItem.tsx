"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export default function NavItem({ href, icon: Icon, label }: NavItemProps) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex justify-start gap-3 items-center rounded-xl p-2 duration-700
        ${isActive 
          ? "bg-primary text-walnut" 
          : "hover:bg-primary hover:text-walnut text-gray-400"
        }`}
    >
      <Icon size={20} />
      {label}
    </Link>
  );
}
