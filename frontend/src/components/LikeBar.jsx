import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

const LikeBar = ({ picture, onLikeClick, onUnlikeClick}) => {
  return (
    (<div className="flex items-center justify-between gap-3">
              {picture.is_liked ? (
                <button type="button" onClick={onUnlikeClick}>
                  <FcLike className="text-xl hover:text-2xl w-6" />
                </button>
              ) : (
                <button type="button" onClick={onLikeClick}>
                  <FcLikePlaceholder className="text-xl hover:text-2xl w-6" />
                </button>
              )}
              <span>{picture.total_likes}</span>
            </div>)
  )
}

export default LikeBar