import React, { useEffect, useState } from 'react'
import { getDataApi } from '../utils/fetchDataApi';
import SavedPostCard from '../components/SavedPostCard';
import { useDispatch } from 'react-redux';

const SavedPost = ({ auth }) => {
    const [savedPosts, setSavedPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.token) {
            getDataApi('savedpostget', auth.token).then(res => {setSavedPosts(res.data.savedPosts)}).catch(err => console.log(err));
        }

        return () => setSavedPosts([])
    }, [auth.token, dispatch]);

    const containerStyle = {
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "16px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      };

    return (
        <div style={containerStyle}>
            {
                savedPosts.map(savedPost => (
                    <SavedPostCard savedPost={savedPost} key={savedPost._id}/>
                ))
            }
        </div>
    )
}

export default SavedPost
