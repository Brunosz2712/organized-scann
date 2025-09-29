import { apiRequest, isLocalMode } from "./api";

// Ajuste os endpoints se você tiver uma API real
export async function loginService({ email, password }) {
  if (isLocalMode) {
    // modo local: simula login
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
