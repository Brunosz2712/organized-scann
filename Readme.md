# Organized Scann - Aplicativo Mobile

## Integrantes
- Nome Completo: Bruno Da Silva Souza RM: 94346
- Nome Completo: Julio Samuel de Oliveira RM: 557453
- Nome Completo: Leonardo Da Silva Pereira RM: 557598

## Descrição do Projeto
O Organized Scann é um aplicativo móvel para gerenciamento de motos e controle de acesso via RFID. O sistema permite cadastrar motos, visualizar registros, escanear tags RFID e gerenciar portais de acesso.

## Funcionalidades

### 1. Tela de Login
- Interface de autenticação com campos de usuário e senha
- Armazenamento do nome de usuário com AsyncStorage para persistência

### 2. Listagem de Motos
- Visualização de todas as motos cadastradas
- Exibição de placa, RFID e status de cada moto
- Dados persistentes com AsyncStorage

### 3. Cadastro de Motos
- Formulário completo para adicionar novas motos
- Campos para RFID, placa, marca, modelo, ano e cor
- Validação de campos obrigatórios

### 4. Scanner RFID
- Simulação de leitura de tags RFID
- Busca automática de informações da moto pelo código RFID
- Opção para atualizar status ou cadastrar nova moto

### 5. Listagem de Portais
- Visualização dos portais disponíveis
- Exibição do status de manutenção e operacional
- Dados armazenados com AsyncStorage

## Requisitos Atendidos
- ✅ Navegação entre telas (React Navigation)
- ✅ 5 rotas navegáveis: Login, ListagemMotos, CadastroMotos, ScannerRFID, ListagemPortais
- ✅ Protótipo visual funcional com layout coerente em dark mode
- ✅ Formulário com manipulação de estado (useState)
- ✅ Armazenamento local com AsyncStorage
- ✅ Código organizado e documentado

## Tecnologias Utilizadas
- React Native
- Expo
- React Navigation
- AsyncStorage
- React Hooks

## Como Executar o Projeto

### Pré-requisitos
- Node.js (https://nodejs.org/)
- npm ou yarn
- Expo CLI (caso não tenha, instale globalmente com o comando abaixo):
```bash
npm install -g expo-cli
