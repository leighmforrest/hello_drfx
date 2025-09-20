import { FcLike, FcLikePlaceholder} from "react-icons/fc"
import React from 'react'

const LikeBar = ({isLiked, totalLikes, onUnlike, onLike}) => {
  return (
    <div data-testid="like-bar">
        {isLiked ? 
        <button type="button" onClick={onUnlike} data-testid="unlike-button">
            <FcLike />
        </button>
            : <button type="button" onClick={onLike} data-testid="like-button">
                <FcLikePlaceholder />
            </button>
    }
        <span data-testid="total-likes">{totalLikes}</span></div>
  )
}

export default LikeBar