import PictureForm from '../components/forms/PictureForm';
import MainContainer from '../components/MainContainer';
import ProgressBar from '../components/ProgressBar';
import { useCreatePictureMutation } from '../mutations/createPictureMutation';
import { useState } from 'react';

const NewPicturePage = () => {
  const [progress, setProgress] = useState(0);
  const { mutate, isPending, isError } = useCreatePictureMutation(setProgress);

  const submitHandler = async ({ title, picture }) => {
    const file = picture[0];
    mutate({ title, picture: file });
  };

  if (isError) return <h1>Unable. Malfunction. Need input.</h1>;

  return (
    <MainContainer>
      <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-4">
        <div className="w-full px-2 sm:max-w-3xl sm:px:0">
          {isPending ? (
            <ProgressBar progress={progress}/>
          ) : (
            <PictureForm onUpload={submitHandler} />
          )}
        </div>
      </section>
    </MainContainer>
  );
};

export default NewPicturePage;
