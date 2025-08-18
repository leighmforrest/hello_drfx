import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import TitleDisplay from '../TitleDisplay';
import TextArea from './TextArea';
import { pictureUpdateSchema } from '../../schemas';

const PictureUpdateCard = ({ title, isEditing, onSubmitHandler }) => {
    

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(pictureUpdateSchema),
    defaultValues: { title },
    mode: 'onChange',
  });

  useEffect(() => {
    reset({ title: title || '' });
  }, [title, reset]);

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col w-full min-h-[9.125rem]"
      >
        {isEditing ? (
          <>
            <TextArea name="title" control={control} rows={3} />
            <div className="flex items-center justify-end mt-1">
              <button type="submit" className="hover:underline">
                Save
              </button>
            </div>
          </>
        ) : (
          <TitleDisplay title={title}/>
        )}
      </form>
    </div>
  );
};

export default PictureUpdateCard;
