import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const excludedRoutes = [
  "/api/session/",
  "/api/user/account/register",
  "/api/session/refresh",
];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (excludedRoutes.includes(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      error.response.data?.errorCategory === "session_error" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.get("/api/session/refresh");
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
