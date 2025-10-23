import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextArea from './TextArea';
import { pictureEditSchema } from '../../schemas';

const PictureEditForm = ({ title, toggleEditing, onUpdate }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: { title },
    resolver: yupResolver(pictureEditSchema),
  });

  const onResetHandler = () => {
    reset({ title });
    toggleEditing()
  }
  
  return (
    <form data-testid="picture-edit-form" onSubmit={handleSubmit(onUpdate)}>
      <TextArea name="title" control={control} fieldClassName="bg-red-600"/>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onResetHandler}>Reset</button>
       <input type="submit" value="Update" />
      </div>
    </form>
  );
};

export default PictureEditForm;
