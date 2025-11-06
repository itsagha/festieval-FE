import api from "./api";
import axios from "axios";

export function logoutUser() {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
  window.location.href = "/"
}

export const loginUser = async (payload: { email: string; password: string }) => {
  const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL || "/auth/login";
  const res = await api.post(LOGIN_URL, payload);
  return res.data;
};

export const registerUser = async (payload: { name: string; email: string; password: string }) => {
  const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER_URL || "/auth/register";
  const res = await api.post(REGISTER_URL, payload);
  return res.data;
};

export const verifyOTP = async (data: { otpId: number; otp: string }) => {
  const OTP_URL = process.env.NEXT_PUBLIC_OTP_URL || "/auth/verify-otp";
  const res = await api.post(OTP_URL, data);
  return res.data;
};

// buat login dgn google
export const refreshAccessToken = async () => {
  const REFRESH_URL = process.env.NEXT_PUBLIC_REFRESH_TOKEN_URL!;
  console.log("REFRESH_URL:", REFRESH_URL);

  const res = await fetch(REFRESH_URL, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Gagal refresh token");

  const data = await res.json();
  console.log("Response refresh:", data);
  return data;
};
