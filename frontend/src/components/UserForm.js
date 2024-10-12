import React, { useState, useEffect } from 'react';
import api from '../api';
import functions from '../utils/formatFields';

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    birth_date: '',
    gender: 'MALE',
    phone: '',
    nationality: '',
  });

  const fetchUsers = async () => {
    const response = await api.get('/users');
    setUsers(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = new Date(formData.birth_date).toISOString();
    if (formData.id) {
      await api.put(`/users/${formData.id}`, { ...formData, birth_date: formattedDate });
    } else {
      await api.post('/users', { ...formData, birth_date: formattedDate });
    }

    fetchUsers();
    resetForm();
  };

  const handleEdit = (user) => {

    setFormData(user);
  };

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      birth_date: '',
      gender: 'MALE',
      phone: '',
      nationality: '',
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="MALE">Masculino</option>
          <option value="FEMALE">Feminino</option>
          <option value="OTHERS">Outro</option>
        </select>
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nationality"
          placeholder="Nacionalidade"
          value={formData.nationality}
          onChange={handleChange}
          required
        />
        <button type="submit">{formData.id ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {functions.formatDate(user.birth_date)} - {user.gender} 
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;
