import React from 'react';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import "../styles/UserCard.css";

const UserCardMessage = ({ children, user, handleClose, msg }) => {
    const handleCloseAll = () => {
        if (handleClose) {
            handleClose();
        }
    }
    
    return (
        <div>
            <Link to={`/profile/${user?._id}`}>
                <div>
                    <div onClick={handleCloseAll} className="user-card hover:bg-gray-300">
                        <Avatar src={user?.avatar} className="user-avatar" />
                        <div className="user-details">
                            <span className="user-fullname">{user?.fullname}</span>
                            <small className="user-username">
                                {
                                    msg ?
                                        <>
                                            <div className='user-card-text'>
                                                {user.text?.length > 20 ? user.text.slice(0, 20) + "..." : user.text}
                                            </div>
                                            {
                                                user.media?.length > 0 &&
                                                <div className='user-card-media'>
                                                    {user.media?.length} <ImageIcon />
                                                </div>
                                            }
                                        </> :
                                        <div className='user-card-text'>
                                            {user?.username}
                                        </div>
                                }
                            </small>
                        </div>
                    </div>
                    {children}
                </div>
            </Link>
        </div>
    );
};

export default UserCardMessage;
