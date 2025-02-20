import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const PasswordResetForm = ({ onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      await onFormSubmit(data);
      toast.success("Check your email for the reset link.");
      reset();
    } catch (error) {
      toast.error("The email could not be found.");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          placeholder="Enter your email"
          aria-label="Email"
          aria-describedby="email-error"
        />
        {errors.email && <p id="email-error">{errors.email.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Reset Password"}
      </button>
    </form>
  );
};

export default PasswordResetForm;
