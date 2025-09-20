import { useState } from 'react';
import { useParams } from 'react-router-dom'; // ✅ react-router-dom
import { usePictureQuery } from '../queries/usePictureQuery';
import { useLikePicture } from '../mutations/likePictureMutation';
import Spinner from '../components/Spinner';
import ImageCap from '../components/ImageCap';
import PictureTitle from '../components/PictureTitle';
import PictureFooter from '../components/PictureFooter';
import MainContainer from '../components/MainContainer';
import NotFoundPage from './NotFoundPage';
import ErrorPage from './ErrorPage';

const DetailPage = () => {
  const { pk } = useParams();

  const { data: picture, isLoading, error } = usePictureQuery(pk);
  const { likeMutation, unlikeMutation } = useLikePicture(pk);

  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing(prev => !prev);
  const cancelEditing = () => setIsEditing(false);

  const onUpdateHandler = () => { alert('UPDATE'); setIsEditing(false); };
  const onDeleteHandler = () => { alert('DELETE'); };
  const onLikeHandler = () => likeMutation.mutate();
  const onUnlikeHandler = () => unlikeMutation.mutate();

  if (isLoading) return <Spinner />;
  
  if (error) {
    if (error?.response?.status === 404) return <NotFoundPage />;
    return <ErrorPage />;
  }

  return (
    <MainContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
        <div>
          <ImageCap imgUrl={picture.picture} alt={picture.title} />
          <PictureTitle
            title={picture.title}
            isEditing={isEditing}
            cancelEditing={cancelEditing}
            onUpdate={onUpdateHandler}
          />
          <PictureFooter
            handle={picture.user.handle}
            isEditing={isEditing}
            isLiked={picture.is_liked}
            totalLikes={picture.total_likes}
            toggleEditing={toggleEditing}
            onDelete={onDeleteHandler}
            onLike={onLikeHandler}
            onUnlike={onUnlikeHandler}
          />
        </div>
        <div>Comments</div>
      </div>
    </MainContainer>
  );
};

export default DetailPage;
