import { useState } from 'react';
import { Link } from 'react-router';
import { useLikePicture } from "../mutations/likePictureMutation"
import { useUpdatePicture } from '../mutations/updatePictureMutation';
import PictureUpdateForm from './forms/PictureUpdateForm';
import TitleDisplay from './TitleDisplay';
import { toast } from 'react-toastify';
import LikeButtonBar from './LikeButtonBar';

const PictureDetailCard = ({ picture, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { likeMutation, unlikeMutation } = useLikePicture(picture.pk)
  const updateMutation = useUpdatePicture(picture.pk);

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const handleOnLike = () => likeMutation.mutate();

  const handleOnUnlike = () => unlikeMutation.mutate();

  const onUpdateHandler = (data) => {
    updateMutation.mutate(data.title, {
      onSuccess: () => {
        toast.success('The picture has been successfully edited.');
        setIsEditing(false);
      },
      onError: () => toast.error('Failed to update picture.'),
    });
  };

  return (
    <div className="col-span-1 sm:col-span-2 flex flex-col rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-blue-700">
      <img
        src={picture.picture}
        alt={picture.title}
        className="w-full object-cover aspect-square"
      />
      <div className="p-4 h-40 w-full">
        {picture.is_user && isEditing ? (
          <PictureUpdateForm
            title={picture.title}
            onUpdate={onUpdateHandler}
            toggleEditing={toggleEditing}
          />
        ) : (
          <TitleDisplay
            title={picture.title}
            className="w-full h-full flex items-start border rounded p-2 text-base leading-relaxed border-transparent"
          />
        )}
      </div>

      <div className="flex justify-between items-center m-4 h-10">
        <Link to="#" className='text-gray-400'>{picture.user.handle}</Link>
        <LikeButtonBar isLiked={picture.is_liked} numLikes={picture.total_likes} onLike={handleOnLike} onUnlike={handleOnUnlike} />
        <div className='min-w-23'>
        {picture.is_user && !isEditing && (
          <div className='flex gap-4'>
            <button type="button" onClick={toggleEditing} className='hover:underline'>
              Edit
            </button>
            <button type="button" onClick={onDelete} className='hover:underline'>
              Delete
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default PictureDetailCard;
