import styles from "../styles/LoginPage.module.css";
import useForm from "../../hooks/useForm";

const initialformState = {
  name: "",
  address: "",
  phone: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const { name, address, phone, email, password, onInputChange, onResetForm } =
    useForm(initialformState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onResetForm();
  };

  return (
    <form action="" onSubmit={handleSubmit} className={styles.formState}>
      <label htmlFor="">
        Nombre
        <input type="text" name="name" value={name} onChange={onInputChange} />
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
        <input type="tel" name="phone" value={phone} onChange={onInputChange} />
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

      <button type="submit">Login</button>
    </form>
  );
};

export default RegisterPage;
