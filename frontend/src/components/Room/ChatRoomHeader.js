import React from 'react'
import '../css/ChatRoomHeader.css';

export const ChatRoomHeader = ({mainPic, title}) => {
    return (
        <div>
            {/* Header */}
            <div className="chat-room-header">
                <img alt="roomMainPicture" src="https://www.randomkittengenerator.com/cats/44190.jpg"></img>
                <p>{title}</p>
            </div>
        </div>
    )
}
