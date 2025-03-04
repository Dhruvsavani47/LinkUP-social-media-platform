import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getPostSingle } from '../redux/actions/postActions';
import PostCardHeader from '../components/PostCardHeader';
import PostCardBody from '../components/PostCardBody';
import PostCardFooter from '../components/PostCardFooter';
import PostComment from '../components/PostComment';
import InputPostComment from '../components/InputPostComment';

const Post = () => {
  const [post, setPost] = useState([]);
  const { auth, detailPost } = useSelector(state => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getPostSingle({ detailPost, auth, id }));
    }

    if (detailPost.length > 0) {
      const newPost = detailPost.filter(item => item._id === id);
      setPost(newPost);
    }
  }, [detailPost, auth, id, dispatch])

  return (
    <div style={{width: "600px", margin: "auto", maxWidth: "100%", marginTop: "20px"}}>
      {
        post && post.length > 0 && post.map((pos) => (
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

export default Post




