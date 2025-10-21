"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authServices";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser({ email, password });

      // simpen ke local storage
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("role", res.role);

      // arahin ke page tergantung role
      if (res.role === "buyer") {
        router.push("/");
      } else if (res.role === "seller") {
        router.push("/");
      } else {
        router.push("/"); 
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed logging in, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="text-red-500 text-sm rounded">{error}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
        required
      />

      <p className="text-xs text-end">Forget password?</p>
      <Button
        variant="border border-primary text-primary hover:text-black"
        disabled={loading}
        className="mt-2"
      >
        {loading ? "Loading..." : "Sign In"}
      </Button>

      {/* garis or sign in with */}
      <div className="flex items-center gap-3 text-xs">
        <span className="flex-1 h-px bg-gray-300"></span>
        <p className="whitespace-nowrap">or sign in with</p>
        <span className="flex-1 h-px bg-gray-300"></span>
      </div>

      {/* social login icons */}
      <div className="flex justify-center gap-2">
        <Link
          href="https://google.com"
          className="flex items-center justify-center w-10 h-10 bg-white rounded-lg hover:bg-gray-300 transition-all duration-500"
        >
          <img
            src="/images/auth/google.png"
            alt="Google"
            className="w-5 h-5 object-contain"
          />
        </Link>
        <Link
          href="https://instagram.com"
          className="flex items-center justify-center w-10 h-10 bg-white rounded-lg hover:bg-gray-300 transition-all duration-500"
        >
          <img
            src="/images/auth/instagram.png"
            alt="Instagram"
            className="w-5 h-5 object-contain"
          />
        </Link>
      </div>
      <p className="text-center text-xs">Doesn't have an account? <span className="font-bold underline"><Link href="/auth/register">Create now</Link></span></p>
    </form>
  );
}