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

### Documentação e Apresentação
- Este **README** inclui proposta, funcionalidades, estrutura de pastas, execução e integrantes  
- **Vídeo**: adicionar link na seção abaixo

---

## Estrutura de Pastas
> Mantido seu padrão atual: **novas** pastas com **inicial maiúscula**.  
> A pasta de telas permanece `src/pages` (minúsculo), com `Storage` **dentro** de `pages`.

