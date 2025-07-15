import PictureForm from '../components/forms/PictureForm';

import { toast } from 'react-toastify';
import MainContainer from '../components/MainContainer';
import { useCreatePictureMutation } from '../mutations/createPictureMutation';
import { useNavigate } from 'react-router';
import Spinner from '../components/Spinner';
import { useState } from 'react';

const NewPicturePage = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { mutate, isLoading, isError } = useCreatePictureMutation();
  const navigate = useNavigate();

  const submitHandler = async ({ title, picture }) => {
    const file = picture[0];
    setShowSpinner(true);
    if (file) {
      mutate(
        { title, picture: file },
        {
          onSuccess: () => {
            toast('The picture has been uploaded.');
            setTimeout(() => {
              navigate('/');
            }, 500);
          },
          onError: () => {
            toast.error('The image could not be uploaded.');
            setShowSpinner(false);
          },
        },
      );
    }
  };

  if (isError) return <h1>Unable. Malfunction. Need input.</h1>;

  return (
    <MainContainer>
      <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-4">
        <div className="w-full px-2 sm:max-w-3xl sm:px:0">
          {isLoading || showSpinner ? (
            <div className="flex justify-center items-center h-40">
              <Spinner />
            </div>
          ) : (
            <PictureForm onUpload={submitHandler} />
          )}
        </div>
      </section>
    </MainContainer>
  );
};

export default NewPicturePage;
