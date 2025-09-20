import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./UserForm.css";

export default function UserForm({ onSubmit, defaultValues = {}, isEditing }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const submit = (data) => {
    onSubmit(data);
    if (!isEditing) {
      reset({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birthday: "",
        image_url: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="user-form">
      <div className="grid-2">
        <input
          {...register("first_name", { required: true })}
          placeholder="First Name"
        />
        <input
          {...register("last_name", { required: true })}
          placeholder="Last Name"
        />
      </div>

      <div className="grid-2">
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
        />
      </div>

      <div className="grid-2">
        <input {...register("birthday", { required: true })} type="date" />
        <input {...register("image_url")} placeholder="Image URL (opcional)" />
      </div>

      <button
        type="submit"
        className={`btn ${isEditing ? "btn-edit" : "btn-create"}`}
      >
        {isEditing ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
