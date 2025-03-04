import React, { useEffect, useState } from 'react'
import PostCommentCard from './PostCommentCard'

const PostCommentDisplay = ({ comment, pos, newReply }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(2);

  useEffect(() => {
    setShowRep(newReply.slice(newReply.length - next));
  }, [newReply, next]);

  return (
    <div>
      <PostCommentCard comment={comment} pos={pos} commentId={comment._id}>
        <div>
          {
            showRep.map((item, index) => (
              <PostCommentCard key={index} comment={item} commentId={comment._id} pos={pos} />
            ))
          }

          {
            newReply.length - next > 0 ?
              <div onClick={() => setNext(prev => prev + 10)} style={{ cursor: "pointer", backgroundColor: "#007bff", color: "white", borderRadius: "5px", padding: "5px", marginBottom: "10px" }}>
                Show More Reply
              </div>
              : newReply.length > 2 &&
              <div onClick={() => setNext(2)} style={{ cursor: "pointer", backgroundColor: "#007bff", color: "white", borderRadius: "5px", padding: "5px", marginBottom: "10px" }}>
                Hide Extra Reply
              </div>
          }
        </div>
      </PostCommentCard>
    </div>
  )
}

export default PostCommentDisplay
