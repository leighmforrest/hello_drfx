import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { pictureUpdateSchema } from '../../schemas';
import TextArea from '../forms/TextArea';

const PictureUpdateForm = ({ title, onUpdate, toggleEditing }) => {


  const { handleSubmit, control, reset } = useForm({
    defaultValues: { title },
    resolver: yupResolver(pictureUpdateSchema),
  });
  
  const onResetHandler = () => {
    reset({ title });
    toggleEditing()
  };

  return (
    <div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onUpdate)}>
        <TextArea name="title" control={control} rows={4} />
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="hover:underline"
            onClick={onResetHandler}
          >
            Reset
          </button>
          <input type="submit" value="Save" className="hover:underline" />
        </div>
      </form>
    </div>
  );
};

export default PictureUpdateForm;
