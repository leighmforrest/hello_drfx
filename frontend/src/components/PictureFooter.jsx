import LikeBar from "./LikeBar"
import EditDeleteBar from "./EditDeleteBar"
import ProfileLink from "./ProfileLink"

const PictureFooter = ({ isEditing, toggleEditing, onDelete, onLike, onUnlike, isLiked, isUser, totalLikes, handle}) => {
  return (
    <div className="flex items-center justify-between">
        <ProfileLink handle={handle}/>
        <LikeBar onLike={onLike} onUnlike={onUnlike} isLiked={isLiked} totalLikes={totalLikes} />
        {isUser ? <EditDeleteBar isEditing={isEditing} toggleEditing={toggleEditing} onDelete={onDelete} data-testid="edit-delete-bar" /> : <span></span>}
    </div>
  )
}

export default PictureFooter