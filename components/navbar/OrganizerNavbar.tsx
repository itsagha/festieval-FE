"use client";

import { useState, useEffect } from "react";
import { LifeBuoy, Repeat2, LogOut, Menu, X } from "lucide-react";
import Button from "../ui/Button";
import { switchRole } from "@/services/authServices";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "@/services/authServices";
import { useRouter } from "next/navigation";

export default function OrganizerNavbar() {
  const [isSwitching, setIsSwitching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSwitchRole = async () => {
    try {
      setIsSwitching(true);
  
      const result = await switchRole();
      const newRole = result?.user?.role;
  
      if (newRole === "buyer") {
        router.push("/");
      } else if (newRole === "organizer") {
        router.push("/organizer/dashboard");
      }
  
    } catch (err) {
      console.error("Error switching role:", err);
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <nav
      id="organizer-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-black/50 shadow-md backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between px-4 py-2 max-w-360 mx-auto">
        {/* Logo */}
        <img src="/images/essentials/logo.png" alt="Logo" className="w-16" />

        {/* Tombol desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={handleSwitchRole}
            disabled={isSwitching}
            className="flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-black"
          >
            <Repeat2 className="w-4 h-4" />
            {isSwitching ? "Mengganti..." : "Ganti Role"}
          </Button>

          <Button
            className="flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-black"
            onClick={() => alert("Butuh bantuan? Segera hubungi tim support.")}
          >
            <LifeBuoy className="w-4 h-4" />
            Bantuan
          </Button>

          <Button
            className="flex items-center gap-2 border border-danger text-danger hover:bg-danger hover:text-black"
            onClick={logoutUser}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Tombol hamburger (mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-primary focus:outline-none"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 80, damping: 15 },
            }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="md:hidden h-screen"
          >
            <div className="flex flex-col items-center gap-4 py-4">
              <Button
                onClick={handleSwitchRole}
                disabled={isSwitching}
                className="w-4/5 flex items-center justify-center gap-2 border border-primary text-primary"
              >
                <Repeat2 className="w-4 h-4" />
                {isSwitching ? "Mengganti..." : "Ganti Role"}
              </Button>

              <Button
                className="w-4/5 flex items-center justify-center gap-2 border border-primary text-primary"
                onClick={() => alert("Butuh bantuan? Segera hubungi tim support.")}
              >
                <LifeBuoy className="w-4 h-4" />
                Bantuan
              </Button>

              <Button
                className="w-4/5 flex items-center justify-center gap-2 border border-danger text-danger"
                onClick={logoutUser}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
