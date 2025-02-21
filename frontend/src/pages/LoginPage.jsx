import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Form from "../components/Form";
import Input from "../components/Input";


const defaultValues = {
  email: "",
  password: ""
}


const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const formRef = useRef();

  useEffect(() => {
    if (isAuthenticated && formRef.current) {
      formRef.current.reset()
    }
  }, [isAuthenticated]);

  const handleFormSubmit = async (data) => {
    const { email, password } = data;
    await login(email, password);
  };

  return (
    <section>
      <h2>Login</h2>
      <Form ref={formRef} onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Input name="email" label="Email Address"/>
        <Input name="password" label="Password" type="password"/>
        <button type="submit">Login</button>
        <Link to="/password/reset/">Forgot password?</Link>
      </Form>
    </section>
  );
};

export default LoginPage;
