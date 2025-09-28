import { apiRequest } from "./api";

// A API NÃO possui /auth/login. Usaremos /api/users:
// - Login: busca o usuário pelo par (email+password) em /api/users (com paginação ampla).
// - Register: cria usuário em /api/users.
// - Logout: apenas limpa client-side (sem endpoint).

export async function loginService({ email, password }) {
  // busca até 1000 usuários (ajuste se necessário)
  const resp = await apiRequest(`/api/users?PageNumber=1&PageSize=1000`);
  const items = resp?.data?.items || resp?.Data?.Items || []; // tolerante ao casing
  const found = items.find(u =>
    (u.email || u.Email) === email && (u.password || u.Password) === password
  );
  if (!found) throw new Error("Usuário ou senha inválidos.");

  const id = found.id ?? found.Id;
  const role = found.role ?? found.Role ?? "USER";
  // token local (dummy) só para manter sessão no app
  return {
    token: `local-${id}`,
    user: { id, name: found.name ?? found.Email ?? email, email, role }
  };
}

export async function registerService({ name, email, password }) {
  // a entidade User possui: Id, Email, Password, Role
  const payload = { email, password, role: "USER" };
  const created = await apiRequest(`/api/users`, { method: "POST", body: payload });
  // algumas APIs retornam o objeto; geramos um token local após registro:
  const id = created?.id ?? created?.Id ?? Math.floor(Math.random() * 1e9);
  return {
    token: `local-${id}`,
    user: { id, name: name || email, email, role: "USER" }
  };
}

export async function logoutService() {
  // não há endpoint; apenas client-side
  return true;
}
