import React, { useState, useEffect } from 'react'
import Info from '../components/Info'
import Posts from '../components/Posts'
import About from '../components/About'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileUsers, getProfileUsersPost } from '../redux/actions/profileActions'
import { useParams } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FaUserFriends } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import Friends from '../components/Friends'
import Following from '../components/Following'
import SingleUserPosts from '../components/SingleUserPosts'
import "../styles/Profile.css"
import SavedPost from './SavedPost'
import ProfilePhotoShow from '../components/ProfilePhotoShow'
import ShowFriendsProfile from '../components/ShowFriendsProfile'
import ShowFollowingsProfile from '../components/ShowFollowingsProfile'

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const { auth, profile } = useSelector(state => state);
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showAccount, setShowAccount] = useState(true);
  const [showFriends, setShowFriends] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handletoggle = (ht) => {
    if (ht === 'showAccount') {
      setShowFriends(false);
      setShowFollowing(false);
      setShowSaved(false);
      setShowAccount(true);
    }

    else if (ht === 'showFriends') {
      setShowFriends(true);
      setShowFollowing(false);
      setShowSaved(false);
      setShowAccount(false);
    }

    else if (ht === 'showFollowing') {
      setShowFriends(false);
      setShowFollowing(true);
      setShowSaved(false);
      setShowAccount(false);
    }

    else if (ht === 'showSaved') {
      setShowFriends(false);
      setShowFollowing(false);
      setShowSaved(true);
      setShowAccount(false);
    }
  }

  useEffect(() => {
    if (profile.userposts.every(item => item?._id !== id)) {
      dispatch(getProfileUsersPost({ profile: profile.userposts, id, auth }))
    } else {
      profile.userposts.forEach(item => {
        if (item._id === id) {
          setPosts(item.posts);
        }
      })
    }

  }, [id, auth, profile.userposts, dispatch]);

  useEffect(() => {

    if (auth?.user && id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const existingUser = profile.users.find(user => user._id === id);

      if (existingUser) {
        setUserData([existingUser]);
      } else {
        dispatch(getProfileUsers({ users: profile.users, id, auth }));
      }
    }
  }, [id, auth, profile.users, dispatch]);

  useEffect(() => {
    profile.userposts.forEach(item => {
      if (item?._id === id) {
        setPosts(item.posts);
      }
    })
  }, [profile.userposts, id]);

  const [photos, setPhotos] = useState([]);

  return (
    <div className='profile'>
      <Info userData={userData} profile={profile} auth={auth} id={id} postsSize={posts.length}/>

      <div className="profileheader">
        <div className="profileheader-items space-x-32">
          <IconButton className='profileheader-item' onClick={() => handletoggle('showAccount')}>
            <AccountCircleIcon style={{ color: '#007bff' }} />
          </IconButton>
          
          <IconButton className='profileheader-item' onClick={() => handletoggle('showFriends')}>
            <FaUserFriends style={{ color: '#007bff' }} />
          </IconButton>
          
          <IconButton className='profileheader-item' onClick={() => handletoggle('showFollowing')}>
            <PersonAddIcon style={{ color: '#007bff' }} />
          </IconButton>

          <IconButton className='profileheader-item' onClick={() => handletoggle('showSaved')}>
            <FaBookmark style={{ color: '#007bff' }} />
          </IconButton>
        </div>
      </div>

      {
        showAccount &&
        <div className="profilebody">
          <div className="profilebody-left">
            <About userData={userData} profile={profile} auth={auth} id={id} />
            <ShowFriendsProfile user={auth.user} />
            <ShowFollowingsProfile user={auth.user} />
          </div>
          <div className="profilebody-center">
            <SingleUserPosts userPosts={userPosts} posts={posts} profile={profile} auth={auth} id={id} dispatch={dispatch} />
          </div>
          <div className="profilebody-right">
            <ProfilePhotoShow photos={photos} />
          </div>
        </div>
      }

      {
        showFriends && <Friends userData={userData} profile={profile} auth={auth} id={id} />
      }

      {
        showFollowing && <Following userData={userData} profile={profile} auth={auth} id={id} />
      }

      {
        showSaved && <SavedPost auth={auth} />
      }
    </div>
  )
}

export default Profile
