import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "./InputField";
import loginSchema from "../../schemas/loginSchema";

const LoginForm = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    onLogin(data);
  };

  return (
    <form
      className="w-full m-1.5 md:w-8/12 md:m-0 bg-white shadow-md  dark:bg-gray-700 dark:text-amber-50 rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h1 className="text-center text-4xl">Login</h1>
      {/* Email Field */}
      <InputField
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        register={register}
        errors={errors}
        required={true}
      />
      {/* Password Field */}
      <InputField
        label="Password"
        id="password"
        type="password"
        placeholder="******************"
        register={register}
        errors={errors}
        required={true}
      />

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
