import React from 'react';
import PictureEditForm from './forms/PictureEditForm';

const PictureTitle = ({ title, isEditing, onUpdate, toggleEditing }) => {
  return (
    <div>
      {isEditing ? (
        <PictureEditForm onUpdate={onUpdate} title={title} toggleEditing={toggleEditing} />
      ) : (
        <p>{title}</p>
      )}
    </div>
  );
};

export default PictureTitle;
