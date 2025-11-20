"use client";

// hide navbar buyer pas di folder organizer dan auth
import { usePathname } from "next/navigation";
import BuyerNavbar from "@/components/navbar/BuyerNavbar";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar =
    pathname.startsWith("/auth") || pathname.startsWith("/organizer");

  return (
    <>
      {!hideNavbar && <BuyerNavbar />}
      {children}
    </>
  );
}
