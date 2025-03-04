import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { POST_TYPES } from './redux/actions/postActions';
import { NOTIFY_TYPES } from './redux/actions/notifyActions';
import { MESS_TYPES } from './redux/actions/messageActions';

const SocketioClient = () => {
    const auth = useSelector(state => state.auth);
    const socket = useSelector(state => state.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.emit('joinUser', auth.user._id);
    }, [socket, auth.user._id])

    useEffect(() => {
        socket.on('likeToClient', newPost => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        });

        return () => socket.off('likeToClient');
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('unLikeToClient', newPost => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        });

        return () => socket.off('unLikeToClient');
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('createCommentToClient', newPost => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        });

        return () => socket.off('createCommentToClient');
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('deleteCommentToClient', newPost => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        });

        return () => socket.off('deleteCommentToClient');
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('addfriendToClient', newUser => {
            dispatch({ type: 'AUTH', payload: {...auth, user: newUser} })
        });

        return () => socket.off('addfriendToClient');
    }, [socket, dispatch, auth])

    useEffect(() => {
        socket.on('unfriendToClient', newUser => {
            dispatch({ type: 'AUTH', payload: {...auth, user: newUser} })
        });

        return () => socket.off('unfriendToClient');
    }, [socket, dispatch, auth])

    useEffect(() => {
        socket.on('createNotifyToClient', msg => {
            dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFIES, payload: msg })
        });

        return () => socket.off('createNotifyToClient');
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('removeNotifyToClient', msg => {
            dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFIES, payload: msg })
        });

        return () => socket.off('removeNotifyToClient');
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('addMessageToClient', msg => {
            dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg })
        });

        return () => socket.off('addMessageToClient');
    }, [socket, dispatch])

    return (
        <div>

        </div>
    )
}

export default SocketioClient