import { useForm } from "react-hook-form";
import httpService from "../../../services/httpService";
import { toast } from "react-toastify";


const PasswordResetForm = () => {
  const { register, handleSubmit, formState: { errors}, reset} = useForm()

  const PasswordResetFormHandler = async (data) => {
    try {
        const { email } = data;
        const response = await httpService.post("/auth/users/reset_password/", {email})
        console.log(response)
        reset()
        toast("Please check your email for reset link.")
    } catch (error) {
        toast("Your email address could not be found.")
    }
        };

  return(
  <form onSubmit={handleSubmit(PasswordResetFormHandler)}>
    <input type="text" {...register("email")} />
    <button type="submit">Reset Password</button>
  </form>
)};

export default PasswordResetForm;
