import { useForm } from "react-hook-form";
import "./UserForm.css";

export default function UserForm({ onSubmit, defaultValues = {}, isEditing }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  const submit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="user-form">
      <input {...register("first_name")} placeholder="First Name" required />
      <input {...register("last_name")} placeholder="Last Name" required />
      <input {...register("email")} type="email" placeholder="Email" required />
      <input {...register("password")} type="password" placeholder="Password" required />
      <input {...register("birthday")} type="date" required />
      <input {...register("image_url")} placeholder="Image URL" />

      <button type="submit">{isEditing ? "Update" : "Create"}</button>
    </form>
  );
}
