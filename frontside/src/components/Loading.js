import React from 'react'
import "../styles/Loading.css"
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div className='loader'>
        <CircularProgress color="primary" size={60}/>
    </div>
  )
}

export default Loading;
