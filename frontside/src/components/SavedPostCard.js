import { Avatar } from '@mui/material'
import moment from 'moment'
import React from 'react'
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { BiCommentDetail } from "react-icons/bi";
import "../styles/SavedPostCard.css";
import { Link } from "react-router-dom"

const SavedPostCard = ({ savedPost }) => {
    console.log(savedPost)
    return (
        <div className='savepostcard'>
            <Link to={`/post/${savedPost._id}`} >
                <div className="savepostcard-content">
                    <div className="savepostcard-contentuserinfo">
                        <Avatar src={savedPost.user?.avatar} alt={savedPost.user?.fullname} />

                        <div className="savedpostcard-contentinfodetail">
                            <h5>{savedPost.user?.fullname}</h5>
                            <small>@{savedPost.user?.username}</small>
                        </div>
                    </div>

                    <div className="savepostcard-contentmiddle">

                        {
                            savedPost.images[0].secure_url.match(/video/i) ?
                                <video controls src={savedPost.images[0].secure_url} alt="" height="100%" width="100%" /> :
                                <img src={savedPost.images[0].secure_url} alt="" />
                        }
                    </div>

                    <div className="savepostcard-contentend">
                        <div className="savepostcard-contentenditem">
                            <h6>{savedPost.likes.length}</h6> <ThumbUpAltIcon className='blue-round-like' />
                        </div>

                        <div className="savepostcard-contentenditem">
                            <h6>{savedPost.comments.length}</h6> <BiCommentDetail />
                        </div>
                    </div>

                    <div className="savepostcard-contentendtime">
                        <small> Post Created At : </small>
                        <small>{moment(savedPost.createdAt).format("DD MMM YYYY")}</small>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default SavedPostCard
