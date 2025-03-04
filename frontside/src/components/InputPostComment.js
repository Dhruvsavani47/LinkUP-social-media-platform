import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TbSend2 } from "react-icons/tb";
import "../styles/CommentStyle.css"
import { createComment } from '../redux/actions/commentActions';

const InputPostComment = ({ children, pos, comment, onReply, setOnReply }) => {
  const [content, setContent] = useState('');
  const auth = useSelector(state => state.auth);
  const socket = useSelector(state => state.socket);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      if (onReply) {
        return setOnReply(false);
      }
      return;
    }

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply ? onReply.commentId : null,
      tag: onReply ? onReply.user : null,
    }
    // console.log(newComment);

    dispatch(createComment({ pos, newComment, auth, socket }))

    if (onReply) {
      return setOnReply(false);
    }

    setContent('');
  }

  return (
    <div className='inputpostcomments'>
      <div className="inputpostcomments-left">
        <Avatar src={auth.user.avatar} />
      </div>

      {children}

      <input className='inputpostcomments-input' type="text" placeholder="Input your opinion" value={content} onChange={(e) => { setContent(e.target.value) }} />
      <TbSend2 className='inputpostcomments-button' onClick={handleSubmit} />
    </div>
  )
}

export default InputPostComment;