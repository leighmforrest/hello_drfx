import { useParams } from 'react-router';
import MainContainer from '../components/MainContainer';
import { usePictureQuery } from '../queries/usePictureQuery';
import Spinner from '../components/Spinner';

const DetailPage = () => {
  const { pk } = useParams();

  const { data: picture, isLoading, error } = usePictureQuery(pk);

  if (isLoading) return <Spinner />;

  if (error) return <p>Unable. Malfunction. Need Input.</p>;

  return (
    <MainContainer>
      {/* Use a grid container here */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 w-full p-4">
        {/* Picture card spans 2 columns on small screens and up */}
        <div className="col-span-1 sm:col-span-2 flex flex-col rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-blue-700 h-fit">
          <img
            src={picture.picture}
            alt={picture.title}
            className="w-full h-full object-cover aspect-square"
          />
          <p className="m-4">{picture.title}</p>
          <p className="m-4">{picture.user.email}</p>
        </div>

        {/* Comments card spans 3 columns on small screens and up */}
        <div className="col-span-1 sm:col-span-3 flex flex-col rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-blue-700 h-fit">
          <p className="m-4">COMMENTS CARD</p>
        </div>
      </div>
    </MainContainer>
  );
};

export default DetailPage;
