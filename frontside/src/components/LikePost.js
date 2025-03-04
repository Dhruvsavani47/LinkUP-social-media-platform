import React from 'react'
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import "../styles/LikePost.css"

const LikePost = ({ isLike, handleLike, handleUnlike }) => {
    return (
        <div className='likepost'>
            {
                isLike ? <BiSolidLike onClick={handleUnlike} style={{color: "#007bff", fontSize: "20px"}}/> : <BiLike onClick={handleLike} className='likepostborder' style={{fontSize: "20px"}}/>
            }
        </div>
    )
}

export default LikePost
