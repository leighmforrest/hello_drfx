import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/forms/LoginForm"

const LoginPage = () => {  
  return (
    <section>
      <h2>Login</h2>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
