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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Cadastro de Usuário</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                placeholder="Nome"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                name="birth_date"
                className="form-control"
                value={formData.birth_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <select
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="MALE">Masculino</option>
                <option value="FEMALE">Feminino</option>
                <option value="OTHERS">Outro</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="phone"
                placeholder="Telefone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="nationality"
                placeholder="Nacionalidade"
                className="form-control"
                value={formData.nationality}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {formData.id ? 'Atualizar' : 'Cadastrar'}
            </button>
          </form>

          <h2 className="text-center my-4">Lista de Usuários</h2>
          <ul className="list-group">
            {users.map((user) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={user.id}>
                {user.name} - {functions.formatDate(user.birth_date)} - {user.gender}
                <div>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Deletar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
