"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authServices";
import Button from "@/components/ui/Button";
import RegisterModal from "@/components/auth/RegisterModal";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      <div className="flex flex-col md:flex-row md:gap-20 justify-center items-center min-h-screen">
        <img
          src="/images/essentials/logo.png"
          alt="Logo"
          className="md:w-xl"
        />
  
        {/* Main container */}
        <div className="flex flex-col gap-4 p-6 sm:p-8 w-full max-w-lg">
          <h1 className="text-2xl md:text-start text-center font-extrabold">Festieval</h1>
          <h1 className="hidden md:block text-justify">Event Management & Ticketing</h1>
  
          {error && <p className="text-red-500 text-sm rounded">{error}</p>}
  
          {/* Tombol Login Google */}
          <Button 
            className="flex justify-center items-center gap-2 bg-white text-black"
            onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}  
          >
            <img src="/images/auth/google.png" alt="" className="w-4 h-4" />
            Login dengan Google
          </Button>
  
          {/* garis */}
          <div className="flex items-center gap-3 text-xs">
            <span className="flex-1 h-px bg-gray-300"></span>
            <p className="whitespace-nowrap">atau</p>
            <span className="flex-1 h-px bg-gray-300"></span>
          </div>
  
          {/* Form login */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
  
            <p className="text-xs text-end">Lupa password?</p>
  
            <Button
              variant="bg-primary text-black"
              disabled={loading}
              className="mt-2"
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
  
          <p className="text-center text-xs mt-2">
            Belum punya akun?
            <span className="font-semibold ml-1">
              <button
                className="underline cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                Buat Sekarang
              </button>
            </span>
          </p>
        </div>
      </div>
  
      {/* Modal Register */}
      <RegisterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
  
}