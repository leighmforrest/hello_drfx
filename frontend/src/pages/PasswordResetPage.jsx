import httpService from "../services/httpService";
import PasswordResetForm from "../components/forms/PasswordResetForm";

const PasswordResetPage = () => {
  const handlePasswordResetForm = async (data) => await httpService.post("/auth/users/reset_password/", data);

  return (
    <section>
      <h2>Password Reset</h2>
      <PasswordResetForm onFormSubmit={handlePasswordResetForm} />
    </section>
  );
};

export default PasswordResetPage;
