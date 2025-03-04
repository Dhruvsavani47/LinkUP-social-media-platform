import React, { useState, useEffect } from 'react'
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { BiCommentDetail } from "react-icons/bi";
import { RxBookmarkFilled } from "react-icons/rx";
import "../styles/PostCard.css"
import { Link } from "react-router-dom"
import LikePost from './LikePost';
import { useSelector, useDispatch } from "react-redux"
import { likePost, savedPost, unLikePost, unSavedPost } from '../redux/actions/postActions';

const PostCardFooter = ({ pos }) => {
  const [isLike, setIsLike] = useState(false);
  const [load, setLoad] = useState(false);
  const [saved, setSaved] = useState(false);
  const auth = useSelector(state => state.auth);
  const socket = useSelector(state => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if(pos.likes.find(like => like._id === auth.user._id)){
      setIsLike(true);
    }else{
      setIsLike(false);
    }
  },[pos.likes, auth.user._id]);

  useEffect(() => {
    if(auth.user.saved.find(id => id === pos._id)){
      setSaved(true);
    }else{
      setSaved(false);
    }
  },[auth.user.saved, pos._id]);

  const handleLike = async () => {
    if(load) return;
    setIsLike(true);
    setLoad(true);
    dispatch(likePost({ pos, auth, socket }));
    setLoad(false);
  }

  const handleUnlike = async () => {
    if(load) return;
    setIsLike(false);
    setLoad(true);
    dispatch(unLikePost({ pos, auth, socket }));
    setLoad(false);
  }

  return (
    <div className='postcardfooter'>
      <div className="postcardfootertop">
        <div className="postcardfootertopitems">
          <span>{pos.likes?.length} </span>
          <ThumbUpAltIcon className='blue-round-like' />
        </div>

        <div className="postcardfootertopitems">
          <span>{pos.comments?.length} </span>
          <BiCommentDetail style={{ fontSize: "18px" }} />
        </div>
      </div>

      <div className="postcardfooterbottom">
        <div className="postcardfooterbottomitems">
          <LikePost isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike} />
          <span> Like </span>
        </div>

        <Link to={`/post/${pos._id}`}>
          <div className="postcardfooterbottomitems">
            <BiCommentDetail />
            <span> Comment </span>
          </div>
        </Link>

        <div className="postcardfooterbottomitems">
          {
            saved ? 
            <RxBookmarkFilled style={{color: "#007bff"}} onClick={() => dispatch(unSavedPost({pos, auth}))}/> :
            <RxBookmarkFilled onClick={() => dispatch(savedPost({pos, auth}))}/>
          }
          <span> Save </span>
        </div>
      </div>
    </div>
  )
}

export default PostCardFooter
