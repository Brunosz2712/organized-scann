import { apiRequest } from "./api";

// Controller .NET: [Route("api/motorcycles")]
const PREFIX = "/api/motorcycles";

// LISTA (retorna DTO com { LicensePlate, Rfid, PortalName, ProblemDescription, EntryDate, AvailabilityForecast })
export async function listMotorcycles(token, { pageNumber = 1, pageSize = 50 } = {}) {
  const resp = await apiRequest(`${PREFIX}?PageNumber=${pageNumber}&PageSize=${pageSize}`, { token });
  // o controller usa HateoasResponse<PaginatedResponse<T>>
  const data = resp?.data || resp?.Data || {};
  const items = data.items || data.Items || [];
  return items.map(mapFromApi);
}

// CRIA (backend exige: LicensePlate, Rfid, PortalId (>0), EntryDate <= AvailabilityForecast, ProblemDescription opcional)
export async function createMotorcycle(payload, token) {
  const body = mapToApi(payload);
  const created = await apiRequest(`${PREFIX}`, { method: "POST", body, token });
  // alguns endpoints devolvem a entidade; outros podem devolver DTO
  return mapFromApi(created);
}

export async function updateMotorcycle(id, payload, token) {
  const body = mapToApi(payload);
  const updated = await apiRequest(`${PREFIX}/${id}`, { method: "PUT", body, token });
  return mapFromApi(updated);
}

export async function deleteMotorcycle(id, token) {
  await apiRequest(`${PREFIX}/${id}`, { method: "DELETE", token });
  return true;
}

/* =========================
   MAPS (App <-> API)
   ========================= */

// O App usa { id, placa, rfid, chassi, filial, status, portal }
// A API usa { Id, LicensePlate, Rfid, ProblemDescription, PortalId, EntryDate, AvailabilityForecast, Brand?, Year? }

function mapToApi(app) {
  const now = new Date();
  const in7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const portalId = parseInt(app.portal || app.filial || "1", 10);
  return {
    id: app.id ? Number(app.id) : undefined,
    licensePlate: app.placa || app.LicensePlate,
    rfid: app.rfid || app.Rfid,
    problemDescription: app.status || app.ProblemDescription || "",
    portalId: Number.isFinite(portalId) && portalId > 0 ? portalId : 1,
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
