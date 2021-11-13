import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import '../css/ChatRoom/ChatRoomInputField.css';
import CustomInput from '../InputField/InputField';


const ChatFooter = ({ messageProc }) => {
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
        setNewMessage(e.target.value);
    }
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <div style={{ margin: '0 8px', width: '-webkit-fill-available' }}>
                <CustomInput
                    placeholder="Write a message..."
                    value={newMessage}
                    onChange={onChangeInput}
                    onKeyPress={onInputEnterKey} />
            </div>
            <SendIcon
                sx={{
                    width: '36px',
                    height: '36px',
                    mr: '10px',
                    p: '4px'
                }}
                color="primary"
                onClick={sendMessage} />
        </div>
    )
}

export default ChatFooter
