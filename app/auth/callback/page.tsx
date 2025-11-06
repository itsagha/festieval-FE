"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { decodeJWT, useAuthStore } from "@/app/stores/authStore";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState("Memproses login...");
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get("session");
        const error = params.get("error");

        if (error) {
          setStatus("Login failed");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }

        if (!sessionId) {
          throw new Error("No session ID provided");
        }

        setStatus("Mendapatkan google credentials...");
        const response = await api.post('/auth/oauth/exchange', {
          session_id: sessionId,
        });

        const { access_token, refresh_token } = response.data;

        if (!access_token || !refresh_token) {
          throw new Error("Invalid tokens received");
        }

        const payload = decodeJWT(access_token);

        setAuth(access_token, refresh_token, {
          id: payload?.sub,
          email: payload?.email,
          name: payload?.name,
          role: payload?.role,
        });

        window.history.replaceState({}, '', '/auth/callback');
        setStatus("Berhasil login...");

        setTimeout(() => {
          const role = useAuthStore.getState().getRole();
          if (role === "organizer") {
            router.push("/dashboard");
          } else {
            router.push("/");
          }
        }, 1000);
      } catch (err: any) {
        console.error("Google OAuth callback error:", err);
        setStatus(err.response?.data?.message || "Login failed");
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    handleGoogleCallback();
  }, [router, setAuth]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      <p className="text-lg text-gray-700">{status}</p>
    </div>
  );
}
