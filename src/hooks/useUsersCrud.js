import { useState, useEffect, useCallback } from "react";
import api from "../api/usersApi";

function normalizeUsersPayload(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.users)) return data.users;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export const useUsersCrud = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await api.get("/users");
      const list = normalizeUsersPayload(resp.data);
      setUsers(list);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = async (user) => {
    setError(null);
    await api.post("/users", user);
    await getUsers();
  };

  const updateUser = async (id, user) => {
    setError(null);
    await api.put(`/users/${id}`, user);
    await getUsers();
  };

  const deleteUser = async (id) => {
    setError(null);
    await api.delete(`/users/${id}`);
    await getUsers();
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return {
    users,
    loading,
    error,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};
