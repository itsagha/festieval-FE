"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/authStore";

interface AuthUser {
  token: string | null;
  role: string | null;
  user: {
    id?: number;
    email?: string;
    name?: string;
    avatar?: string;
  } | null;
}

export function useAuth(redirectToLogin = false): AuthUser {
  const router = useRouter();

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.user?.role || null);

  useEffect(() => {
    if (!token && redirectToLogin) {
      router.push("/auth/login");
    }
  }, [token, redirectToLogin, router]);

  return {
    token,
    role,
    user
  };
}
