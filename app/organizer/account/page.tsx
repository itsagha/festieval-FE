// profile dashboard khusus mobile view
"use client"

import { Settings, Banknote, Cookie, LogOut, ArrowLeftRight } from "lucide-react"
import { useAuthStore } from "@/app/stores/authStore"
import { switchRole, logoutUser } from "@/services/authServices"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function OrganizerAccountPage() {
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
      <div className="block md:hidden">
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-xl">Profile</h1>

            {/* photo profile, nama, email, tombol edit info personal */}
            <div className="grid grid-cols-2">
              <img src="/images/organizer/dummyPerson.jpg" alt="photo profile" className="rounded-full w-28 h-28"/>
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold">{user?.name}</h3>
                  <p className="text-sm">{user?.email}</p>
                  <Link href="/organizer/account/basic-information" className="flex justify-center py-1.5 px-4 bg-primary rounded-3xl text-black text-xs font-semibold">
                    Edit Informasi Personal
                  </Link>
                </div>
            </div>

          <div className="rounded-2xl my-10 border border-primary p-4">
            <h3 className="font-bold">Informasi Akun</h3>
            {/* Garis */}
            <div className="h-px w-full bg-white rounded-full mt-4 mb-8"></div>
            {/* Info akun */}
              <ul className="space-y-8 text-white font-semibold text-sm mb-8">
                <Link href="/organizer/account/settings" className="flex justify-start items-center gap-2 font-normal">
                  <Settings size={20}/>
                  Pengaturan
                </Link>
                <Link href="/organizer/account/legal-information" className="flex justify-start items-center gap-2 font-normal">
                  <Cookie size={20}/>
                  Informasi Legal
                </Link>
                <Link href="/organizer/account/bank-account" className="flex justify-start items-center gap-2 font-normal">
                  <Banknote size={20}/>
                  Rekening
                </Link>
              </ul>

              <h3 className="font-bold">Mode User</h3>
              {/* Garis */}
              <div className="h-px w-full bg-white rounded-full mt-4 mb-8"></div>
              {/* Mode USer */}
              <ul className="space-y-8 text-white font-semibold text-sm">
                <button onClick={handleSwitchRole} disabled={isSwitching} className="flex justify-start items-center gap-2 font-normal">
                  <Settings size={20}/>
                  {isSwitching ? "Mengganti Role..." : "Beralih Akun Pembeli"}
                </button>
                <button onClick={logoutUser} className="flex justify-start items-center gap-2 font-normal">
                  <LogOut size={20}/>
                  Logout
                </button>
              </ul>
            </div>
        </div>
      </div>
    );
  }