import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router";

const LoginForm = () => {
  const { login, isAuthenticated } = useAuth();
  const { register, handleSubmit, formState: { errors}, reset} = useForm()

  const loginFormHandler = async (data) => {
      const { email, password } = data;
      await login(email, password)
  };

  useEffect(() => {
    if (isAuthenticated) reset();
  }, [isAuthenticated, reset]);


  return(
  <form onSubmit={handleSubmit(loginFormHandler)}>
    <input type="text" {...register("email")} />
    <input type="password" {...register("password")} />
    <button type="submit">Login</button>
    <Link to="/password/reset/">Forgot password?</Link>
  </form>
)};

export default LoginForm;
