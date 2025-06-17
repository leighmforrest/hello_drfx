import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas';
import Input from './Input';

const LoginForm = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => onLogin(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-blue-950 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-3xl text-center mb-5">Login</h2>
      <Input
        id="email"
        label="Email"
        placeholder="Email Address"
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="*************"
        register={register}
        errors={errors}
      />
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
        <Link
          to="/password/reset"
          className="text-blue-500 hover:text-blue-700 dark:text-amber-50 dark:hover:text-amber-300"
        >
          Forgot your password?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
