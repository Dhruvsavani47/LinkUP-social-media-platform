import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import "../styles/ProfileInfo.css"
import EditProfile from './EditProfile';
import GlobalFriendBtn from './GlobalFriendBtn';


const Info = ({ userData, profile, auth, id, postsSize }) => {
    const [onEdit, setOnEdit] = useState();

    return (
        <div className='profileinfo'>
            {
                userData?.length > 0 && userData.map(((user, index) => (
                    <div className="profileinfo-container" key={index}>
                        <div className="profileinfo-top">
                            <Avatar src={user.avatar} alt="" />
                        </div>

                        <div className="profileinfo-center">
                            <Avatar src={user.avatar} alt />
                            {
                                user && auth && user._id === auth.user._id ?
                                    <button onClick={() => setOnEdit(true)}>Edit Profile</button> :
                                    <GlobalFriendBtn classbtn="profileinfo-centerbtn" user={user} />
                            }
                        </div>

                        <div className="profileinfo-bottom">
                            <div className="profileinfo-bottomleft">
                                <div className="profileinfo-state">
                                    <h6 className="profileinfo-statenumber">{user.friends.length}</h6>
                                    <h6 className="profileinfo-statedesc">Friends</h6>
                                </div>

                                <div className="profileinfo-state">
                                    <h6 className="profileinfo-statenumber">{user.following.length}</h6>
                                    <h6 className="profileinfo-statedesc">Following</h6>
                                </div>

                                <div className="profileinfo-state">
                                    <h6 className="profileinfo-statenumber">{postsSize}</h6>
                                    <h6 className="profileinfo-statedesc">Posts</h6>
                                </div>
                            </div>

                            <div className="profileinfo-bottomcenter">
                                <h3 className="profileinfo-fullname font-bold">{user.fullname}</h3>
                                <h5 className="profileinfo-username font-light">@{user.username}</h5>
                            </div>
                        </div>
                        {
                            onEdit && <EditProfile user={user} setOnEdit={setOnEdit} />
                        }
                    </div>
                )))
            }
        </div>
    )
}

export default Info
