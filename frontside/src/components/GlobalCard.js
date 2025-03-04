import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import "../styles/GlobalCard.css"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import GlobalFriendBtn from "./GlobalFriendBtn"

const GlobalCard = ({ user }) => {
  const [showInfo, setShowInfo] = useState(true);
  const [showInfoAbout, setShowInfoAbout] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const response = await fetch(`/api/user/${user._id}/posts/count`);
        const data = await response.json();
        setPostCount(data.postCount);
      } catch (error) {
        console.error("Error fetching post count:", error);
      }
    };

    if (user._id) {
      fetchPostCount();
    }
  }, [user._id]);


  const toggleshowinfo = (sinfo) => {
    if (sinfo === 'showinfo') {
      setShowInfo(true);
      setShowInfoAbout(false);
    }
    else if (sinfo === 'showinfoabout') {
      setShowInfo(false);
      setShowInfoAbout(true);
    }
  }
  
  return (
    <div className='globalcard'>
      <div className="globalcardbackground">
        <Avatar src={user.avatar} alt="" />
      </div>
      <div className="globalcard-content">
        <div className="globalcard-contentmiddle">
          <Avatar src={user.avatar} alt="" />
        </div>

        <Link to={`/profile/${user._id}`} >
          <div className="globalcard-contentmiddleinfo">
            <h4>{user.fullname || "Fullname"}</h4>
            <h6>{user.username || "Username"}</h6>
          </div>
        </Link>
        {
          showInfo && <>
            <div className="globalcard-contentbottom">
              <div className="globalcard-contentbottomstat">
                <h6>{user.friends?.length || 0}</h6>
                <p>Friends</p>
              </div>

              <div className="globalcard-contentbottomstat">
                <h6>{user.following?.length || 0}</h6>
                <p>Following</p>
              </div>

              <div className="globalcard-contentbottomstat">
                <h6>{postCount}</h6>
                <p>Posts</p>
              </div>
            </div>
            <div className="globalcard-contentbottomgender">
              <PersonIcon style={{ color: user.gender === 'male' ? 'blue' : 'rgb(245, 162, 176)' }} />
            </div>

            {
              auth.user._id !== user._id && <GlobalFriendBtn classbtn="globalcard-contentbottombtn" user={user} />
            }
          </>
        }

        {
          showInfoAbout &&
          <div className="globalcard-contentbottomabout">
            <span className="globalcard-centerbottomabout-story">
              {user.story}
            </span>

            <h4 className="globalcard-centerbottomabout-email">
              {user.email}
            </h4>

            <h5 className="globalcard-centerbottomabout-website">
              {user.website}
            </h5>
          </div>
        }

        <div className="globalcard-contentbottomnavigate">
          <span onClick={() => toggleshowinfo('showinfo')}> o </span> <span onClick={() => toggleshowinfo('showinfoabout')}> o </span>
        </div>
      </div>
    </div>
  )
}

export default GlobalCard
