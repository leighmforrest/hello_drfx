import { useRef } from "react";
import { useNavigate, useParams } from "react-router";
import httpService from "../services/httpService";
import Form from "../components/Form";
import Input from "../components/Input";
import { toast } from "react-toastify";

const defaultValues = {
  new_password: "",
};

const PasswordResetConfirmPage = () => {
  const { uid, token } = useParams();
  const formRef = useRef();
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    try {
      const submitData = { ...data, uid, token };
      await httpService.post("/auth/users/reset_password_confirm/", submitData);
      console.log(submitData);
      toast.success("You have successfully reset your password.");
      navigate("/login");
    } catch (error) {
      console.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <section>
      <h2>Confirm Password Reset</h2>
      <Form
        ref={formRef}
        onSubmit={handleFormSubmit}
        defaultValues={defaultValues}
      >
        <Input name="new_password" label="New Password" type="password" />
        <button type="submit">Confirm Reset</button>
      </Form>
    </section>
  );
};

export default PasswordResetConfirmPage;
