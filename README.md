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
