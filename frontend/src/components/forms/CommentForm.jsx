import React from 'react';

const CommentForm = () => {
  return (
    <form className="flex flex-col w-full">
      <textarea className='bg-amber-50'></textarea>
      <div className="flex justify-end">
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
};

export default CommentForm;
