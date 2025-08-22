import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
const LikeButtonBar = ({ isLiked, numLikes, onLike, onUnlike }) => {
  return (
    <div className='flex gap-1 w-8 items-center justify-between'>
      {isLiked ? (
        <button type="button" onClick={onUnlike}>
          <FcLike />
        </button>
      ) : (
        <button type="button" onClick={onLike}>
          <FcLikePlaceholder />
        </button>
      )}
      <span>{numLikes || 0}</span>
    </div>
  );
};

export default LikeButtonBar;
