"use client";
import { useEffect, useState } from "react";
import OrganizerNavbar from "@/components/navbar/OrganizerNavbar";

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById("organizer-navbar");
    if (navbar) {
      setNavHeight(navbar.offsetHeight);
    }
  }, []);

  return (
    <section>
      <OrganizerNavbar />
      <main style={{ paddingTop: `${navHeight}px` }} className="max-w-360 mx-auto px-6 py-6">{children}</main>
    </section>
  );
}
