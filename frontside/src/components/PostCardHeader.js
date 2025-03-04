import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/PostCard.css"
import moment from 'moment';
import { useSelector } from "react-redux"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ALERT_TYPES } from "../redux/actions/alertActions";
import { useDispatch } from "react-redux"
import { deletePost } from '../redux/actions/postActions';
import { BASE_URL } from "../utils/config"

const PostCardHeader = ({ pos }) => {
    const auth = useSelector(state => state.auth);
    const socket = useSelector(state => state.socket);
    const [showDrop, setShowDrop] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEdit = (ed) => {

        dispatch({
            type: ALERT_TYPES.STATUS,
            payload: {
                ...pos,
                edit: true,
            }
        })
        setShowDrop(false);
    }

    const handleDeletePost = () => {
        dispatch(deletePost({pos, auth, socket}));
        setShowDrop(false);
        navigate('/');
    }

    const handleCopyPostLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${pos._id}`);
        setShowDrop(false);
    }

    return (
        <div className='postcardheader'>
            <Link to={`/profile/${pos.user._id}`}>
                <div className="postcardheadertop">
                    <Avatar className="postcardheadertopavatar" src={pos.user.avatar} alt={pos.user.fullname} />

                    <div className="postcardheaderinfo">
                        <h6 className='text-black'>{pos.user.fullname} <span className='text-gray-400 font-normal'> posted </span> {pos.images?.length} {pos.images?.length > 1 ? "images" : "image"}</h6>
                        <h6>{moment(pos.createdAt).fromNow()}</h6>
                    </div>
                </div>
            </Link>

            <div className="postcardheaderdown">
                <MoreHorizIcon onClick={() => setShowDrop(!showDrop)} />
                {
                    showDrop &&
                    <div className="postcarddropdown">
                        {
                            auth?.user._id === pos.user._id ? <>
                                <h6 onClick={() => handleEdit(pos)}>Edit Post</h6>
                                <h6 onClick={handleDeletePost}>Delete Post</h6>
                                <h6 onClick={handleCopyPostLink}>Copy Link</h6>
                            </> : <h6 onClick={handleCopyPostLink}>Copy Link</h6>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default PostCardHeader
