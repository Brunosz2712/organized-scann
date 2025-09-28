# Organized Scann — Aplicativo Mobile (React Native + Expo)

## Integrantes
- **Bruno Da Silva Souza** — RM: **94346**
- **Julio Samuel de Oliveira** — RM: **557453**
- **Leonardo Da Silva Pereira** — RM: **557598**

---

## Descrição do Projeto
Aplicativo para **gerenciamento de motos** e **controle de acesso** via RFID.  
Permite **login/cadastro**, **cadastrar/listar motos**, **simular leitura de RFID** e **gerenciar portais**. Persistência local com `AsyncStorage` e integração preparada para **API (Java/.NET)**.

---

## Funcionalidades
- **Tela de Login** (e Cadastro) com validação, erros e loading
- **Listagem de Motos** (com fallback local via `AsyncStorage`)
- **Cadastro de Motos** (formulário validado)
- **Scanner RFID** (simulado) com busca por RFID
- **Listagem de Portais** (dados locais)
- **Tema** Dark/Light (dark como padrão, sem alterar sua identidade visual)

---

## Boas práticas
- **Safe Area / KeyboardAvoiding** em telas com formulário  
- **Arquitetura** com `Services` / `Context` / `Theme` / `Components` / `Config` (pastas com **inicial maiúscula**)  
- **Código limpo e organizado**

---

## Requisitos da 3ª Sprint — Como atendemos

### 1) Telas funcionais integradas com API (30 pts)
- **Duas funcionalidades completas**:
  - **Autenticação**: login/cadastro/logout
  - **Motocicletas**: Create/Read/Delete (+ hooks para Update)
- **Validações e feedback** em formulários (erros + `ActivityIndicator`)
- **Loading** em chamadas de rede (login/cadastro/listagem/exclusão)

### 2) Sistema de Login (20 pts)
- Telas de **Login** e **Cadastro** com validação  
- **Logout** funcional  
- **Persistência de sessão** com `AsyncStorage`  
- Integração preparada com **API** (endpoints configuráveis)

### 3) Estilização com Tema
- Suporte a **Dark/Light** (sem mudar identidade visual existente)  
- Manutenção das **cores e tipografia atuais**

### 4) Arquitetura de Código (15 pts)
- **Separação de responsabilidades**:
  - `pages` (telas), `Services` (API), `Context` (auth), `Theme` (tema), `Components` (UI reutilizável), `Config` (env)
- **Padrão de pastas com inicial maiúscula** (para os novos módulos)
- **Código padronizado e legível**

### 5) Documentação e Apresentação (10 pts)
- Este **README** inclui proposta, funcionalidades, estrutura de pastas, execução e integrantes  
- **Vídeo**: adicionar link na seção abaixo

---

## Estrutura de Pastas
> Mantido seu padrão atual: **novas** pastas com **inicial maiúscula**.  
> A pasta de telas permanece `src/pages` (minúsculo), com `Storage` **dentro** de `pages`.

