import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { pictureSchema } from '../../schemas';
import Input from './Input';
import FileInput from "./FileInput";

const PictureForm = ({ onUpload }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(pictureSchema),
  });

  const onSubmit = (data) => onUpload(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-blue-950 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-3xl text-center mb-5">New Picture</h2>
      <Input
        id="title"
        label="Title"
        placeholder="Enter Title Here"
        register={register}
        errors={errors}
      />
      <FileInput 
        label="Picture"
        id="picture"
        register={register}
        errors={errors}
      />
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default PictureForm;
