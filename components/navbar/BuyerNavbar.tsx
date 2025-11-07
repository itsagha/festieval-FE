"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/app/stores/authStore";
import SearchBar from "../ui/SearchBar";
import { Ticket, Compass, CircleUserRound, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BuyerNavbar() {
  const user = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
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
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled
          ? "bg-black/50 shadow-md backdrop-blur-md"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-2 max-w-360 mx-auto">
        {/* Kiri: logo + search */}
        <div className="flex items-center gap-4 flex-1">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/essentials/logo.png" alt="Logo" className="w-16" />
          </Link>

          <div className="hidden md:block w-2/3">
            <SearchBar placeholder="Cari event terdekat..." />
          </div>
        </div>

        {/* Kanan: menu desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavItem href="/" icon={<Compass className="w-5 h-5 text-primary" />} label="Jelajah Event" />
          <NavItem href="/orders" icon={<Ticket className="w-5 h-5 text-primary" />} label="Tiket Saya" />
          <NavItem
            href="/profile"
            icon={<CircleUserRound className="w-5 h-5 text-primary" />}
            label={user?.name || "Guest"}
          />
        </div>

        {/* Tombol mobile */}
				<motion.button
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden p-2 rounded-lg transition"
					whileTap={{ scale: 0.9 }}
					animate={{ rotate: isOpen ? 90 : 0 }}
					transition={{
						type: "tween",
						duration: 0.2,
						ease: "easeInOut"
					}}
				>
					{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</motion.button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -15 }}
						transition={{ duration: 0.5, ease: "easeInOut" }}
						className="md:hidden backdrop-blur-md px-9 border-gray-200"
					>
						<div className="flex flex-col items-start py-4 space-y-4">
							<SearchBar placeholder="Cari event terdekat..." />
							<NavLinkMobile href="/" icon={<Compass />} label="Jelajah Event" />
							<NavLinkMobile href="/orders" icon={<Ticket />} label="Tiket Saya" />
							<NavLinkMobile
								href="/profile"
								icon={<CircleUserRound />}
								label={user?.name || "Guest"}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
    </nav>
  );
}

// komponen kecil biar rapih
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
      className="flex items-center gap-2 group relative text-gray-200 hover:text-primary transition duration-500"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function NavLinkMobile({
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
      className="flex items-center gap-2 text-primary"
    >
      {icon}
      <span className="text-white">{label}</span>
    </Link>
  );
}