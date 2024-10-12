// controllers/userController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para criar um novo usuário
const createUser = async (req, res) => {
  try {
    const { name, birth_date, gender, phone, nationality } = req.body;
    const user = await prisma.user.create({
      data: { name, birth_date, gender, phone, nationality },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

// Função para buscar todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

// Função para atualizar um usuário
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birth_date, gender, phone, nationality } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, birth_date, gender, phone, nationality },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

// Função para deletar um usuário
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

// Exporta as funções do CRUD
module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
