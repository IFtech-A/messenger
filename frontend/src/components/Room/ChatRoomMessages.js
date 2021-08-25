import React from 'react'
import { Message } from '../Message/Message';


export const ChatRoomMessages = ({messages}) => {
    return (
        <div className="message-list">
            {messages.map(message => <Message key={message.id} {...message} />)}
        </div>
    )
}
