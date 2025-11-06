"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { refreshAccessToken } from "@/services/authServices";
import { useAuthStore } from "@/app/stores/authStore";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken } = useAuthStore();

  useEffect(() => {
    const success = searchParams.get("success");

    if (success === "true") {
      const handleLogin = async () => {
        try {
          const data = await refreshAccessToken();
          if (data?.access_token) {
            setToken(data.access_token);
            router.push("/");
          } else {
            console.error("Access token tidak ditemukan:", data);
          }
        } catch (err) {
          console.error("Gagal refresh token:", err);
        }
      };

      handleLogin();
    }
  }, [searchParams, setToken, router]);

  return (
    <div className="flex items-center justify-center h-screen text-white">
      <p>Memproses login melalui Google...</p>
    </div>
  );
}
