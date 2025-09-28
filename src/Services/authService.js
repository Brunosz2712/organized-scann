import { apiRequest } from "./api";

// Ajuste os caminhos conforme sua API:
export async function loginService({ email, password }) {
  // retorno esperado: { token, user: { id, name, email } }
  return apiRequest("/auth/login", { method: "POST", body: { email, password } });
}

export async function registerService({ name, email, password }) {
  // retorno esperado: { token?, user? }
  return apiRequest("/auth/register", { method: "POST", body: { name, email, password } });
}

export async function logoutService(token) {
  try { await apiRequest("/auth/logout", { method: "POST", token }); } catch {}
}
