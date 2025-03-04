import React from 'react'
import GlobalShortCard from './GlobalShortCard'
import "../styles/GlobalShortCard.css"

const ShowFriendsProfile = ({ user }) => {
  return (
    <div className='showfriendsprofile'>
        <h4 className='showfriendsprofileheader'> Friends {user?.friends.length} </h4>
      {
        user?.friends.length > 0 && user?.friends.map(friend => (
            <GlobalShortCard friend={friend} key={friend._id}/>
        ))
      }
    </div>
  )
}

export default ShowFriendsProfile
