import "./UserCard.css";

export default function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <img src={user.image_url || "https://via.placeholder.com/150"} alt={user.first_name} />
      <h3>{user.first_name} {user.last_name}</h3>
      <p>{user.email}</p>
      <p>🎂 {user.birthday}</p>
      <div className="actions">
        <button onClick={() => onEdit(user)}>✏️ Edit</button>
        <button onClick={() => onDelete(user.id)}>🗑️ Delete</button>
      </div>
    </div>
  );
}
