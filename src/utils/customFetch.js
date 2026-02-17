import axios from "axios";
import { API_BASE_URL } from "../constants";
import {
  clearAuthStorage,
  getRefreshToken,
  getToken,
  storeRefreshToken,
  storeToken,
} from "./storage";

export const customFetch = axios.create({
  baseURL: API_BASE_URL,
});

let onLogout = null;
let refreshPromise = null;

export function setCustomFetchLogoutHandler(handler) {
  onLogout = typeof handler === "function" ? handler : null;
}

function isAuthEndpoint(url) {
  const value = String(url ?? "");
  return (
    value.includes("/auth/login") ||
    value.includes("/auth/signup") ||
    value.includes("/auth/register") ||
    value.includes("/auth/refresh") ||
    value.includes("auth/refresh")
  );
}

function buildApiUrl(pathOrUrl) {
  if (!pathOrUrl) return API_BASE_URL;

  if (
    typeof pathOrUrl === "string" &&
    (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://"))
  ) {
    return pathOrUrl;
  }

  // If caller passes an absolute API path (e.g. /api/v1/auth/refresh),
  // join it to the origin of API_BASE_URL.
  if (typeof pathOrUrl === "string" && pathOrUrl.startsWith("/api/")) {
    const origin = new URL(API_BASE_URL).origin;
    return `${origin}${pathOrUrl}`;
  }

  const base = API_BASE_URL.replace(/\/+$/, "");
  const path = String(pathOrUrl).replace(/^\/+/, "");
  return `${base}/${path}`;
}

function forceLogout({ redirect = true } = {}) {
  clearAuthStorage();
  if (onLogout) onLogout();
  else if (
    redirect &&
    typeof window !== "undefined" &&
    window.location &&
    !["/login", "/signup", "/auth"].includes(window.location.pathname)
  ) {
    window.location.assign("/login");
  }
}

async function refreshAccessToken() {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("Missing refresh token");

    const response = await axios.post(
      buildApiUrl("auth/refresh"),
      { refreshToken },
      { headers: { "Content-Type": "application/json" } },
    );

    const data = response?.data?.data ?? response?.data;
    const nextToken = data?.token;
    const nextRefreshToken = data?.refreshToken ?? refreshToken;

    if (!nextToken) throw new Error("Refresh response missing token");

    storeToken(nextToken);
    storeRefreshToken(nextRefreshToken);

    return nextToken;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

// Request interceptor: attach access token
customFetch.interceptors.request.use((config) => {
  if (isAuthEndpoint(config?.url)) return config;

  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: refresh on 401 and retry
customFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    if (!originalRequest) return Promise.reject(error);

    if (!originalRequest._retryCount) originalRequest._retryCount = 0;

    // If refresh failed twice, log out.
    if (originalRequest._retryCount >= 2) {
      forceLogout();
      return Promise.reject(error);
    }

    const status = error?.response?.status;
    if (status === 401) {
      // Never try to refresh/retry for auth endpoints.
      if (isAuthEndpoint(originalRequest?.url)) {
        return Promise.reject(error);
      }

      try {
        originalRequest._retryCount += 1;

        // If we had a token, attempt refresh, then retry.
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const newToken = await refreshAccessToken();
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return customFetch(originalRequest);
        }

        forceLogout();
        return Promise.reject(error);
      } catch (refreshError) {
        forceLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
