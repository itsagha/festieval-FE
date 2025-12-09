"use client"

import { LayoutDashboard, CirclePlus, List, KeyRound, Info, Settings, Cookie, Banknote, ArrowLeftRight, LogOut } from "lucide-react"
import { switchRole, logoutUser } from "@/services/authServices"
import { useRouter } from "next/navigation"
import { useState } from "react"
import NavItem from "./NavItem"
import { useAuthStore } from "@/app/stores/authStore"

export default function SidebarOrganizer() {
  const user = useAuthStore((state) => state.getUser())
  const [isSwitching, setIsSwitching] = useState(false)
  const router = useRouter()

  // ganti role
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
    } catch (error) {
      console.error("Error switching role:", error);
    } finally {
      setIsSwitching(false);
    }
  }

  return (
    <aside className="fixed left-0 top-0 w-64 bg-walnut shadow p-4 h-screen hidden md:block">

      {/* info user */}
      <div className="flex justify-between rounded-xl bg-primary p-4">
        <div className="flex flex-col">
          <h3 className="font-extrabold text-lg text-walnut">{user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>

        {/* photo profile */}
        <img src="/images/organizer/dummyPerson.jpg" alt="photo profile" className="rounded-full w-10 h-10"/>
      </div>
      <ul className="space-y-1 text-sm text-gray-400 font-semibold">

        {/* Dashboard */}
        <p className="my-4">Dashboard</p>
        <NavItem href="/organizer/dashboard" icon={LayoutDashboard} label="Dashboard" />

        <NavItem href="/organizer/event" icon={CirclePlus} label="Buat Event" />

        <NavItem href="/organizer/event/myEvent" icon={List} label="Event Saya" />

        <NavItem href="/organizer/account/manage-access" icon={KeyRound} label="Kelola Akses" />

        {/* Garis */}
        <div className="h-0.5 w-full bg-gray-400/30 rounded-full my-4"></div>

        {/* Akun */}
        <p className="my-4">Akun</p>
        <NavItem href="/organizer/account/basic-information" icon={Info} label="Informasi Dasar" />

        <NavItem href="/organizer/account/settings" icon={Settings} label="Pengaturan" />

        <NavItem href="/organizer/account/legal-information" icon={Info} label="Informasi Legal" />

        <NavItem href="/organizer/account/bank-account" icon={Cookie} label="Rekening" />

        {/* Mode user */}
        <p className="my-4">Mode User</p>
        <button className="flex justify-start gap-3 w-full items-center hover:bg-primary hover:text-walnut rounded-xl p-2 duration-700 cursor-pointer" onClick={handleSwitchRole} disabled={isSwitching}>
          <ArrowLeftRight size={20}/>
          {isSwitching ? "Mengganti Role..." : "Beralih Akun Pembeli"}
        </button>
        {/* logout */}
        <button className="flex justify-start gap-3 items-center hover:text-danger duration-700 cursor-pointer p-2" onClick={logoutUser}>
          <LogOut size={20}/>
          Keluar
        </button>
      </ul>
    </aside>
  );
}