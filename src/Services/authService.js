import { apiRequest, isLocalMode } from "./api";

export async function loginService({ email, password }) {
  if (isLocalMode) {
    return { token: "local-token", user: { id: 1, name: "Usuário Local", email } };
  }
  return apiRequest("/api/auth/login", { method: "POST", body: { email, password } });
}

export async function registerService({ name, email, password }) {
  if (isLocalMode) {
    return { token: "local-token", user: { id: 1, name, email } };
  }
  return apiRequest("/api/auth/register", { method: "POST", body: { name, email, password } });
}

export async function logoutService() {
  return true;
}
