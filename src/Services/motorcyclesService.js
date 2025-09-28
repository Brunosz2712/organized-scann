import { apiRequest } from "./api";

// se sua API já usa /api, deixe assim; caso contrário, troque PREFIX p/ "/motorcycles"
const PREFIX = "/api/motorcycles";

export async function listMotorcycles(token) {
  return apiRequest(`${PREFIX}`, { token });
}

export async function createMotorcycle(payload, token) {
  // payload: { rfid, placa, chassi, filial, status, portal }
  return apiRequest(`${PREFIX}`, { method: "POST", body: payload, token });
}

export async function updateMotorcycle(id, payload, token) {
  return apiRequest(`${PREFIX}/${id}`, { method: "PUT", body: payload, token });
}

export async function deleteMotorcycle(id, token) {
  return apiRequest(`${PREFIX}/${id}`, { method: "DELETE", token });
}
