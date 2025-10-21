// validasi role, kalo belom login, biar ga asal masuk dengan typing di URL nya
"use client";

import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { token, role } = useAuth(true);

  // nunggu dapet token, kasih loading
  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Checking authentication...
      </div>
    );
  }

  // Cek role kalau dibatasi
  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Access Denied
      </div>
    );
  }

  return <>{children}</>;
}
