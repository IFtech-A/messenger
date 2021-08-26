import React from 'react'
import { Message } from './Message';
import '../css/Message/Message.css'

export const ChatRoomMessages = ({messages, user}) => {
    return (
        <div className="message-list">
            {messages.map(message => <Message key={message.id} {...message} loginUser={user}/>)}
        </div>
    )
}
