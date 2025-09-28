import { apiRequest } from "./api";
const PREFIX = "/api/portals";

export async function listPortals({ pageNumber = 1, pageSize = 100 } = {}) {
  const resp = await apiRequest(`${PREFIX}?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  const data = resp?.data || resp?.Data || {};
  const items = data.items || data.Items || [];
  return items.map(p => ({
    id: p.id ?? p.Id,
    name: p.name ?? p.Name,
    type: p.type ?? p.Type,
  }));
}
