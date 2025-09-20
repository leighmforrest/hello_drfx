import LikeBar from "./LikeBar"
import EditDeleteBar from "./EditDeleteBar"
import ProfileLink from "./ProfileLink"

const PictureFooter = ({ isEditing, toggleEditing, onDelete, onLike, onUnlike, isLiked, totalLikes, handle}) => {
  return (
    <div className="flex items-center justify-between">
        <ProfileLink handle={handle}/>
        <LikeBar onLike={onLike} onUnlike={onUnlike} isLiked={isLiked} totalLikes={totalLikes} />
        <EditDeleteBar isEditing={isEditing} toggleEditing={toggleEditing} onDelete={onDelete}/>
    </div>
  )
}

export default PictureFooter