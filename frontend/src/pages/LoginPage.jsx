import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const loginFormHandler = async (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    console.log(username.value, password.value)
    await login(username.value,password.value);
  };

  return (
    <section>
      <h2>Login Page</h2>
      <form onSubmit={loginFormHandler}>
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="password" name="password" placeholder="Enter Password" />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginPage;
