import { imageupload } from "../../utils/imageUpload";
import { deleteDataApi, getDataApi, patchDataApi, postDataApi } from "../../utils/fetchDataApi";
import { createNotify, removeNotify } from "./notifyActions";

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    LOADING_POSTS: 'LOADING_POSTS',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST',
}

export const createPost = ({ content, images, auth, socket }) => async (dispatch) => {
    let media = [];

    try {
        dispatch({
            type: 'ALERT',
            payload: {
                loading: true,
            }
        })

        if (images.length > 0) {
            media = await imageupload(images);
        }

        const res = await postDataApi('posts', { content, images: media }, auth.token);
        console.log(res);

        dispatch({
            type: POST_TYPES.CREATE_POST,
            payload: { ...res.data.newPost, user: auth.user },
        })

        dispatch({
            type: 'ALERT',
            payload: {
                loading: false,
            }
        })

        const msg = {
            id: res.data.newPost._id,
            text: "Added a new post",
            url: `/post/${res.data.newPost._id}` ,
            recipients: res.data.newPost.user.friends,
            content,
            image: media[0].secure_url,
        }

        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: "ALERT",
            payload: {
                error: err.response.data.msg,
            }
        })
    }
}

export const getPost = (token) => async (dispatch) => {
    try {
        dispatch({
            type: POST_TYPES.LOADING_POSTS,
            payload: true,
        })
        const res = await getDataApi('posts', token);

        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: res.data,
        })

        dispatch({
            type: POST_TYPES.LOADING_POSTS,
            payload: false,
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

export const updatePost = ({ content, images, auth, status }) => async (dispatch) => {
    let media = [];
    const newImageURL = images.filter(img => !img.secure_url)
    const oldImageURL = images.filter(img => img.secure_url)

    console.log({ newImageURL, oldImageURL });

    if (status.content === content && newImageURL.length === 0 && oldImageURL.length === status.images.length) {
        return;
    }

    try {
        dispatch({
            type: 'ALERT',
            payload: {
                loading: true,
            }
        })

        if (newImageURL.length > 0) {
            media = await imageupload(newImageURL);
        }

        const res = await patchDataApi(`post/${status._id}`, { content, images: [...oldImageURL, ...media] }, auth.token);
        console.log(res);

        dispatch({
            type: 'ALERT',
            payload: {
                success: res.data.msg,
            }
        })

        dispatch({
            type: POST_TYPES.UPDATE_POST,
            payload: res.data.newPost,
        })

        dispatch({
            type: 'ALERT',
            payload: {
                loading: false,
            }
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

export const likePost = ({ pos, auth, socket }) => async (dispatch) => {
    const newPost = { ...pos, likes: [...pos.likes, auth.user] }

    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost
    })

    socket.emit('likePost', newPost );

    try {
        const res = await patchDataApi(`post/${pos._id}/like`, null, auth.token);

        const msg = {
            id: auth.user._id,
            text: "Like the post",
            url: `/post/${pos._id}` ,
            recipients: [pos.user._id],
            content: pos.content,
            image: pos.images[0].secure_url,
        }

        dispatch(createNotify({msg, auth, socket}))
    } catch (err) {
        dispatch({
            type: "ALERT",
            payload: {
                error: err.response.data.msg,
            }
        })
    }
}

export const unLikePost = ({ pos, auth, socket }) => async (dispatch) => {
    const newPost = { ...pos, likes: pos.likes.filter(like => like._id !== auth.user._id) }

    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost
    }) 

    socket.emit('unLikePost', newPost);

    try {
        const res = await patchDataApi(`post/${pos._id}/unlike`, null, auth.token);

        const msg = {
            id: auth.user._id,
            text: "Unlike the post",
            url: `/post/${pos._id}` ,
            recipients: [pos.user._id],
        }

        dispatch(removeNotify({msg, auth, socket}))
    } catch (err) {
        dispatch({
            type: "ALERT",
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const getPostSingle = ({ detailPost, auth, id }) => async (dispatch) => {
    if(detailPost.every(item => item._id !== id)){
        try {
            const res = await getDataApi(`post/${id}`, auth.token);
            console.log(res);

            dispatch({
                type: POST_TYPES.GET_POST,
                payload: res.data.post, 
            })
        } catch (err) {
            dispatch({
                type: "ALERT",
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const savedPost = ({ pos, auth }) => async (dispatch) => {
    const newUser = {...auth.user, saved: [...auth.user.saved, pos._id]};

    dispatch({
        type: 'AUTH',
        payload: {
            ...auth, 
            user: newUser
        }
    })

    try {
        const res = await patchDataApi(`save/${pos._id}`, null, auth.token);
        console.log(res);
    } catch (err) {
        dispatch({
            type: "ALERT",
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const unSavedPost = ({ pos, auth }) => async (dispatch) => {
    const newUser = {...auth.user, saved: auth.user.saved.filter(id => id !== pos._id)};
    console.log(newUser);

    dispatch({
        type: 'AUTH',
        payload: {
            ...auth, 
            user: newUser
        }
    })

    try {
        const res = await patchDataApi(`unsave/${pos._id}`, null, auth.token);
        console.log(res);
    } catch (err) {
        dispatch({
            type: "ALERT",
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const deletePost = ({ pos, auth, socket }) => async (dispatch) => {
    dispatch({type: POST_TYPES.DELETE_POST, payload: pos});

    try {
        const res = await deleteDataApi(`post/${pos._id}`, auth.token)

        const msg = {
            id: pos._id,
            text: "Post removed",
            recipients: res.data.newPost.user.friends,
            url: `/post/${pos._id}` ,
        }

        dispatch(removeNotify({msg, auth, socket}))
    } catch (err) {
        dispatch({
            type: "ALERT",
            payload: {
                error: err.response.data.msg
            }
        })
    }
}