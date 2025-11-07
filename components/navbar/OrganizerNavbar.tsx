"use client";

import { useState, useEffect } from "react";
import { LifeBuoy } from "lucide-react";
import Button from "../ui/Button";

export default function OrganizerNavbar() {
  const [scrolled, setScrolled] = useState(false);

  // Ubah background saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="organizer-navbar"
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled
          ? "bg-black/50 shadow-md backdrop-blur-md"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-2 max-w-360 mx-auto">
        {/* Logo */}
        <img
          src="/images/essentials/logo.png"
          alt="Logo"
          className="w-16"
        />

        {/* Bantuan */}
        <Button
          className="flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-black"
          onClick={() => alert("kntol")}
        >
          <LifeBuoy className="w-5 h-5" />
          Bantuan
        </Button>
      </div>
    </nav>
  );
}
