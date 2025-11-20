"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/app/stores/authStore";
import SearchBar from "../ui/SearchBar";
import { Ticket, Compass, CircleUserRound, Home, Repeat2 } from "lucide-react";
import { motion } from "framer-motion";
import { switchRole } from "@/services/authServices";
import { useRouter } from "next/navigation";

export default function BuyerNavbar() {
  const user = useAuthStore((state) => state.user);
  const [scrolled, setScrolled] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const router = useRouter();

  // Ganti background saat scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 hidden md:block ${scrolled
          ? "bg-black/50 shadow-md backdrop-blur-md"
          : "bg-transparent backdrop-blur-sm"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-2 max-w-360 mx-auto">
          {/* Logo & Search */}
          <div className="flex items-center gap-4 flex-1">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/essentials/logo.png"
                alt="Logo"
                className="w-16"
              />
            </Link>

            <div className="hidden md:block w-2/3">
              <SearchBar placeholder="Cari event terdekat..." />
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <NavItem
              href="/explore"
              icon={<Compass className="w-5 h-5 text-primary" />}
              label="Jelajah Event"
            />
            <NavItem
              href="/orders"
              icon={<Ticket className="w-5 h-5 text-primary" />}
              label="Tiket Saya"
            />
            <NavItem
              href={user ? "#" : "/auth/login"}
              icon={<CircleUserRound className="w-5 h-5 text-primary" />}
              label={user?.name || "Login"}
            />

            {/* Tombol Ganti Role */}
            {user && (
              <button
                onClick={handleSwitchRole}
                disabled={isSwitching}
                className="flex items-center gap-2 border border-primary text-primary px-3 py-1 rounded-md hover:bg-primary hover:text-black transition"
              >
                <Repeat2 className="w-4 h-4" />
                {isSwitching ? "Mengganti..." : "Ganti Role"}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-black/50 backdrop-blur-sm border-t border-gray-700 flex justify-around py-6 md:hidden z-50">
        <BottomNavIcon href="/" icon={<Home className="w-6 h-6 text-primary" />} />
        <BottomNavIcon href="/explore" icon={<Compass className="w-6 h-6 text-primary" />} />
        <BottomNavIcon href="/orders" icon={<Ticket className="w-6 h-6 text-primary" />} />
        <BottomNavIcon href={user ? "#" : "/auth/login"} icon={<CircleUserRound className="w-6 h-6 text-primary" />} />

        {/* Ganti Role Mobile */}
        {user && (
          <motion.div whileTap={{ scale: 0.9 }}>
            <button
              onClick={handleSwitchRole}
              disabled={isSwitching}
              className="flex flex-col items-center justify-center text-gray-400 hover:text-primary transition"
            >
              <Repeat2 className="w-6 h-6 text-primary" />
              <span className="text-xs mt-1">{isSwitching ? "..." : "Ganti"}</span>
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-gray-200 hover:text-primary transition duration-500"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function BottomNavIcon({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div whileTap={{ scale: 0.9 }}>
      <Link
        href={href}
        className="flex flex-col items-center justify-center text-gray-400 hover:text-primary transition"
      >
        {icon}
      </Link>
    </motion.div>
  );
}
