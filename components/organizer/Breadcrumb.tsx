"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const steps = [
    { label: "Data Acara", href: "/organizer/event" },
    { label: "Jenis Tiket", href: "/organizer/event/tickets" },
    { label: "Informasi", href: "/organizer/event/contact" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 my-6 flex-wrap">
      {steps.map((step, index) => {
        const isActive = pathname === step.href;

        return (
          <div key={index} className="flex items-center gap-4">
            <Link
              href={step.href}
              className={`flex flex-col items-center gap-2 transition-all duration-500 ${
                isActive
                  ? "font-semibold"
                  : "text-white text-base"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  isActive
                    ? "border-primary bg-primary text-black"
                    : "border-primary text-white hover:bg-primary hover:text-black"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-sm sm:text-base">{step.label}</span>
            </Link>

            {/* Garis abu2 penghubung */}
            {index !== steps.length - 1 && (
              <div className="hidden md:block w-20 h-0.5 bg-gray-300 rounded-xl"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
