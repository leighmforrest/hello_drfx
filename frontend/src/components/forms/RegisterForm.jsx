import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../schemas';
import Input from './Input';

const RegisterForm = ({ onRegister }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log(data)
    onRegister(data, setError);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-blue-950 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-3xl text-center mb-5">Register</h2>
      {errors.root && (
        <p className="text-red-500 text-sm mb-4">{errors.root.message}</p>
      )}

      <Input
        id="email"
        label="Email"
        placeholder="Email Address"
        register={register}
        errors={errors}
      />
      <Input
        id="handle"
        label="Handle"
        placeholder="Enter name you want to be known by"
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
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
