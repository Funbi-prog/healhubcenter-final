import { customFetch } from "../utils/customFetch";
import { storeRefreshToken, storeToken, storeUser } from "../utils/storage";

function normalizeAuthData(payload) {
  const data = payload?.data ?? payload;
  const token = data?.token;
  const refreshToken = data?.refreshToken;
  const user = data?.user ?? null;
  return { token, refreshToken, user };
}

export async function register({ email, password, fullname }) {
  const response = await customFetch.post("/auth/signup", {
    email,
    password,
    fullname,
  });

  const { token, refreshToken, user } = normalizeAuthData(response.data);
  if (!token || !refreshToken)
    throw new Error("Missing token(s) in auth response");

  storeToken(token);
  storeRefreshToken(refreshToken);
  storeUser(user);

  return { token, refreshToken, user, raw: response.data };
}

export async function login({ email, password }) {
  const response = await customFetch.post("/auth/login", {
    email,
    password,
  });

  const { token, refreshToken, user } = normalizeAuthData(response.data);
  if (!token || !refreshToken)
    throw new Error("Missing token(s) in auth response");

  storeToken(token);
  storeRefreshToken(refreshToken);
  storeUser(user);

  return { token, refreshToken, user, raw: response.data };
}

export async function googleLogin({ idToken }) {
  const response = await customFetch.post("/auth/google-login", { idToken });

  const { token, refreshToken, user } = normalizeAuthData(response.data);
  if (!token || !refreshToken)
    throw new Error("Missing token(s) in auth response");

  storeToken(token);
  storeRefreshToken(refreshToken);
  storeUser(user);

  return { token, refreshToken, user, raw: response.data };
}

export async function logout() {
  customFetch.post("/auth/logout").catch(() => {});

  // Clear local auth data and trigger logout handler.
  storeToken(null);
  storeRefreshToken(null);
  storeUser(null);
}
