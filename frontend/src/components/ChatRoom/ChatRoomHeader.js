import React from 'react'
import '../css/ChatRoom/ChatRoomHeader.css';

export const ChatRoomHeader = ({ mainPic, title }) => {
    return (
        <div className="chat-room-header">
            <img alt="roomMainPicture" src="https://www.randomkittengenerator.com/cats/44190.jpg"></img>
            <p>{title}</p>
        </div>
    )
}
