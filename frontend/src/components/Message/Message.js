import React from 'react'
import '../css/Message.css'

export const Message = ({ id, content, createdAt }) => {
    return (
        <div className="message-list-item">
            <div className="message-list-item-content">
                {content}
            </div>
            <span id="message-list-item-date">
                {new Date(createdAt).toLocaleString()}
            </span>
        </div>
    )
}
