// index.js
const express = require('express');
const userRouter = require('./routers/userRouter'); // Importa o userRouter

const app = express();
app.use(express.json()); // Middleware para ler JSON

// Usa as rotas do userRouter
app.use('/', userRouter); // Prefixa todas as rotas com /api

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
