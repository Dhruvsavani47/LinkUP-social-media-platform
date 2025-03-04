import { Avatar } from '@mui/material'
import React from 'react'
import "../styles/GlobalShortCard.css"

const GlobalShortCard = ({ friend }) => {
    return (
        <div className='globalshortcard'>
            <Avatar className='globalcardcontentavatar' src={friend?.avatar} alt='' />

            <div className="globalshortcardcontentinfo">
                <h4 className='globalshortcardcontentinfofullname'>{friend?.fullname}</h4>
                <h6 className='globalshortcardcontentinfousername'>@{friend?.username}</h6>
            </div>
        </div>
    )
}

export default GlobalShortCard;