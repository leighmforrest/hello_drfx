import ImageCap from '../components/ImageCap';
import PictureTitle from '../components/PictureTitle';
import PictureFooter from '../components/PictureFooter';

const DetailPanel = ({
  picture,
  isEditing,
  toggleEditing,
  onUpdateHandler,
  onLikeHandler,
  onUnlikeHandler,
  onDeleteHandler,
}) => {
  return (
    <div>
      <ImageCap imgUrl={picture.picture} alt={picture.title} />
      <PictureTitle
        title={picture.title}
        isEditing={isEditing}
        toggleEditing={toggleEditing}
        onUpdate={onUpdateHandler}
      />
      <PictureFooter
        handle={picture.user.handle}
        isEditing={isEditing}
        isLiked={picture.is_liked}
        isUser={picture.is_user}
        totalLikes={picture.total_likes}
        toggleEditing={toggleEditing}
        onDelete={onDeleteHandler}
        onLike={onLikeHandler}
        onUnlike={onUnlikeHandler}
      />
    </div>
  );
};

export default DetailPanel;
