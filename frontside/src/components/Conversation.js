import React from 'react'
import LeftSideMessage from './LeftSideMessage'
import RightSideMessage from './RightSideMessage'
import "../styles/Messages.css"

const Conversation = () => {
  return (
    <div className='messages'>
      <div className="messageleftside">
        <LeftSideMessage />
      </div>

      <div className="messagerightside">
        <RightSideMessage />
      </div>
    </div>
  )
}

export default Conversation
