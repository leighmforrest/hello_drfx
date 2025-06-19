import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordResetRequestSchema } from '../../schemas';
import Input from './Input';

const PasswordResetRequestForm = ({ onPasswordResetRequest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordResetRequestSchema),
  });

  const onSubmit = (data) => {
    onPasswordResetRequest(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-blue-950 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-3xl text-center mb-5">Password Reset</h2>

      <Input
        id="email"
        label="Email"
        placeholder="Email Address"
        register={register}
        errors={errors}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Reset Password
      </button>
    </form>
  );
};

export default PasswordResetRequestForm;
