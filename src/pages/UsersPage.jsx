import { useEffect, useState } from "react";
import { useUsersCrud } from "../hooks/useUsersCrud";
import UserCard from "../components/UserCard";
import UserForm from "../components/UserForm";
import Modal from "../components/Modal";

export default function UsersPage() {
  const {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    getUsers,
  } = useUsersCrud();
  const [editingUser, setEditingUser] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formKey = editingUser?.id ? `edit-${editingUser.id}` : "create";

  const handleCreate = async (data) => {
    await createUser(data);
    setModalMessage("✅ Usuario creado con éxito");
    setIsModalOpen(true);
  };

  const handleUpdate = async (data) => {
    await updateUser(editingUser.id, data);
    setEditingUser(null);
    setModalMessage("✏️ Usuario actualizado con éxito");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setModalMessage("🗑️ Usuario eliminado con éxito");
    setIsModalOpen(true);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Registro de usuarios</h1>

      {error && (
        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #ef4444",
            color: "#991b1b",
            padding: "12px",
            borderRadius: 8,
            marginBottom: "1rem",
          }}
        >
          <strong>Ocurrió un error al cargar los usuarios.</strong>
          <div style={{ marginTop: 8 }}>
            <button
              onClick={getUsers}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      <UserForm
        key={formKey}
        onSubmit={editingUser ? handleUpdate : handleCreate}
        defaultValues={editingUser || {}}
        isEditing={!!editingUser}
      />

      {loading ? (
        <p style={{ marginTop: 16 }}>Cargando usuarios...</p>
      ) : users.length === 0 ? (
        <p style={{ marginTop: 16, opacity: 0.7 }}>
          No hay usuarios para mostrar.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {users.map((u) => (
            <UserCard
              key={u.id}
              user={u}
              onEdit={setEditingUser}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 style={{ marginBottom: 12 }}>{modalMessage}</h2>
        <button
          onClick={() => setIsModalOpen(false)}
          style={{
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Ok
        </button>
      </Modal>
    </div>
  );
}
