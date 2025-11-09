<h1 align="center">📱 Organized Scann — Mobile (React Native + Expo)</h1> <p align="center"> Gerenciamento de motos e controle de acesso via RFID — com autenticação (mock), CRUD local/offline e tema Dark/Light. </p> <p align="center"> <img alt="Expo" src="https://img.shields.io/badge/Expo-~SDK-blue?logo=expo&logoColor=white" /> <img alt="React Native" src="https://img.shields.io/badge/React%20Native-mobile-61DAFB?logo=react&logoColor=white" /> <img alt="AsyncStorage" src="https://img.shields.io/badge/Storage-AsyncStorage-2c3e50" /> </p>

👥 Integrantes

Bruno Da Silva Souza — RM: 94346

Julio Samuel de Oliveira — RM: 557453

Leonardo Da Silva Pereira — RM: 557598

🧭 Descrição do Projeto

Aplicativo para gerenciamento de motos e controle de acesso via RFID.
Permite login/cadastro (mock), cadastrar/listar/editar/excluir motos, simular leitura de RFID e organizar portais.
Persistência local com AsyncStorage e estrutura preparada para integração com API (Java/.NET).

✨ Funcionalidades

🔐 Autenticação (mock): Sign In/Logout local persistido; tela de Register disponível.

🏍️ Motos (CRUD): listar, cadastrar, editar e excluir com atualização imediata e cache em AsyncStorage.

📶 Fallback offline: se a API não responder, a listagem usa dados salvos no aparelho e exibe aviso.

🛣️ Portais: listagem pronta (dados locais), preparada para consumir API.

🎨 Tema Dark/Light: alternância com persistência e paleta consistente.

🌐 Internacionalização (i18n): estrutura PT/ES aplicada aos textos principais (boas-vindas e CTAs).

🧭 Navegação: telas Welcome, RegisteredMotorcycles, RegisterMotorcycle, SignIn, Register.

ℹ️ Sobre o App: apresenta o hash do commit que gerou a build publicada.

▶️ Como Rodar (Android)

Pré-requisitos: Node/npm, Android SDK/Emulador ou dispositivo com Expo Go.

npm install
npx expo start -c
# Pressione "a" para abrir no Android, ou escaneie o QR no Expo Go

🔌 Configuração da API (opcional)

O app opera em modo local se API_BASE_URL estiver vazio.

Local (mock/offline)
src/Config/env.js
export const API_BASE_URL = "";
export const API_TIMEOUT_MS = 10000;

Com API (Java/.NET)
export const API_BASE_URL = "http://SEU_SERVIDOR:8080";
export const API_TIMEOUT_MS = 10000;

CRUD de motos usa /api/motorcycles. Se a API falhar, o app cai no cache local com aviso.

🔔 Notificações Push (Android)

Fluxo mínimo viável com Expo Notifications: solicita permissão, registra token e recebe push (ex.: “Nova motocicleta cadastrada”).
Teste: instale no Android, aceite permissão e dispare uma notificação de teste.

🌍 Internacionalização

Idiomas: Português e Espanhol (arquivos de recursos em src/i18n/locales).
Detecção automática do idioma do sistema, com possibilidade de override manual.

🎨 Tema

Suporte a modo Claro/Escuro, com paleta consistente aplicada a cabeçalhos, cards e botões.

🚀 Publicação

Build Android publicada em Firebase App Distribution
Professor adicionado como tester
Tela Sobre mostra hash do commit da build publicada

🎥 Documentação e Apresentação
Este README descreve proposta, funcionalidades, estrutura e integrantes
