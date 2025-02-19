import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/forms/LoginForm"

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
      <LoginForm onLoginSubmit={loginFormHandler}/>
    </section>
  );
};

export default LoginPage;
