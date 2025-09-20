import React from 'react';

const EditDeleteBar = ({ isEditing, toggleEditing, onDelete }) => {
  return (
    <div data-testid="edit-delete-bar">
      {!isEditing && (
        <>
          <button onClick={toggleEditing}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default EditDeleteBar;
