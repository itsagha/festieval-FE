"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState("Memproses login...");

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

        localStorage.setItem("token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        const payload = decodeJWT(access_token);
        if (payload) {
          if (payload.role) {
            localStorage.setItem("role", payload.role);
          }
          if (payload.email) {
            localStorage.setItem("email", payload.email);
          }
          if (payload.name) {
            localStorage.setItem("name", payload.name);
          }
        }

        window.history.replaceState({}, '', '/auth/callback');

        setStatus("Berhasil login...");

        setTimeout(() => {
          const role = localStorage.getItem("role");
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
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      <p className="text-lg text-gray-700">{status}</p>
    </div>
  );
}

function decodeJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}
