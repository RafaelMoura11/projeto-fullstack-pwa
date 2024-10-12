// routers/userRouter.js
const express = require('express');
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Rota para criar um novo usuário
router.post('/users', createUser);

// Rota para buscar todos os usuários
router.get('/users', getAllUsers);

// Rota para atualizar um usuário por ID
router.put('/users/:id', updateUser);

// Rota para deletar um usuário por ID
router.delete('/users/:id', deleteUser);

module.exports = router;
