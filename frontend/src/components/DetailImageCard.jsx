import { useState } from 'react';
import { FcLike } from 'react-icons/fc';

const DetailImageCard = ({ picture, onLikeClick, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);
  
  const commonTextStyles =
    'w-full border rounded p-2 text-base leading-relaxed';

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Saving title');
    toggleEdit();
  };

  return (
    <div className="col-span-1 sm:col-span-2 flex flex-col rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-blue-700">
      <img
        src={picture.picture}
        alt={picture.title}
        className="w-full object-cover aspect-square"
      />

      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col w-full min-h-[8rem]">
          {isEditing ? (
            <>
              <textarea
                defaultValue={picture.title}
                className={`${commonTextStyles} resize-none`}
                rows={3} // approx height for 3 lines
              />
              <div className="flex items-center justify-end mt-1">
                <button type="submit" className="hover:underline">
                  Save
                </button>
              </div>
            </>
          ) : (
            <p
              className={`${commonTextStyles} whitespace-pre-wrap border-transparent`}
            >
              {picture.title}
            </p>
          )}
        </form>
      </div>

      <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-300 pt-4">

        <p className="text-gray-400 dark:text-gray-300">
          {picture.user.handle}
        </p>

        <div className="flex items-center justify-between gap-3">
          <button type="button" onClick={onLikeClick}>
            <FcLike className="text-xl hover:text-2xl w-6" />
          </button>
          <span>{picture.total_likes}</span>
        </div>

        <div className="flex items-center gap-2 w-[5rem] justify-end">
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
              <button type="button" className="hover:underline" onClick={onDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailImageCard;
