import React, { useEffect, useState } from 'react'
import PostCommentDisplay from './PostCommentDisplay'

const PostComment = ({ pos }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [replyComments, setReplyComments] = useState([]);
  const [next, setNext] = useState(2);

  useEffect(() => {
    const ncm = pos.comments.filter(cm => !cm.reply);
    setComments(ncm);
    setShowComments(ncm.slice(-next));
  }, [pos.comments, next])

  return (
    <div>
      {
        showComments && showComments.map(comment => (
          <PostCommentDisplay comment={comment} pos={pos} key={comment._id} newReply={pos.comments.filter(item => item.reply === comment._id)}/>
        ))
      }

      {
        comments.length - next > 0 ?
          <div onClick={() => setNext(prev => prev + 10)} style={{cursor: "pointer", backgroundColor: "#007bff", color: "white", borderRadius: "5px", padding: "5px", marginBottom: "10px"}}>
            Show More Comments
          </div>
          : comments.length > 2 && 
          <div onClick={() => setNext(2)} style={{cursor: "pointer", backgroundColor: "#007bff", color: "white", borderRadius: "5px", padding: "5px", marginBottom: "10px"}}>
            Hide Extra Comments
          </div>
      }
    </div>
  )
}

export default PostComment
