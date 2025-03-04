import React from 'react'
import { useSelector } from 'react-redux'
import PostCardHeader from './PostCardHeader';
import PostCardBody from './PostCardBody';
import PostCardFooter from './PostCardFooter';
import "../styles/Posts.css"
import PostComment from './PostComment';
import InputPostComment from './InputPostComment';

const SingleUserPosts = ({profile, posts, dispatch, id,  auth}) => {
  return (
    <div className='posts'>
      {
        posts && posts.length > 0 && posts.map((pos) => (
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

export default SingleUserPosts