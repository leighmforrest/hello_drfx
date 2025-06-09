import LoginForm from "../components/forms/LoginForm";
import { useUser } from "../contexts/UserProvider";


const LoginPage = () => {
  const { login } = useUser();
  const submitHandler = ({email, password}) => {
    login(email, password)
  }

  return (
    <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center relative">
      <div className="w-full m-4">
        <LoginForm onFormSubmit={submitHandler} />
      </div>
    </section>
  );
};

export default LoginPage;
