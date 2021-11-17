import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import '../css/ChatRoom/ChatRoomInputField.css';
import { IconButton, InputBase } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
    return {
        inputField: {
            padding: theme.spacing(1),
            border: '1px solid',
            borderColor: theme.palette.text.secondary,
            borderRadius: '20px',
            backgroundColor: theme.palette.grey[300],
            marginBottom: theme.spacing(1),
        }
    }
})

const ChatFooter = ({ messageProc }) => {

    const classes = useStyles();
    const [newMessage, setNewMessage] = useState('')

    const onInputEnterKey = (e) => {
        if (e.key === 'Enter') {
            return;
        }
        e.preventDefault();
        sendMessage();
    }
    const sendMessage = () => {
        if (newMessage === "") {
            return;
        }

        messageProc(newMessage)

        setNewMessage("");

    }

    const onChangeInput = (e) => {
        console.log(e)
        setNewMessage(e.target.value);
    }
    return (
       
            <InputBase
                className={classes.inputField}
                value={newMessage}
                onChange={onChangeInput}
                aria-label="New message"
                placeholder="Write a message..."
                fullWidth
                endAdornment={
                    <IconButton color="primary">
                        <SendIcon />
                    </IconButton>
                } />
    )
}

export default ChatFooter
