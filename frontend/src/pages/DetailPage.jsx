import { useParams } from 'react-router';
import { usePictureQuery } from '../queries/usePictureQuery';
import Spinner from '../components/Spinner';
import ErrorPage from '../pages/ErrorPage';
import MainContainer from '../components/MainContainer';
import CommentsCard from '../components/CommentsCard';
import PictureDetailCard from '../components/PictureDetailCard';
import NotFoundPage from './NotFoundPage';

const DetailPage = () => {
  const { pk } = useParams();
  const { data: picture, isLoading, error } = usePictureQuery(pk);

  /**
   * Event Handlers
   */

  const onDeleteHandler = () => {
    alert("DELETE")
  };

  if (isLoading) return <Spinner />;

  if (error) {
    if (error?.response.status === 404) {
      return <NotFoundPage />
    }
    
    return <ErrorPage />
  }

  return (
    <MainContainer>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 w-full p-4 items-stretch border-red-600">
        <PictureDetailCard picture={picture} onDelete={onDeleteHandler}/>
        <CommentsCard />
      </div>
    </MainContainer>
  );
};

export default DetailPage;
