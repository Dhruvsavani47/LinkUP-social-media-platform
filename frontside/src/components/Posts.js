import React from 'react'
import { useSelector } from 'react-redux'
import PostCardHeader from './PostCardHeader';
import PostCardBody from './PostCardBody';
import PostCardFooter from './PostCardFooter';
import "../styles/Posts.css"
import PostComment from './PostComment';
import InputPostComment from './InputPostComment';

const Posts = () => {
  const homePost = useSelector(state => state.homePost);

  return (
    <div className='posts'>
      {
        homePost && homePost.post.length > 0 && homePost.post.map((pos) => (
          <div className="postcards" key={pos._id}>
            <PostCardHeader pos={pos} />
            <PostCardBody pos={pos} />
            <PostCardFooter pos={pos} />
            <PostComment pos={pos} />
            <InputPostComment pos={pos} />
          </div>
        ))
      }
    </div>
  )
}

export default Posts



