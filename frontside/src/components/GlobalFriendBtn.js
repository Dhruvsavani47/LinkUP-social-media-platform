import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addfriends, unfriends } from '../redux/actions/profileActions';

const GlobalFriendBtn = ({ classbtn, user }) => {
  const auth = useSelector(state => state.auth);
  const profile = useSelector(state => state.profile);
  const socket = useSelector(state => state.socket);
  const dispatch = useDispatch();
  const [friend, setFriend] = useState(false);

  useEffect(() => {
    if (auth.user.following.find(item => item._id === user._id)) {
      setFriend(true);
    }
  }, [auth.user.following, user._id])

  const addfriend = () => {
    setFriend(true);
    dispatch(addfriends({ users: profile.users, user, auth, socket }))
  }

  const removefriend = () => {
    setFriend(false);
    dispatch(unfriends({ users: profile.users, user, auth, socket }))
  }
  return (
    <div>
      {
        friend ? <button className={classbtn} onClick={removefriend} style={{ backgroundColor: 'crimson' }}>Unfriend</button> : <button className={classbtn} onClick={addfriend}>Add Friend</button>
      }
    </div>
  )
}

export default GlobalFriendBtn
