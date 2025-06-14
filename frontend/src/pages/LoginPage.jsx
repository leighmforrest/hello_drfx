import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import LoginForm from "../components/forms/LoginForm";
import { useUser } from "../contexts/UserProvider";
import MainContainer from "../components/MainContainer";

const LoginPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const submitHandler = async ({ email, password }) => {
    const authenticated = await login(email, password);

    if (authenticated) {
      toast.success(`${email} has been authenticated.`);
      navigate("/");
    } else {
      toast.error(`${email} could not be authenticated.`);
      return;
    }
  };

  return (
    <MainContainer>
      <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-4">
        <div className="w-full px-2 sm:max-w-3xl sm:px:0">
          <LoginForm onLogin={submitHandler} />
        </div>
      </section>
    </MainContainer>
  );
};

export default LoginPage;
