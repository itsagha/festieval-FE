import { useState } from "react";
import OTPInput from "react-otp-input";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { verifyOTP } from "@/services/authServices";
import { useAuthStore } from "@/app/stores/authStore";

export default function RegisterStepOTP({ nextStep, prevStep }: any) {
  const router = useRouter(); 
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setOtp(numericValue);
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);
  
    try {
      const otpId = localStorage.getItem("OTP_ID");
      if (!otpId) {
        setError("OTP ID tidak ditemukan. Silakan daftar ulang.");
        return;
      }
  
      const payload = {
        otpId: Number(otpId),
        otp: otp,
      };
  
      const res = await verifyOTP(payload);
  
      if (res.access_token) {
        // simpan dan zustand
        useAuthStore.getState().setToken(res.access_token);
  
        localStorage.removeItem("OTP_ID");
        nextStep();
        router.push("/");
      } else {
        setError(res.message || "Kode OTP salah");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat verifikasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <OTPInput
        value={otp}
        onChange={handleChange}
        numInputs={6}
        inputType="tel"
        shouldAutoFocus
        renderInput={({ style, ...props }) => (
          <input
            {...props} 
            style={{}} // kosongin style bawaan biar gak override tailwindf
            maxLength={1}
            className="w-10 h-10 sm:w-12 sm:h-12 text-center rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-lg bg-white text-gray-700"
            onInput={(e: any) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
        )}
        containerStyle="flex justify-center gap-3 sm:gap-4"
      />

      <p className="text-white mt-1 text-xs">
        Belum mendapatkan kode OTP?
        <button className="font-semibold cursor-pointer ml-1 underline">
          Kirim ulang
        </button>
      </p>

      {error && <p className="text-red-500 text-center text-sm">{error}</p>}

      <div className="flex gap-2 justify-between w-full mt-2">
        <Button onClick={prevStep} variant="bg-gray-800 text-white w-full">
          Kembali
        </Button>
        <Button
          onClick={handleVerify}
          disabled={loading}
          variant="bg-primary text-black w-full"
        >
          {loading ? "Memverifikasi..." : "Verifikasi"}
        </Button>
      </div>
    </div>
  );
}