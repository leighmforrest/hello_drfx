import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <div className="flex flex-col bg-blue-100 dark:bg-blue-700 rounded-md p-2">
      <p className="min-h-16">{comment.comment}</p>
      <div className="flex justify-between">
        <p>{comment.user.handle}</p>
        <p>{new Date(comment.created).toLocaleString()}</p>
      </div>
      {comment.is_user && <div className='flex justify-end'>
        <button type="button">Edit</button>
        <button type="button">Delete</button>
        </div>}
    </div>
  );
};

export default CommentCard;
