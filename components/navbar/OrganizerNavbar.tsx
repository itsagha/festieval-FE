"use client";

import { useState, useEffect } from "react";
import { LifeBuoy, Repeat2 } from "lucide-react";
import Button from "../ui/Button";
import { switchRole } from "@/services/authServices";

export default function OrganizerNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  // Ubah background saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSwitchRole = async () => {
    try {
      setIsSwitching(true);
      await switchRole();
      window.location.reload();
    } catch (err) {
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <nav
      id="organizer-navbar"
      className={`fixed top-0 left-0 w-full z-50 ${scrolled
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

        <div className="flex items-center gap-3">
          {/* Ganti Role */}
          <Button
            onClick={handleSwitchRole}
            disabled={isSwitching}
            className="flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-black"
          >
            <Repeat2 className="w-5 h-5" />
            {isSwitching ? "Mengganti..." : "Ganti Role"}
          </Button>

          {/* Bantuan */}
          <Button
            className="flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-black"
            onClick={() => alert("Butuh bantuan? Segera hubungi tim support.")}
          >
            <LifeBuoy className="w-5 h-5" />
            Bantuan
          </Button>
        </div>
      </div>
    </nav>
  );
}
