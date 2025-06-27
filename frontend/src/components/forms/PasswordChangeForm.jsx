import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordChangeSchema } from '../../schemas';
import Input from './Input';

const PasswordChangeForm = ({ onPasswordChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordChangeSchema),
  });

  const onSubmit = (data) => {
    onPasswordChange(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-blue-950 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-3xl text-center mb-5">Change Password</h2>
      <Input
        id="current_password"
        label="Current Password"
        type="password"
        placeholder="Enter current password"
        register={register}
        errors={errors}
      />
      <Input
        id="new_password"
        label="New Password"
        type="password"
        placeholder="Enter new password"
        register={register}
        errors={errors}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Change Password
      </button>
    </form>
  );
};

export default PasswordChangeForm;
