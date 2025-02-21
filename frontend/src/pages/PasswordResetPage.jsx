import Form from "../components/Form";
import Input from "../components/Input";
import { useRef } from "react";
import { toast } from "react-toastify";
import httpService from "../services/httpService";


const defaultValues = {
  email: ""
}


const PasswordResetPage = () => {
    const formRef = useRef();
    
    const handleFormSubmit = async (data) => {
        try {
          await httpService.post("/auth/users/reset_password/", data);
          toast.success("Check your email for the reset link.");

          if (formRef.current) {
            formRef.current.reset()
          }
        } catch (error) {
          toast.error("The email could not be found.");
        }
      };

  return (
    <section>
      <h2>Password Reset</h2>
      <Form ref={formRef} onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Input name="email" label="Email Address"/>
        <button type="submit">Reset Password</button>
      </Form>
    </section>
  );
};

export default PasswordResetPage;
