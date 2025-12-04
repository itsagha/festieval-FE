"use client";
import { useEffect, useState } from "react";
import SidebarOrganizer from "@/components/sidebar/SidebarOrganizer";

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById("organizer-navbar");
    if (navbar) {
      setNavHeight(navbar.offsetHeight);
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarOrganizer />

      {/* Content */}
      <main className="md:ml-64 flex-1 mx-auto p-8">
        {children}
      </main>
    </div>
  );
}
