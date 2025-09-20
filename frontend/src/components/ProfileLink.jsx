import React from 'react'

const ProfileLink = ({ handle }) => {
  return (
    <div data-testid="profile-link">
      <a href="#">{handle}</a>
    </div>
  )
}

export default ProfileLink