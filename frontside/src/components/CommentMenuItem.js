import React, { useState } from 'react'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../redux/actions/commentActions';

const CommentMenuItem = ({ auth, comment, pos, setOnEdit }) => {
  const [menuItem, setMenuItem] = useState(false);
  const dispatch = useDispatch();
  const socket = useSelector(state => state.socket);

  const handleEditComment = () => {
      setOnEdit(true);
      setMenuItem(false);
  }

  const handleRemove = () => {
    dispatch(deleteComment({ comment, pos, auth, socket }))
  }

  const MenuItem = () => {
    return (
      <>
        <div className='commentmenuitemlist'>
          <h6 className='commentmenuitemedit' onClick={handleEditComment}>Edit</h6>
          <h6 className='commentmenuitemdelete' onClick={handleRemove}>Remove</h6>
        </div>
      </>
    )
  }

  return (
    <div className='commentmenuitems'>
      {
        (pos.user._id === auth.user._id || comment.user._id === auth.user._id) &&
        <div className='commentmenuitemsicon' onClick={() => setMenuItem(!menuItem)}>
          <MoreHorizIcon />
        </div>
      }

      {
        menuItem ? (pos.user._id === auth.user._id ? comment.user._id === auth.user._id ? MenuItem() :
          <h6 className='commentmenuitemdelete' onClick={handleRemove}>Remove</h6> :
          comment.user._id === auth.user._id && MenuItem()) : ""
      }
    </div>
  )
}

export default CommentMenuItem
