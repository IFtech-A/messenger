import React from 'react'
import Message  from './Message';
import { Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => {
    return {
        timeDivider: {
            color: theme.palette.grey[400],
            fontSize: '14px',
            textAlign: 'center',
            margin: theme.spacing(1),
            marginBottom: 0
        },
        messageAvatar: {
            width: 40,
            height: 40,
            alignSelf: 'flex-end',
        },
        messageGroup: {
            display: 'flex'
        },
        messageList: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            flexGrow: 1,
        }
    }
})

export const MessageGroup = ({ timeGroup, messages, user }) => {
    
    const classes = useStyles();

    const composer = messages[0]?.user;
    let name = composer && composer?.name ? composer.name : "Unknown";
    let avatarProps = { alt: name };
    const userSelf = user.id === composer?.id;

    if (composer && composer.avatar) {
        avatarProps.src = composer.avatar;
    } else {
        avatarProps.children = name[0];
    }

    return (
        <>
            <div className={classes.timeDivider}>{timeGroup}</div>

            <div className={classes.messageGroup}>
                {
                    !userSelf &&
                    <Avatar
                        {...avatarProps}
                        className={classes.messageAvatar}
                    />
                }
                <div className={classes.messageList}>
                    {messages.map((message) => <Message key={message.id} {...message} userSelf={userSelf} />)}
                </div>
            </div>
        </>
    )
}
