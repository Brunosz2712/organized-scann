// src/Services/motorcyclesService.js
import { apiRequest, isLocalMode } from "./api";
import {
  loadMotorcycles,
  saveMotorcycles,
  addMotorcycle as addLocal,
  updateMotorcycleLocal,
  deleteMotorcycleLocal
} from "../pages/Storage/motorcycles.js";

const PREFIX = "/api/motorcycles";

// LIST
export async function listMotorcycles(token, { pageNumber = 1, pageSize = 50 } = {}) {
  if (isLocalMode) {
    return await loadMotorcycles();
  }
  const resp = await apiRequest(`${PREFIX}?PageNumber=${pageNumber}&PageSize=${pageSize}`, { token });
  const items = (resp?.items || resp?.Items || (Array.isArray(resp) ? resp : [])) ?? [];
  return items.map(mapFromApi);
}

// CREATE
export async function createMotorcycle(payload, token) {
  if (isLocalMode) {
    const local = { ...payload, id: Date.now().toString() };
    addLocal(local);
    return local;
  }
  const created = await apiRequest(`${PREFIX}`, { method: "POST", body: mapToApi(payload), token });
  return mapFromApi(created?.data || created?.Data || created);
}

// UPDATE
export async function updateMotorcycle(id, payload, token) {
  if (isLocalMode) {
    return updateMotorcycleLocal(id, payload);
  }
  const updated = await apiRequest(`${PREFIX}/${id}`, { method: "PUT", body: mapToApi(payload), token });
  return mapFromApi(updated?.data || updated?.Data || updated);
}

// DELETE
export async function deleteMotorcycle(id, token) {
  if (isLocalMode) {
    deleteMotorcycleLocal(id);
    return true;
  }
  await apiRequest(`${PREFIX}/${id}`, { method: "DELETE", token });
  return true;
}

/* ========== MAPS ========== */
function mapToApi(app) {
  const now = new Date();
  const in7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const portalIdRaw = app.portal || app.filial || "1";
  const parsed = parseInt(portalIdRaw, 10);
  const portalId = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;

  return {
    id: app.id ? Number(app.id) : undefined,
    licensePlate: app.placa || "",
    rfid: app.rfid || "",
    problemDescription: app.status || "",
    portalId,
    entryDate: app.entryDate || now.toISOString(),
    availabilityForecast: app.availabilityForecast || in7.toISOString(),
    brand: app.brand || null,
    year: app.year || null,
  };
}

function mapFromApi(api) {
  if (!api || typeof api !== "object") return null;
  return {
    id: api.id ?? api.Id ?? String(Date.now()),
    placa: api.licensePlate ?? api.LicensePlate ?? "",
    rfid: api.rfid ?? api.Rfid ?? "",
    status: api.problemDescription ?? api.ProblemDescription ?? "",
    portal: api.portalName ?? api.PortalName ?? String(api.portalId ?? api.PortalId ?? ""),
    entryDate: api.entryDate ?? api.EntryDate ?? null,
    availabilityForecast: api.availabilityForecast ?? api.AvailabilityForecast ?? null,
    brand: api.brand ?? api.Brand ?? null,
    year: api.year ?? api.Year ?? null,
  };
}
