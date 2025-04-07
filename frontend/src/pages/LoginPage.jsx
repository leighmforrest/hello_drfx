import LoginForm from "../components/forms/LoginForm";
import { useUser } from "../contexts/UserProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const loginHandler = async (data) => {
    const { email, password } = data;
    const authenticated = await login(email, password);
    if (authenticated) {
      toast("The user has been logged in.");
      navigate("/");
    } else toast.error("The user could not be authenticated.");
  };
  return (
    <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-2">
      <LoginForm onLogin={loginHandler} />
    </section>
  );
};

export default LoginPage;
