import React from 'react'

const PictureTitle = ({title, isEditing, cancelEditing, onUpdate}) => {
  return (
    (<div>
        {isEditing ? <p>
            <textarea value={title}></textarea>
            <button onClick={cancelEditing}>Cancel</button>
            <button onClick={onUpdate}>Update</button>
        </p>: <p>{title}</p>}
    </div>)
  )
}

export default PictureTitle