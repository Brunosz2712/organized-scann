import { apiRequest } from "./api";

const PREFIX = "/api/motorcycles";

// LIST
export async function listMotorcycles(token, { pageNumber = 1, pageSize = 50 } = {}) {
  const resp = await apiRequest(`${PREFIX}?PageNumber=${pageNumber}&PageSize=${pageSize}`, { token });
  // resp pode ser paginado (Items/items) ou lista direta
  const data = resp?.items || resp?.Items || resp || [];
  return (Array.isArray(data) ? data : []).map(mapFromApi);
}

// CREATE
export async function createMotorcycle(payload, token) {
  const body = mapToApi(payload);
  const created = await apiRequest(`${PREFIX}`, { method: "POST", body, token });
  // Alguns backends retornam DTO direto; outros aninham.
  const entity = created?.data || created?.Data || created;
  return mapFromApi(entity);
}

// UPDATE
export async function updateMotorcycle(id, payload, token) {
  const body = mapToApi(payload);
  const updated = await apiRequest(`${PREFIX}/${id}`, { method: "PUT", body, token });
  const entity = updated?.data || updated?.Data || updated;
  return mapFromApi(entity);
}

// DELETE
export async function deleteMotorcycle(id, token) {
  await apiRequest(`${PREFIX}/${id}`, { method: "DELETE", token });
  return true;
}

/* ========= Maps ========= */

// App: { id, placa, rfid, chassi, filial, status, portal }
// API: { Id, LicensePlate, Rfid, ProblemDescription, PortalId, EntryDate, AvailabilityForecast, ... }

function mapToApi(app) {
  const now = new Date();
  const in7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Se portal estiver vazio, usa 1 por padrão (ou derive de filial)
  const portalIdRaw = app.portal || app.filial || "1";
  const parsed = parseInt(portalIdRaw, 10);
  const portalId = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;

  return {
    id: app.id ? Number(app.id) : undefined,
    licensePlate: app.placa || app.LicensePlate,
    rfid: app.rfid || app.Rfid,
    problemDescription: app.status || app.ProblemDescription || "",
    portalId,
    entryDate: app.entryDate || app.EntryDate || now.toISOString(),
    availabilityForecast: app.availabilityForecast || app.AvailabilityForecast || in7.toISOString(),
    brand: app.brand || app.Brand || null,
    year: app.year || app.Year || null,
  };
}

function mapFromApi(api) {
  if (!api) return null;
  return {
    id: api.id ?? api.Id ?? String(Date.now()),
    placa: api.licensePlate ?? api.LicensePlate ?? "",
    rfid: api.rfid ?? api.Rfid ?? "",
    status: api.problemDescription ?? api.ProblemDescription ?? "",
    portal: api.portalName ?? api.PortalName ?? String(api.portalId ?? api.PortalId ?? ""),
    entryDate: api.entryDate ?? api.EntryDate,
    availabilityForecast: api.availabilityForecast ?? api.AvailabilityForecast,
    brand: api.brand ?? api.Brand,
    year: api.year ?? api.Year,
  };
}
