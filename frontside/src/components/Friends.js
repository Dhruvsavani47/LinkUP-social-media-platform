import React from 'react'
import FriendsCard from './FriendsCard';

const Friends = ({userData, profile, auth, id}) => {
  return (
    <div>
      {
        userData.length > 0 && userData.map((user, index) => (
          <FriendsCard user={user.friends} key={index}/>
        ))
      }
    </div>
  )
}

export default Friends
