import PictureForm from "../components/forms/PictureForm"

import { toast } from 'react-toastify';
import MainContainer from '../components/MainContainer';

const NewPicturePage = () => {

  const submitHandler = async ({ title, picture }) => {
    console.log(title, picture)
  };

  return (
    <MainContainer>
      <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-4">
        <div className="w-full px-2 sm:max-w-3xl sm:px:0">
          <PictureForm onUpload={submitHandler} />
        </div>
      </section>
    </MainContainer>
  );
};

export default NewPicturePage;