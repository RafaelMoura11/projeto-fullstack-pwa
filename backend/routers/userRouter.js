const express = require('express');
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/users', createUser);

router.get('/users', getAllUsers);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;
