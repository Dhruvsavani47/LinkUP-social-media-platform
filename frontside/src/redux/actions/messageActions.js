import { deleteDataApi, getDataApi, patchDataApi, postDataApi } from "../../utils/fetchDataApi";
import { DeleteData, EditData } from "./alertActions";
import { POST_TYPES } from "./postActions";

export const MESS_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CONVERSATION: 'GET_CONVERSATION',
    GET_MESSAGE: 'GET_MESSAGE',
    DELETE_MESSAGE: 'DELETE_MESSAGE',
}

export const addUser = ({ user, message }) => async (dispatch) => {
    if (message.users.every(item => item._id !== user._id)) {
        dispatch({
            type: MESS_TYPES.ADD_USER,
            payload: user
        })
    }
}


export const addMessage = ({ auth, msg, socket }) => async (dispatch) => {
    dispatch({
        type: MESS_TYPES.ADD_MESSAGE,
        payload: msg
    })

    socket.emit('addMessage', msg);

    try {
        await postDataApi('message', msg, auth.token);
    } catch (err) {
        dispatch({
            type: "ALERT",
            payload: {
                error: err.response.data.msg,
            }
        })
    }
}

export const getConversations = ({ auth }) => async (dispatch) => {
    try {
        const res = await getDataApi('conversations', auth.token);
        let newArr = [];

        res.data.conversation.forEach(item => {
            item.recipients.forEach(cv => {
                if (cv._id !== auth.user._id) {
                    newArr.push({...cv, text: item.text, media: item.media  })
                }
            })
        })

        dispatch({type: MESS_TYPES.GET_CONVERSATION, payload: {newArr, result: res.data.result}})
    } catch (err) {
        dispatch({
            type: "ALERT",
            payload: {
                error: err.response.data.msg,
            }
        })
    }
}

export const getMessages = ({ auth, id }) => async (dispatch) => {
    try {
        const res = await getDataApi(`message/${id}`, auth.token);
        dispatch({
            type: MESS_TYPES.GET_MESSAGE,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: "ALERT",
            payload: {
                error: err.response.data.msg,
            }
        })
    }
}

export const deleteMessage = ({ message, data, auth }) => async (dispatch) => {
    const newData = DeleteData(message.data, data._id);

    dispatch({
        type: MESS_TYPES.DELETE_MESSAGE, 
        payload: {newData, _id: data.recipient}
    });

    try {
        await deleteDataApi(`message/${data._id}`, auth.token)
    } catch (err) {
        dispatch({
            type: "ALERT",
            payload: {
                error: err.response.data.msg,
            }
        })
    }
}