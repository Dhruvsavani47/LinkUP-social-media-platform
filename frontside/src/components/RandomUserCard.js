import React from 'react';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import "../styles/RandomUserCard.css";
import GlobalFriendBtn from './GlobalFriendBtn';

const RandomUserCard = ({ user, handleClose }) => {
    const handleCloseAll = () => {
        if(handleClose){
            handleClose();
        }
    }

    return (
        <div className='randomusercard'>
            <div className='randomusercard-container'>
                <Link to={`/profile/${user?._id}`} onClick={handleCloseAll} className="randomusercarduser-card hover:bg-gray-300">
                    <Avatar src={user?.avatar} className="randomusercarduser-avatar" />
                    <div className="randomusercarduser-details">
                        <span className="randomusercarduser-fullname">{user?.fullname}</span>
                        <small className="randomusercarduser-username">@{user?.username}</small>
                    </div>
                </Link>

                <GlobalFriendBtn classbtn="profileinfo-centerbtn" user={user}/>
            </div>
        </div>
    );
};

export default RandomUserCard;
