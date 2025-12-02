import React from 'react';
import CommentForm from './forms/CommentForm';
import CommentCard from './CommentCard';

const CommentsPanel = ({
  comments,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => (
  <div data-testid="comments-panel">
    <h2 className="text-4xl text-center pb-3">Comments</h2>
    <CommentForm />
    <div className="flex flex-col gap-1">
      {comments.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.results.map((comment) => (
            <CommentCard comment={comment} key={comment.pk} />
          ))}
        </React.Fragment>
      ))}
    </div>
    {hasNextPage && (
      <button onClick={fetchNextPage} disabled={isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
      </button>
    )}
  </div>
);

export default CommentsPanel;
