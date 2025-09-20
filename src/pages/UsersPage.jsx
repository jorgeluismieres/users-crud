import { useState } from "react";
import { useUsersCrud } from "../hooks/useUsersCrud";
import UserCard from "../components/UserCard";
import UserForm from "../components/UserForm";
import Modal from "../components/Modal";

export default function UsersPage() {
  const { users, loading, createUser, updateUser, deleteUser } = useUsersCrud();
  const [editingUser, setEditingUser] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div>
      <h1>Users CRUD</h1>

      <UserForm
        onSubmit={editingUser ? handleUpdate : handleCreate}
        defaultValues={editingUser || {}}
        isEditing={!!editingUser}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem"
        }}>
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
        <h2>{modalMessage}</h2>
        <button onClick={() => setIsModalOpen(false)}>Ok</button>
      </Modal>
    </div>
  );
}
