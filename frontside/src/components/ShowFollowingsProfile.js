import React from 'react'
import GlobalShortCard from './GlobalShortCard'
import "../styles/GlobalShortCard.css"

const ShowFollowingsProfile = ({ user }) => {
  return (
    <div className='showfriendsprofile'>
        <h4 className='showfriendsprofileheader'> Following {user?.following.length} </h4>
      {
        user?.following.length > 0 && user?.following.map(friend => (
            <GlobalShortCard friend={friend} key={friend._id}/>
        ))
      }
    </div>
  )
}

export default ShowFollowingsProfile
