import React, { useState } from 'react'
import "../styles/PostCard.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const PostCardBody = ({ pos }) => {
  const [readMore, setReadMore] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const totalImage = pos.images.length;

  const showNextImage = (nextImage) => {
    console.log(nextImage.length, currentImage);

    if (currentImage > 0) {
      setCurrentImage(prev => prev - 1);
    }
  };

  const showPrevImage = (prevImage) => {
    console.log(prevImage.length, currentImage);

    if (currentImage < totalImage - 1) {
      setCurrentImage(prev => prev + 1);
    }
  };

  return (
    <div className='postcardbody'>
      <div className="postcardbodycontent">
        {
          pos.content?.length < 100 ? pos.content :
            readMore ? pos.content + '...' : pos.content.slice(0, 100) + "..."
        }
        <span>
          {
            pos.content?.length > 100 && 
            <span onClick={() => setReadMore(!readMore)} className='postcardbodycontentshowhide'>
              {
                readMore ? 'Hide' : 'showMore'
              }
            </span>
          }
        </span>
      </div>

      <div className="postcardbodyimage">
        <NavigateBeforeIcon className="postcardbodyimageprev" onClick={() => showNextImage(pos.images)} />
        <NavigateNextIcon className="postcardbodyimagenext" onClick={() => showPrevImage(pos.images)} />

        {
          pos.images?.length > 0 && pos.images.map((image, index) => (
            (index === currentImage) &&
            <div className="postcardbodyimages" key={index}>
              {
                image.secure_url?.match(/video/i) ? 

                <video controls src={image.secure_url} alt={pos.user.fullname} height="100%" width="100%"/> :
                <img src={image.secure_url} alt={pos.user.fullname} />
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PostCardBody
