const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware para receber dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do express-session
app.use(session({
  secret: 'secreta', // Uma chave secreta para criptografar a sessão
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Definir como true se estiver usando https
}));

// Middleware para servir arquivos estáticos (HTML, CSS, etc)
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha123',
  database: 'banco_usuarios'
});

// Rota GET para a página inicial (index) após login
app.get('/', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login.html'); // Se o usuário não estiver logado, redireciona para a página de login
  }

  const userId = req.session.userId;

  // Consultar as informações do usuário e seus times
  connection.query('SELECT * FROM usuarios WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar informações do usuário');
    }

    if (results.length > 0) {
      const user = results[0];
      connection.query('SELECT * FROM times WHERE usuario_id = ?', [userId], (err, times) => {
        if (err) {
          return res.status(500).send('Erro ao buscar os times');
        }

        // Renderizar a página principal (index.html) com as informações do usuário e times
        res.sendFile(path.join(__dirname, 'public', 'index.html'), {
          user: user,
          times: times
        });
      });
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  });
});

// Rota POST para login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';

  connection.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).send('Erro interno no servidor.');
    } else {
      if (results.length > 0) {
        const user = results[0];
        req.session.userId = user.id; // Armazena o ID do usuário na sessão

        // Redireciona para a página principal (index)
        res.redirect('/');
      } else {
        // Usuário não encontrado -> redirecionar para cadastro
        res.redirect('/cadastro.html');
      }
    }
  });
});

// Rota de cadastro (para fins de exemplo)
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  connection.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao inserir:', err);
      res.status(500).send('Erro ao cadastrar usuário.');
    } else {
      res.redirect('/login.html'); // Redireciona para login após cadastro
    }
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
