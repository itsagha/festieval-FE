"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface BottomNavItemProps {
  href: string;
  icon: LucideIcon;
}

export default function BottomNavItem({ href, icon: Icon }: BottomNavItemProps) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex justify-start gap-3 items-center rounded-xl duration-700
        ${isActive 
          ? "bg-black text-primary" 
          : "hover:bg-primary hover:text-walnut text-black"
        }`}
    >
      <Icon size={24} />
    </Link>
  );
}
