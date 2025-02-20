import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/forms/LoginForm"

const LoginPage = () => {  
  const { login } = useAuth()
  const loginFormHandler = async (data) => {
        const { email, password } = data;
        await login(email, password)
    };

  return (
    <section>
      <h2>Login</h2>
      <LoginForm handleFormSubmit={loginFormHandler} />
    </section>
  );
};

export default LoginPage;
