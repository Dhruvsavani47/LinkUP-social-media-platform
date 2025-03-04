import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';
import ImageIcon from '@mui/icons-material/Image';
import "../styles/Status.css";
import { createPost, updatePost } from '../redux/actions/postActions';
import { ALERT_TYPES } from "../redux/actions/alertActions";
import { imageupload } from '../utils/imageUpload';
import { patchDataApi, postDataApi } from '../utils/fetchDataApi';

const Status = () => {
    const auth = useSelector(state => state.auth);
    const status = useSelector(state => state.status);
    const socket = useSelector(state => state.socket);
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [stream, setStream] = useState(false);
    const [tracks, setTracks] = useState('');
    const dispatch = useDispatch();
    const refVideo = useRef();
    const refCanvas = useRef();

    useEffect(() => {
        if (status.edit) {
            setContent(status.content);
            setImages(status.images);
        }
    }, [status])

    const uploadImages = (e) => {
        const files = [...e.target.files];
        let imageArr = [];

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
                imageArr.push(file);
            }
        }
        setImages([...images, ...imageArr])
        console.log([...images, ...imageArr]);
    }

    const handleUploadInput = () => {
        const imageUploadFunc = document.getElementById('postupload');
        imageUploadFunc.click();
    }

    const handleStream = () => {
        setStream(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    refVideo.current.srcObject = stream;
                    refVideo.current.play();
                    const track = stream.getTracks();
                    setTracks(track[0]);
                }).catch((err) => console.log(err));
        }
    }

    const handleCameraImage = () => {
        const width = refVideo.current.clientWidth;
        const height = refVideo.current.clientWidth;

        refCanvas.current.setAttribute('width', width);
        refCanvas.current.setAttribute('height', height);
        const ctx = refCanvas.current.getContext('2d');
        ctx.drawImage(refVideo.current, 0, 0, width, height);

        const URL = refCanvas.current.toDataURL();
        setImages([...images, { camera: URL }])
    }

    const handleStreamStop = () => {
        tracks.stop();
        setStream(false);
    }

    const deleteImage = (i) => {
        const newArrImage = [...images];
        newArrImage.splice(i, 1);
        setImages(newArrImage);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (images.length === 0) {
            return dispatch({
                type: "ALERT",
                payload: {
                    error: "Add image in post"
                }
            })
        }
        if (status.edit) {
            dispatch(updatePost({ content, images, auth, status, socket }))

            dispatch({
                type: ALERT_TYPES.STATUS,
                payload: {
                    edit: false,
                }
            })
        }
        else {
            dispatch(createPost({ content, images, auth, socket }));
            setContent('');
            setImages([]);

            if (tracks) {
                tracks.stop();
            }
        }

        setContent('');
        setImages([]);

        if (tracks) {
            tracks.stop();
        }
    }


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!content.trim() && images.length === 0) {
    //         return alert("Post cannot be empty. Add content or an image.");
    //     }

    //     console.log(status.edit ? "Updating post..." : "Creating post...");

    //     let media = [];
    //     try {
    //         if (status.edit) {
    //             console.log("Editing post ID:", status._id);

    //             const newImageURL = images.filter(img => !img.secure_url);
    //             const oldImageURL = images.filter(img => img.secure_url);

    //             if (newImageURL.length > 0) {
    //                 media = await imageupload(newImageURL);
    //                 console.log("New images uploaded:", media);
    //             }

    //             const updateData = {
    //                 content,
    //                 images: [...oldImageURL, ...media]
    //             };
    //             console.log("Sending update request with data:", updateData);

    //             const response = await patchDataApi(`post/${status._id}`, updateData, auth.token);

    //             console.log("Update Response:", response);

    //             if (!response || response.error) {
    //                 console.error("Update failed:", response.error);
    //                 return alert("Failed to update post.");
    //             }

    //             dispatch({
    //                 type: ALERT_TYPES.STATUS,
    //                 payload: {
    //                     edit: false,
    //                 }
    //             })
    //         } else {
    //             console.log("Creating a new post...");

    //             if (images.length > 0) {
    //                 media = await imageupload(images);
    //                 console.log("Uploaded images:", media);
    //             }

    //             const response = await postDataApi('posts', { content, images: media }, auth.token);
    //             console.log("Create Post Response:", response);

    //             if (!response || response.error) {
    //                 console.error("Post creation failed:", response.error);
    //                 return alert("Failed to create post.");
    //             }
    //         }

    //         setContent('');
    //         setImages([]);
    //         if (tracks) tracks.stop();
    //     } catch (error) {
    //         console.error("Error in post submission:", error);
    //         alert("An error occurred while submitting the post.");
    //     }
    // };


    const handleDiscard = (e) => {
        e.preventDefault();
        setContent('');
        setImages([]);

        if (tracks) {
            tracks.stop();
        }

        dispatch({
            type: ALERT_TYPES.STATUS,
            payload: {
                edit: false,
            }
        })
    }

    const imageShow = (src) => {
        return (
            <>
                <img src={src} alt="no" className='status-middleimages' />
            </>
        )
    }

    const videoShow = (src) => {
        return (
            <>
                <video controls src={src} alt="no" className='status-middleimages' />
            </>
        )
    }

    return (
        <div className={status.edit ? 'editstatus' : 'status'} >
            <form form onSubmit={handleSubmit} >
                <div className="status-header">
                    <Avatar src={auth.user.avatar} alt="" />
                    <h4>Status</h4>
                </div>

                <div className='status-middle'>
                    <textarea type="text" rows="4" cols="50" placeholder='Share your thoughts...' value={content} onChange={(e) => setContent(e.target.value)} />
                    <small>{content.length}</small>
                </div>

                <div className="status-imagediv">
                    {
                        images && images.map((image, index) => (
                            <div className="status-middleimagecontainer" key={index}>
                                {
                                    image.camera ? imageShow(image.camera) : image.secure_url ?
                                        <>{
                                            image.secure_url && image.secure_url.match(/video/i) ?
                                                videoShow(image.secure_url) :
                                                imageShow(image.secure_url)
                                        }
                                        </> :
                                        <>{
                                            image.type && image.type.match(/video/i) ?
                                                videoShow(URL.createObjectURL(image)) :
                                                imageShow(URL.createObjectURL(image))
                                        }
                                        </>
                                }
                                <span className='status-middleimagedelete' onClick={() => deleteImage(index)}> &times; </span>
                            </div>
                        ))
                    }
                </div>

                {
                    stream &&
                    <div className="status-stream">
                        <video autoPlay muted ref={refVideo}></video>
                        <span onClick={handleStreamStop} style={{ cursor: "pointer" }}>&times;</span>
                        <canvas ref={refCanvas} style={{ display: "none" }} />
                    </div>
                }

                <div className="status-footer">
                    <div className="status-footerright">
                        {
                            stream ? <ImageIcon onClick={handleCameraImage} style={{ cursor: "pointer" }} /> :
                                <>
                                    <CameraOutlinedIcon onClick={handleStream} style={{ cursor: "pointer" }} />
                                    <ImageIcon onClick={handleUploadInput} style={{ cursor: "pointer" }} />
                                </>
                        }
                        <span>
                            <input type="file" id='postupload' onChange={uploadImages} multiple />
                        </span>
                    </div>

                    <div className="status-footerleft">
                        <button className='status-fotterleftdiscard' onClick={handleDiscard}>Discard</button>
                        <button className='status-fotterleftcreate' type="submit">Create</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Status
