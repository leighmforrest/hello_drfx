import { useState } from 'react';
import { FcLikePlaceholder } from 'react-icons/fc';
import { useUpdatePicture } from '../mutations/updatePictureMutation';
import PictureUpdateForm from './forms/PictureUpdateForm';
import { toast } from 'react-toastify';
import TitleDisplay from './TitleDisplay';
import LikeBar from './LikeBar';

const DetailImageCard = ({ picture, onLikeClick, onUnlikeClick, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const updateMutation = useUpdatePicture(picture.pk);

  const toggleEdit = () => setIsEditing((prev) => !prev);
  const handleSubmit = (data) => {
    updateMutation.mutate(data.title);
    setIsEditing(false);
    toast.success(`The picture has been updated.`);
  };

  return (
    <div className="col-span-1 sm:col-span-2 flex flex-col rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-blue-700">
      <img
        src={picture.picture}
        alt={picture.title}
        className="w-full object-cover aspect-square"
      />
      {picture.is_user ? (
        <PictureUpdateForm
          isEditing={isEditing}
          onSubmitHandler={handleSubmit}
          title={picture.title}
        />
      ) : (
        <TitleDisplay
          title={picture.title}
          className="flex flex-col w-full min-h-[9.125rem] p-4"
        />
      )}

      <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-300 pt-4">
        <p className="text-gray-400 dark:text-gray-300">
          {picture.user.handle}
        </p>

          <LikeBar
            picture={picture}
            onLikeClick={onLikeClick}
            onUnlikeClick={onUnlikeClick}
          />

        <div className="flex items-center gap-2 w-[5rem] justify-end">
          {picture.is_user && (
            <>
              {isEditing ? (
                <button type="button" onClick={toggleEdit}>
                  Reset
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={toggleEdit}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={onDelete}
                  >
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailImageCard;
