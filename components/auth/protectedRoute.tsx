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

  if (token === null) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Checking authentication...
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Access Denied. Required role: {allowedRoles.join(", ")}
      </div>
    );
  }

  return <>{children}</>;
}
