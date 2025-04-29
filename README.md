# Pokedex-Project
A **Pokédex Project** é uma aplicação web desenvolvida para permitir que usuários explorem o mundo dos Pokémon.  
Com ela, é possível buscar Pokémon pelo nome, visualizar informações detalhadas e gerenciar perfis de usuário com segurança.

## ✨ Funcionalidades

- 👤 Cadastro e login de usuários
- 🔍 Busca de Pokémon por nome
- 📋 Listagem de vários Pokémon
- 📄 Visualização detalhada de informações (tipo, peso, altura, habilidades, etc.)
- 🎨 Interface responsiva e amigável

### 🧩 Como a Aplicação Funciona

1. **Cadastro e Login**
   - O usuário cria uma conta inserindo seu nome, e-mail e senha.
   - As informações são enviadas ao **backend** e armazenadas em um **banco de dados MySQL**, com a senha devidamente criptografada.

2. **Busca de Pokémon**
   - Após o login, o usuário pode buscar Pokémon utilizando um campo de pesquisa.
   - As informações dos Pokémon são obtidas em tempo real através de requisições para a **PokéAPI**.

3. **Exibição de Dados**
   - Os dados dos Pokémon são exibidos em cards organizados e estilizados, com uma navegação fácil e intuitiva.
   - Cada Pokémon tem uma página de detalhes que mostra informações como altura, peso, tipo e habilidades especiais.

4. **Persistência de Sessão**
   - Usuários permanecem conectados enquanto navegam na aplicação (dependendo da implementação de autenticação no frontend/backend).

## 🛠️ Tecnologias Utilizadas

| Ferramenta | Função | Link |
|:-----------|:-------|:-----|
| [React](https://reactjs.org/) | Construção da interface de usuário (frontend) |
| [PokéAPI](https://pokeapi.co/) | Fonte dos dados dos Pokémon |
| [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) | Estilização da aplicação |
| [MySQL](https://www.mysql.com/) | Banco de dados para usuários |
| [MySQL Workbench](https://www.mysql.com/products/workbench/) | Gerenciamento visual do banco de dados |
| [Node.js](https://nodejs.org/) | API para autenticação e comunicação com o banco |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | Criptografia de senhas dos usuários |


## 🛠️ Instalação e Uso

1. Clone o repositório:

```bash
git clone https://github.com/JulianaJacinto/Pokedex-Project.git
```

2. Acesse o diretório do projeto:

```bash
cd Pokedex-Project
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o projeto:

```bash
npm start
```

O aplicativo será executado localmente em `http://localhost:3000`.

## 📦 Dependências

Antes de iniciar o projeto, é necessário instalar as dependências necessárias para o funcionamento do frontend e do backend.

### 📁 Backend (Node.js)

No diretório do backend, instale as dependências com:

```bash
npm install
```

Principais pacotes utilizados:

| Comando | O que faz |
|:--------|:----------|
| `const express = require('express');` | Importa o **Express**, que é o framework que facilita criar o servidor e as rotas da sua aplicação web. Sem ele, o Node.js seria muito "cru" para criar APIs. |
| `const mysql = require('mysql2');` | Importa o **MySQL2**, que é a biblioteca que permite conectar o Node.js ao banco de dados **MySQL** para executar queries (consultas, inserts, etc). |
| `const bodyParser = require('body-parser');` | Importa o **Body Parser**, que é um middleware usado para interpretar dados do corpo das requisições HTTP (como formulários `POST` ou `PUT`). Sem ele, o `req.body` viria vazio. |
| `const path = require('path');` | Importa o módulo nativo **Path** do Node.js, que ajuda a trabalhar com caminhos de arquivos e pastas de maneira segura e compatível com todos os sistemas operacionais (Windows, Linux, Mac). |
| `const session = require('express-session');` | Importa o **express-session**, que permite gerenciar **sessões** de usuários (por exemplo, guardar informações de login enquanto o usuário está navegando). Ele cria um cookie no navegador e uma sessão no servidor. |

### 📌 Em resumo:

- `express` → Cria o servidor e as rotas
- `mysql2` → Conecta ao banco de dados
- `body-parser` → Lê os dados enviados nas requisições
- `path` → Organiza caminhos de arquivos
- `express-session` → Gerencia sessões de usuários (login, cookies)

## 📦 Estrutura do Projeto

```
Pokedex-Project/
├── public/
│   └── css/
│         └── auth.css
│         └── pokemon-detail.css
│         └── style.css
│   └── img/
│         └── pokeball.svg
│   └── js/
│         └── pokemon.js
│         └── pokemon-detail.js
│         └── search.js
│   └── cadastro.html
│   └── detail.html
│   └── index.html
│   └── login.html
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## 🗺️ Fluxo Geral da Aplicação

```plaintext
Usuário → Frontend (React) → Backend/API → Banco de Dados (MySQL)
                                      ↘︎ PokéAPI (para dados dos Pokémon)
```

- O frontend é responsável pela interação com o usuário e exibição dos dados.
- O backend (caso exista) gerencia autenticação e acesso ao banco de dados.
- A PokéAPI fornece os dados de cada Pokémon.

## 🧠 O que Aprendi/Utilizei

- Consumo de APIs públicas
- Comunicação entre frontend e backend
- Manipulação de banco de dados relacional
- Práticas de segurança para senhas
- Construção de interfaces responsivas e dinâmicas
