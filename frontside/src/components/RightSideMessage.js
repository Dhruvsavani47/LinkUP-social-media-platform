import React, { useEffect, useRef, useState } from 'react'
import UserCardMessage from './UserCardMessage'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import MsgDisplay from './MsgDisplay';
import { TbSend2 } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import ImageIcon from '@mui/icons-material/Image';
import { imageupload } from '../utils/imageUpload';
import { addMessage, getMessages } from '../redux/actions/messageActions';
import loadIcon from "../images/loading.png";
import { HiEmojiHappy } from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";

const RightSideMessage = () => {
  const [user, setUser] = useState([]);
  const [media, setMedia] = useState([]);
  const [text, setText] = useState('');
  const [loadMedia, setLoadMedia] = useState(false);
  const auth = useSelector(state => state.auth);
  const message = useSelector(state => state.message);
  const socket = useSelector(state => state.socket);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const newData = message.users.find(item => item._id === id);
    if (newData) {
      setUser(newData);
    }
  }, [message.users, id])

  const uploadMedia = (e) => {
    const files = [...e.target.files];
    let mediaArr = [];

    for (const file of files) {
      if (!file) {
        dispatch({
          type: "ALERT",
          payload: {
            error: "No image found"
          }
        })
      }
      else if (file.size > 1024 * 1024 * 10) {
        dispatch({
          type: "ALERT",
          payload: {
            error: "File is too large (10 MB)"
          }
        })
      }
      else {
        mediaArr.push(file);
      }
    }
    setMedia([...media, ...mediaArr])
    console.log([...media, ...mediaArr]);
  }

  const handleUploadInput = (e) => {
    e.preventDefault();
    const imageUploadFunc = document.getElementById('fileuploadmsg');
    imageUploadFunc.click();
  }

  const imageShow = (src) => {
    return (
      <>
        <img src={src} alt="no" className='chat-middleimages' />
      </>
    )
  }

  const videoShow = (src) => {
    return (
      <>
        <video controls src={src} alt="no" className='chat-middleimages' />
      </>
    )
  }

  const deleteImage = (i) => {
    const newArrImage = [...media];
    newArrImage.splice(i, 1);
    setMedia(newArrImage);
  }

  const refDisplay = useRef();

  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        await dispatch(getMessages({ auth, id }));

        if (refDisplay.current) {
          refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }

      getMessagesData();
    }
  }, [id, dispatch, auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text?.trim() && media.length === 0) {
      return;
    }

    setMedia([]);
    setText('');
    setLoadMedia(true);

    let medArr = [];

    if (media.length > 0) {
      medArr = await imageupload(media);
    }

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: medArr,
      createdAt: new Date().toISOString()
    }

    setLoadMedia(false);
    await dispatch(addMessage({ auth, msg, socket }));

    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    setShowEmojiPicker(false);
  }

  const handleEmojiClick = (emojiObject, event) => {
    event.stopPropagation(); 
    event.preventDefault();

    setText((prev) => prev + emojiObject.emoji);

    setTimeout(() => {
      document.getElementById("messageInput")?.focus();
    }, 0);
  };


  return (
    <div className='rightsidecontent'>
      <div className="rightsidecontentheader">
        {
          user?.length !== 0 &&
          <>
            <UserCardMessage user={user} />
            <MdDelete className='rightsidecontentheaderdelete' />
          </>
        }
      </div>

      <div className='rightsidecontentmessages'>
        <div className="rightsidecontentmessages-chatbox" ref={refDisplay}>

          {
            message.data?.map((msg, index) => (
              <div key={index} ref={refDisplay}>
                {
                  msg.sender !== auth.user._id &&
                  <div className="rightsidecontentmessages-other">
                    <MsgDisplay user={user} msg={msg} />
                  </div>
                }

                {
                  msg.sender === auth.user._id &&
                  <div className="rightsidecontentmessages-ours">
                    <MsgDisplay user={auth.user} msg={msg} />
                  </div>
                }
              </div>
            ))
          }

          {
            loadMedia &&
            <div className='loadingicon'>
              <img src={loadIcon} alt='loading' />
            </div>
          }
        </div>
      </div>

      <div className='rightsidecontentinputmsg-mediadiv'>
        {
          media.length > 0 && media.map((item, index) => (
            <div className="rightsidecontentinputmsg-mediadivitem" key={index}>
              {
                item.type.match(/video/i)
                  ? videoShow(URL.createObjectURL(item))
                  : imageShow(URL.createObjectURL(item))
              }
              <span className='rightsidecontentinputmsg-mediadivitemdelete' onClick={() => deleteImage(index)}> &times; </span>
            </div>
          ))
        }
      </div>

      {
        showEmojiPicker && (
          <div className='emojipicker' onClick={(e) => e.stopPropagation()}>
            <EmojiPicker onEmojiClick={(emojiObject, event) => handleEmojiClick(emojiObject, event)} />
          </div>
      )}


      <div className='rightsidecontentinputmsg'>
        <button className="rightsidecontentinputbutton" onClick={() => setShowEmojiPicker(!showEmojiPicker)}> <HiEmojiHappy /> </button>
        <form className='rightsidecontentinput' onSubmit={handleSubmit}>
          <input
            type="text"
            id="messageInput"
            placeholder="Type the message"
            value={text}
            className="rightsidecontentinputfield"
            onChange={(e) => setText(e.target.value)}
          />


          <div className="rightsidecontentinputfileupload">
            <button className="rightsidecontentinputbutton" onClick={handleUploadInput}> <ImageIcon /> </button>
            <input type="file" id='fileuploadmsg' multiple accept='image/* , video/*' style={{ display: "none" }} className="rightsidecontentinputfile" onChange={uploadMedia} />
          </div>

          <button type="submit" className="rightsidecontentinputbutton" disabled={text?.trim() === "" && media.length === 0}> <TbSend2 /> </button>
        </form>
      </div>
    </div>
  )
}

export default RightSideMessage
