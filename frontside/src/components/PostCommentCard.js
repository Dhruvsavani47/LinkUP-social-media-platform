import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentMenuItem from './CommentMenuItem';
import moment from 'moment';
import "../styles/CommentStyle.css"
import { useSelector, useDispatch } from 'react-redux';
import LikePost from './LikePost';
import { likeComment, unlikeComment, updateComment } from '../redux/actions/commentActions';
import InputPostComment from './InputPostComment';

const PostCommentCard = ({ children, comment, pos, commentId }) => {
    const [content, setContent] = useState('');
    const [readMore, setReadMore] = useState(false);
    const auth = useSelector(state => state.auth);
    const [isLike, setIsLike] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [load, setLoad] = useState(false);
    const [onReply, setOnReply] = useState(false);
    const dispatch = useDispatch();

    const handleLike = () => {
        if (load) return;
        setIsLike(true);
        setLoad(true);
        dispatch(likeComment({ comment, pos, auth }));
        setLoad(false);
    }

    const handleUnlike = () => {
        if (load) return;
        setIsLike(false);
        setLoad(true);
        dispatch(unlikeComment({ comment, pos, auth }));
        setLoad(false);
    }

    const handleUpdateComment = () => {
        if (comment.content === content) {
            setOnEdit(false);
        }
        else {
            dispatch(updateComment({ comment, content, pos, auth }));
            setOnEdit(false);
        }
    }

    useEffect(() => {
        setContent(comment.content);
        if (comment.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true);
        }
    }, [comment.content, comment.likes, auth.user._id]);

    const handleReply = () => {
        if (onReply) {
            return setOnReply(false);
        }
        setOnReply({ ...comment, commentId });
    }

    return (
        <div className="postcommentcard">
            {comment &&
                <>
                    <div className="postcommentcarduser">
                        <Link to={`/profile/${comment.user?._id}`}>
                            <div className='postcommentcarduserinfo'>
                                <Avatar className="postcommentcardavatar" src={comment.user.avatar} alt={comment.user.fullname} />

                                <div className='postcommentcardavatarinfo'>
                                    <h4 className="postcommentcardfullname" >{comment.user.fullname}</h4>
                                    <h6 className="postcommentcardtime">{moment(comment.createdAt).fromNow()}</h6>
                                </div>
                            </div>
                        </Link>

                        <div className='postcommentcarduserdropdown'>
                            <CommentMenuItem auth={auth} comment={comment} pos={pos} setOnEdit={setOnEdit} />
                        </div>
                    </div>
                    <div className="postcommentcardcommentcontent">
                        <div className="postcommentcardcommentcontent-content">
                            {
                                onEdit ? <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} placeholder='Change your opinion' className='postcommentcardcommentcontent-contentedit' /> :
                                    <>
                                        {
                                            comment?.tag && comment.tag._id !== comment.user._id &&
                                            <Link to={`/profile/${comment.tag._id}`} >
                                                @{comment.tag.username}
                                            </Link>
                                        }
                                        <span>
                                            {
                                                content.length < 100 ? content : readMore ? content + '...' : content.slice(0, 100) + '...'
                                            }
                                        </span>
                                        <span>
                                            {
                                                content.length > 100 &&
                                                <span onClick={() => setReadMore(!readMore)} className='postcommentcardcommentcontentshowhide'>
                                                    {
                                                        readMore ? 'Hide' : 'showMore'
                                                    }
                                                </span>
                                            }
                                        </span>
                                    </>
                            }

                        </div>
                    </div>

                    <div className="postcommentcardcommentcontent-likes">
                        <p className='postcommentcardcommentcontent-likescount'>{comment.likes.length}</p>

                        <div className="postcommentcardcommentcontent-likesicon">
                            <LikePost isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike} />
                        </div>

                        {
                            onEdit ?
                                <>
                                    <p className='postcommentcardcommentcontent-replay' onClick={() => handleUpdateComment()}> Update </p>
                                    <p className='postcommentcardcommentcontent-replay' onClick={() => setOnEdit(false)}> Cancel </p>
                                </> :
                                <p className='postcommentcardcommentcontent-replay' onClick={handleReply}>{onReply ? 'ReplyOpinion' : "Reply"}</p>
                        }
                    </div>
                </>
            }

            <div className='postcommentcardcommentcontent-reply' style={{ marginTop: "10px" }}>
                {
                    onReply &&
                    <>
                        <InputPostComment comment={comment} onReply={onReply} setOnReply={setOnReply}>
                            <Link to={`/profile/${onReply.user._id}`}>
                                @{onReply.user.username} : {' '}
                            </Link>
                        </InputPostComment>
                    </>
                }
                {children}
            </div>
        </div>
    )
}

export default PostCommentCard
