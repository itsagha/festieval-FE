import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// (Optional) Interceptor untuk tambah token otomatis
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;