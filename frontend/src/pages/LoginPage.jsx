import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import LoginForm from "../components/forms/LoginForm";
import { useUser } from "../contexts/UserProvider";


const LoginPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const submitHandler = async  ({email, password}) => {
    const authenticated = await login(email, password)
    
    if (authenticated) {
      toast.success(`${email} has been authenticated.`)
      navigate("/")
    } else {
      toast.error(`${email} could not be authenticated.`)
      return
    }
  }

  return (
    <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center relative">
      <div className="w-full m-4">
        <LoginForm onLogin={submitHandler} />
      </div>
    </section>
  );
};

export default LoginPage;
