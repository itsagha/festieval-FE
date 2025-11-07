"use client";
// buat hide BuyerNavbar.tsx di halaman login, regist, organizer
import { usePathname } from "next/navigation";
import BuyerNavbar from "@/components/navbar/BuyerNavbar";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = ["/auth/login", "/auth/callback", "/organizer"].includes(pathname);

  return (
    <>
      {!hideNavbar && <BuyerNavbar />}
      {children}
    </>
  );
}