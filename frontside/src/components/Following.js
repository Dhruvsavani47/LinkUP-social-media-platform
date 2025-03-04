import React from 'react'
import FollowingCard from './FollowingCard'

const Following = ({userData, profile, auth, id}) => {
  return (
    <div>
      {
        userData.length > 0 && userData.map((user, index) => (
          <FollowingCard user={user.following} key={index}/>
        ))
      }
    </div>
  )
}

export default Following




