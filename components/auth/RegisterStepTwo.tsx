import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { registerUser } from "@/services/authServices";

export default function RegisterStepTwo({ nextStep, prevStep, onChange, data }: any) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset error kalo user ubah salah satu input
    if (data.password === confirmPassword) setError("");
  }, [data.password, confirmPassword]);

  const handleNext = async () => {
    setLoading(true);

    if (data.password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }

    if (data.password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    try {
      const res = await registerUser({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      localStorage.setItem("OTP_ID", res.otpId);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    nextStep();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Input password */}
      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) => onChange("password", e.target.value)}
        className={`p-3 rounded-xl bg-white text-gray-600 focus:outline-none border ${
          error && data.password.length < 8 ? "border-red-500" : "border-gray-300"
        }`}
      />

      {/* Input confirm password */}
      <input
        type="password"
        placeholder="Konfirmasi Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={`p-3 rounded-xl bg-white text-gray-600 focus:outline-none border ${
          error && data.password !== confirmPassword ? "border-red-500" : "border-gray-300"
        }`}
      />

      {/* error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-between gap-2 mt-2">
        <Button onClick={prevStep} variant="bg-gray-800 text-white w-full">
          Kembali
        </Button>
        <Button onClick={handleNext} variant="bg-primary text-black w-full" disabled={loading}>
          {loading ? "Mohon Tunggu" : "Buat Akun"}
        </Button>
      </div>
    </div>
  );
}
