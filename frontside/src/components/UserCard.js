import React from 'react';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import "../styles/UserCard.css";

const UserCard = ({ user, handleClose }) => {
    const handleCloseAll = () => {
        if(handleClose){
            handleClose();
        }
    }

    return (
        <div>
            <div>
                <Link to={`/profile/${user?._id}`} onClick={handleCloseAll} className="user-card hover:bg-gray-300">
                    <Avatar src={user?.avatar} className="user-avatar" />
                    <div className="user-details">
                        <span className="user-fullname">{user?.fullname}</span>
                        <small className="user-username">@{user?.username}</small>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default UserCard;
