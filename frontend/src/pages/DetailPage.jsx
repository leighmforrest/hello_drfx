import { useParams } from 'react-router';
import MainContainer from '../components/MainContainer';
import { useLikePicture } from '../mutations/likePictureMutation';
import { usePictureQuery } from '../queries/usePictureQuery';

import CommentsCard from '../components/CommentsCard';
import DetailImageCard from '../components/DetailImageCard';
import Spinner from '../components/Spinner';

const DetailPage = () => {
  const { pk } = useParams();

  const { data: picture, isLoading, error } = usePictureQuery(pk);
  const {likeMutation, unlikeMutation } = useLikePicture(pk)

  const likeButtonHandler = () => likeMutation.mutate( );
  const unlikeButtonHandler = () => unlikeMutation.mutate();
  const deleteButtonHandler = () => alert('DELETE!!!!');

  if (isLoading) return <Spinner />;

  if (error) return <p>Unable. Malfunction. Need Input.</p>;

  return (
    <MainContainer>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 w-full p-4 items-stretch">
        {/* Picture card */}
        <DetailImageCard
          picture={picture}
          onUnlikeClick={unlikeButtonHandler}
          onLikeClick={likeButtonHandler}
          onDelete={deleteButtonHandler}
        />
        {/* Comments card */}
        <CommentsCard />
      </div>
    </MainContainer>
  );
};

export default DetailPage;
