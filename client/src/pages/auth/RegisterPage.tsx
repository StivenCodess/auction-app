import { authPageCSS } from "../../styles/index";

import useForm from "../../hooks/useForm";
import { useAuthStore } from "../../hooks";

const initialformState = {
  name: "",
  address: "",
  phone: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const {
    formState,
    name,
    address,
    phone,
    email,
    password,
    onInputChange,
    onResetForm,
  } = useForm(initialformState);

  const { startRegister } = useAuthStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await startRegister(formState);

    onResetForm();
  };

  return (
    <>
      <h1>Register</h1>
      <form action="" onSubmit={handleSubmit} className={authPageCSS.formState}>
        <label htmlFor="">
          Nombre
          <input
            type="text"
            name="name"
            value={name}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor="">
          Direccion
          <input
            type="text"
            name="address"
            value={address}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor="">
          Telefono
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor="">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor="">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
          />
        </label>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterPage;
