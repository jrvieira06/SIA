# Sistema Integrado de Gestão de Chaves (SIA)

Este é o repositório oficial do **SIA (Sistema Integrado Acadêmico)**, um projeto focado no gerenciamento de movimentação de chaves em tempo real, utilizando arquitetura de microserviços e comunicação via WebSocket.

## 👥 Sobre a Equipe e Responsabilidades
Este sistema é um esforço colaborativo. O desenvolvimento das bases do Back-end (API) e do Front-end (Interface) foi realizado pelos demais membros da equipe. 

**Minha contribuição principal neste projeto foi a Engenharia de Integração:**
* **Integração Full-Stack**: Estabelecimento da comunicação entre a API FastAPI e a interface React.
* **Mapeamento de Dados (DVO)**: Implementação da lógica de tradução entre os dados brutos do banco de dados e as necessidades de exibição da interface.
* **Comunicação em Tempo Real**: Implementação do protocolo WebSocket para que a interface reflita o estado do banco instantaneamente sem necessidade de recarregamento manual.
* **Segurança e Versionamento**: Configuração do ambiente Git, gestão de versionamento e segurança de variáveis de ambiente.

## 🚀 Como iniciar o projeto

O projeto está dividido em duas pastas principais na raiz: `SIA-Backend-main` e `SIA.Pi-main`.

### 1. Backend (API - FastAPI)
1. Navegue até a pasta: `cd SIA-Backend-main/SIA-Backend-main`
2. Crie e ative o ambiente virtual:
   - Windows: `python -m venv venv` e `.\venv\Scripts\activate`
3. Instale as dependências: `pip install -r requirements.txt`
4. Execute o servidor: `uvicorn main:app --reload`
5. A documentação interativa (Swagger) estará disponível em: `http://127.0.0.1:8000/docs`

### 2. Frontend (Interface - React)
1. Navegue até a pasta: `cd SIA.Pi-main/SIA.Pi-main`
2. Instale as dependências: `npm install`
3. Inicie o servidor: `npm run dev`
4. O sistema estará disponível em: `http://localhost:5173`

---

## 🗺️ Como navegar e testar

* **Login**: Utilize as credenciais cadastradas para autenticação.
* **Dashboard**: A tela principal exibe as movimentações ativas.
    * **Tempo Real**: A tabela se atualiza automaticamente sempre que uma chave é retirada ou devolvida via sistema.
* **Testes rápidos**: Utilize a rota `/docs` do backend para disparar requisições de retirada (`POST /movimentacoes/retirar`) e veja a interface do React reagir instantaneamente.

---

## 🛠️ Tecnologias Utilizadas

* **Backend**: Python, FastAPI, SQLite/PostgreSQL.
* **Frontend**: React, TypeScript, Tailwind CSS, Vite.
* **Comunicação**: RESTful API e WebSockets.
* **UI**: Shadcn/UI.

---

## 📝 Notas de Desenvolvimento
* **Segurança**: O sistema utiliza JWT para proteção de rotas.
* **Variáveis de Ambiente**: Certifique-se de configurar o seu `.env` localmente.
* **Versionamento**: Projeto organizado via Git com `.gitignore` configurado para segurança de dados sensíveis e dependências.

---
*Desenvolvido como Projeto Integrado de Sistemas de Informação.*
