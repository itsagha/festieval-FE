"use client";

import { logoutUser } from "@/services/authServices";
import { useAuthStore } from "@/app/stores/authStore";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated());
  const user = useAuthStore((state) => state.getUser());

  return (
    <div className="max-w-7xl mx-auto text-center py-28">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <h1 className="text-2xl font-bold mb-4">Nonton seru, ga pake drama!</h1>

      {!isLoggedIn ? (
        <>
          <p className="text-gray-300">
            Anda belum login, silahkan login terlebih dahulu
          </p>
        </>
      ) : (
        <>
          <p>Anda sudah login</p>
          <p>{user?.name}</p>
          <p>{user?.role}</p>
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              onClick={logoutUser}
              className="border border-danger text-danger hover:bg-danger hover:text-white"
            >
              Logout
            </Button>
            <Link href="/organizer/dashboard">
              <Button
                className="border border-primary text-primary hover:bg-primary hover:text-black hover:opacity-90"
              >
                Organizer Dashboard
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}