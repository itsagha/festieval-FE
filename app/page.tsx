"use client";

import { logoutUser } from "@/services/authServices";
import { useAuthStore } from "@/app/stores/authStore";

export default function Home() {
  const token = useAuthStore((state) => state.token);

  const isLoggedIn = !!token;

  return (
    <div className="max-w-7xl mx-auto text-center py-20">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>

      {!isLoggedIn ? (
        <>
          <p className="text-gray-300">
            Anda belum login, silahkan klik tombol di bawah ini
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <a className="underline-hover" href="/auth/login">
              Login
            </a>
          </div>
        </>
      ) : (
        <>
          <p className="text-green-400">Anda sudah login</p>
          <button
            onClick={logoutUser}
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:scale-102 transition-transform duration-500"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
