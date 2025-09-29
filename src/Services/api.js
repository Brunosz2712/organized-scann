// src/Services/api.js
import { API_BASE_URL, API_TIMEOUT_MS } from "../Config/env";

// Quando API_BASE_URL está vazio => modo local (sem chamadas de rede)
export const isLocalMode = !API_BASE_URL;

function buildUrl(path) {
  const base = (API_BASE_URL || "").replace(/\/+$/, "");
  const p = String(path || "").replace(/^\/+/, "");
  return `${base}/${p}`;
}

export async function apiRequest(path, { method = "GET", body, token } = {}) {
  if (isLocalMode) {
    // Em modo local, não chamamos rede; quem usa deve tratar o fallback.
    throw new Error("LOCAL_MODE");
  }

  const url = buildUrl(path);
  const headers = { Accept: "application/json" };
  const init = { method, headers };

  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  init.signal = controller.signal;

  let res;
  try {
    res = await fetch(url, init);
  } catch (err) {
    clearTimeout(t);
    throw new Error(
      (err?.message || "Network request failed") +
        `\n\nDicas:\n- Verifique API_BASE_URL em src/Config/env.js\n- A API está acessível do dispositivo?\nURL: ${url}`
    );
  }
  clearTimeout(t);

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `HTTP ${res.status}`;
    throw new Error(`Erro na API: ${msg}`);
  }

  // Normaliza envelopes comuns Data/data
  if (data && typeof data === "object" && ("Data" in data || "data" in data)) {
    return data.Data ?? data.data;
  }
  return data;
}
