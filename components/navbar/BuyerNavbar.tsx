"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/app/stores/authStore";
import SearchBar from "../ui/SearchBar";
import { Ticket, Compass, CircleUserRound, Menu, X, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BuyerNavbar() {
  const user = useAuthStore((state) => state.user);
  const [scrolled, setScrolled] = useState(false);

  // ganti background saat scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* desktop navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 hidden md:block ${
          scrolled
            ? "bg-black/50 shadow-md backdrop-blur-md"
            : "bg-transparent backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-2 max-w-360 mx-auto">
          {/* logo & search */}
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

          {/* menu desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <NavItem
              href="/"
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
          </div>
        </div>
      </nav>

      {/* Mobile navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-black/50 backdrop-blur-sm border-t border-gray-700 flex justify-around py-6 md:hidden z-50">
        <BottomNavIcon href="/" icon={<Home className="w-6 h-6 text-primary" />} />
        <BottomNavIcon href="/explore" icon={<Compass className="w-6 h-6 text-primary" />} />
        <BottomNavIcon href="/orders" icon={<Ticket className="w-6 h-6 text-primary" />} />
        <BottomNavIcon href={user ? "#" : "/auth/login"} icon={<CircleUserRound className="w-6 h-6 text-primary" />} />
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