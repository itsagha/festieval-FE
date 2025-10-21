import api from "./api";

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
