import styles from "../styles/LoginPage.module.css";
import useForm from "../../hooks/useForm";
import { useAuthStore } from "../../hooks";

const LoginPage = () => {
  const { email, password, onInputChange, onResetForm } = useForm({
    email: "",
    password: "",
  });

  const { startLogin } = useAuthStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await startLogin(email, password);

    onResetForm();
  };

  return (
    <form action="" onSubmit={handleSubmit} className={styles.formState}>
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

export default LoginPage;
