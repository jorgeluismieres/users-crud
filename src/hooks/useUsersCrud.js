import { useState, useEffect } from "react";
import api from "../api/usersApi";

export const useUsersCrud = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (user) => {
    await api.post("/users", user);
    getUsers();
  };

  const updateUser = async (id, user) => {
    await api.put(`/users/${id}`, user);
    getUsers();
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users, loading, createUser, updateUser, deleteUser };
};
