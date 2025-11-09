import { API_BASE_URL, API_TIMEOUT_MS } from "../Config/env";


export const isLocalMode = !String(API_BASE_URL || "").trim();

function buildUrl(path) {
  const p = String(path || "");

  if (/^https?:\/\//i.test(p)) return p;

  const base = String(API_BASE_URL || "").trim().replace(/\/+$/, "");
  const cleanPath = p.replace(/^\/+/, "");
  return `${base}/${cleanPath}`;
}

export async function apiRequest(path, { method = "GET", body, token } = {}) {
  if (isLocalMode) throw new Error("LOCAL_MODE");

  const url = buildUrl(path);
  const headers = { Accept: "application/json" };
  const init = { method, headers };

  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const controller = new AbortController();
  const timeoutMs = Number.isFinite(API_TIMEOUT_MS) ? API_TIMEOUT_MS : 10000;
  const t = setTimeout(() => controller.abort(), timeoutMs);
  init.signal = controller.signal;

  let res;
  try {
    res = await fetch(url, init);
  } catch (err) {
    clearTimeout(t);
    const isAbort = err?.name === "AbortError";
    const baseMsg = isAbort ? "Tempo esgotado na requisição" : (err?.message || "Network request failed");
    throw new Error(
      `${baseMsg}\n\nDicas:\n- Verifique API_BASE_URL em src/Config/env.js\n- A API está acessível do dispositivo?\n- Endpoint correto?\nURL: ${url}`
    );
  } finally {
    clearTimeout(t);
  }

 
  if (res.status === 204) return null;

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text || null;
  }

  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && (data.message || data.error)) ||
      (typeof data === "string" && data) ||
      `HTTP ${res.status}`;
    throw new Error(`Erro na API: ${msg}`);
  }

  if (data && typeof data === "object" && ("Data" in data || "data" in data)) {
    return data.Data ?? data.data;
  }

  return data;
}
