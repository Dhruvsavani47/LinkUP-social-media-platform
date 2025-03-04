import React from 'react'
import "../styles/Toast.css"

const Toast = ({ msg, bgColor, handleShow }) => {
  return (
    <div className='toast rounded-xl'>
      <div className='toast-header' style={{ backgroundColor: `${bgColor}` }}>
        <div className="toast-headertitle">{msg.title}</div>
        <p onClick={handleShow} className='toast-headerclose'>&times;</p>
      </div>
      <hr className='border-white'/>
      <div className='toast-body' style={{ backgroundColor: `${bgColor}` }}>
        {msg.body}
      </div>
    </div>
  )
}

export default Toast
