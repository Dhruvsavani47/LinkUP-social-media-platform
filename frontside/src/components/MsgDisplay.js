import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { deleteMessage } from '../redux/actions/messageActions';
import { useDispatch, useSelector } from 'react-redux';

const MsgDisplay = ({ user, msg }) => {
    const [showDrop, setShowDrop] = useState(false);
    const auth = useSelector(state => state.auth);
    const message = useSelector(state => state.message);
    const dispatch = useDispatch();

    const imageShow = (src) => {
        return (
            <>
                <img src={src} alt="no" className='chat-middleimages' />
            </>
        )
    }

    const videoShow = (src) => {
        return (
            <>
                <video controls src={src} alt="no" className='chat-middleimages' />
            </>
        )
    }

    const handleDeleteMsg = (data) => {
        dispatch(deleteMessage({ message, data, auth }));
        setShowDrop(false);
    }

    const handleCopyMsg = (msg) => {
        if (msg.text) {
            navigator.clipboard.writeText(msg.text)
                .catch(err => {
                    console.error("Failed to copy message: ", err);
                });
        }
        setShowDrop(false);
    };


    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
    }).format(new Date(msg.createdAt));

    return (
        <div className='msgdisplay'>
            <div className="msgdisplayinfouser">
                <div className='msgdisplayinfousermain'>
                    <Avatar className="msgdisplayinfouseravatar" src={user?.avatar} alt={user?.fullname} />
                    <span className="msgdisplayinfouserusername">{user?.username}</span>
                </div>
                <div className='rightsidecontentheaderdeletesinglemsg'>
                    <MoreHorizIcon onClick={() => setShowDrop(!showDrop)} />
                    {showDrop && (
                        <div className="rightsidecontentheaderdeletesinglemsgdropdown">
                            {
                                auth.user._id === msg.sender ? (
                                    <>
                                        <h6 onClick={() => handleDeleteMsg(msg)}>Delete</h6>
                                        <h6 onClick={() => handleCopyMsg(msg)}>Copy</h6>
                                    </>
                                ) : (
                                    <h6 onClick={() => handleCopyMsg(msg)}>Copy</h6>
                                )}
                        </div>
                    )}
                </div>
            </div>

            <div className="msgdisplaytext">
                {
                    msg.text &&
                    <p className="msgdisplaytextcontent">{msg?.text}</p>
                }

                <div className='msgdisplaytextmedia'>
                    {
                        msg.media.map((item, index) => (
                            <div key={index} className='msgdisplaytextmediaitem'>
                                {
                                    item.secure_url.match(/video/i)
                                        ? videoShow(item.secure_url)
                                        : imageShow(item.secure_url)
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="msgdisplaytime">
                {
                    msg.createdAt &&
                    <small className="msgdisplaytimetime">{formattedDate}</small>
                }
            </div>
        </div>
    )
}

export default MsgDisplay
