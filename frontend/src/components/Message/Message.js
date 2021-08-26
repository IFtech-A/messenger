import React from 'react'
import '../css/Message/Message.css'

export const Message = ({ id, content, createdAt, loginUser, user }) => {

    let theUser = {}
    if (user?.id === loginUser.id) {
        theUser.alignSelf = 'flex-end';
        theUser.borderTopRightRadius = 0;
        theUser.borderBottomRightRadius = 0;
        theUser.borderTopLeftRadius = '10px';
        theUser.borderBottomLeftRadius = '10px';
        theUser.marginRight = '5px';
    }

    return (
        <div className="message-list-item" style={theUser}>
            <div className="message-list-item-content">
                {content}
            </div>
            <span id="message-list-item-date">
                {new Date(createdAt).toLocaleString()}
            </span>
        </div>
    )
}
