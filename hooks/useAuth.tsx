// biar bisa ambil token dmn aja
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthUser {
  token: string | null;
  role: string | null;
}

export function useAuth(redirectToLogin = false): AuthUser {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthUser>({
    token: null,
    role: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token && redirectToLogin) {
      router.push("/auth/login");
    } else {
      setAuth({ token, role });
    }
  }, [redirectToLogin, router]);

  return auth;
}