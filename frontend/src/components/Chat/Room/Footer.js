import React, { useRef, useState, useEffect } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { IconButton, InputBase, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
    return {
        inputField: {
            padding: theme.spacing(1),
            border: 'none',
            borderRadius: theme.spacing(4),
            boxSizing: 'border-box',
            backgroundColor: theme.palette.grey[300],

        },
        container: {
            backgroundColor: 'transparent',
            padding: theme.spacing(.5),
        }
    }
})

const ChatFooter = ({ onMessageSend }) => {

    const classes = useStyles();
    const [message, setMessage] = useState('')
    const inputRef = useRef();

    const sendMessage = () => {
        if (message === "") {
            return;
        }

        onMessageSend(message)

        setMessage("");

    }

    useEffect(() => {
        inputRef.current.focus()
    }, [inputRef])

    const onChangeInput = (e) => {
        setMessage(e.target.value);
    }
    return (
        <Box component="div" className={classes.container}>
            <InputBase
                className={classes.inputField}
                value={message}
                onChange={onChangeInput}
                aria-label="New message"
                placeholder="Write a message..."
                inputRef={inputRef}
                fullWidth
                endAdornment={
                    <IconButton color="primary" onClick={sendMessage}>
                        <SendIcon />
                    </IconButton>
                } />
        </Box>
    )
}

export default ChatFooter
