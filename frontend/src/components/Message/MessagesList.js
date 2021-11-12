import React from 'react'
import { Message, NewMessage } from './Message';
import '../css/Message/Message.css'
import { Avatar } from '@mui/material';

export const MessageGroup = ({ timeGroup, messages, user }) => {
    const composer = messages[0]?.user;
    let name = composer ? composer.name : "Unknown";
    let avatarProps = { alt: name };
    const userSelf = user.id === composer?.id;

    if (composer && composer.avatar) {
        avatarProps.src = composer.avatar;
    } else {
        avatarProps.children = name[0];
    }

    return (
        <>
            <div className="message-time-title">{timeGroup}</div>

            <div className="message-group">
                <div className="messages">
                    {messages.map((message) => <NewMessage key={message.id} {...message} userSelf={userSelf} />)}
                </div>
                {
                    !userSelf &&
                    <Avatar
                        {...avatarProps}
                        className="message--avatar"
                    />
                }
            </div>
        </>
    )
}

export const ChatRoomMessages = ({ messages, user }) => {
    return (
        <div className="message-list">
            {messages.map(message => <Message key={message.id} {...message} loginUser={user} />)}
        </div>
    )
}
