import api from "./api";
import { useAuthStore, decodeJWT } from "@/app/stores/authStore";

export function logoutUser() {
  useAuthStore.getState().logout();

  localStorage.removeItem('auth-storage');

  api.post('/auth/logout').catch(console.error);

  window.location.href = "/";
}

export const loginUser = async (payload: { email: string; password: string }) => {
  const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL || "/auth/login";
  const res = await api.post(LOGIN_URL, payload);

  const { access_token, refresh_token, user } = res.data;

  const jwtPayload = decodeJWT(access_token);

  useAuthStore.getState().setAuth(
    access_token,
    refresh_token || '',
    {
      id: user?.id || jwtPayload?.sub,
      email: user?.email || jwtPayload?.email,
      name: user?.name || jwtPayload?.name,
      role: user?.role || jwtPayload?.role,
      avatar: user?.avatar,
    }
  );

  return res.data;
};

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string
}) => {
  const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER_URL || "/auth/register";
  const res = await api.post(REGISTER_URL, payload);
  return res.data;
};

export const verifyOTP = async (data: { otpId: number; otp: string }) => {
  const OTP_URL = process.env.NEXT_PUBLIC_OTP_URL || "/auth/verify-otp";
  const res = await api.post(OTP_URL, data);

  const { access_token, refresh_token, user } = res.data;

  if (access_token) {
    const jwtPayload = decodeJWT(access_token);

    useAuthStore.getState().setAuth(
      access_token,
      refresh_token || '',
      {
        id: user?.id || jwtPayload?.sub,
        email: user?.email || jwtPayload?.email,
        name: user?.name || jwtPayload?.name,
        role: user?.role || jwtPayload?.role,
        avatar: user?.avatar,
      }
    );
  }

  return res.data;
};

export const refreshAccessToken = async () => {
  const REFRESH_URL = process.env.NEXT_PUBLIC_REFRESH_TOKEN_URL || "/auth/refresh";

  const refreshToken = useAuthStore.getState().refreshToken;

  const res = await api.post(REFRESH_URL, {
    refresh_token: refreshToken
  });

  const { access_token } = res.data;

  if (access_token) {
    useAuthStore.getState().setToken(access_token);
  }

  return res.data;
};
