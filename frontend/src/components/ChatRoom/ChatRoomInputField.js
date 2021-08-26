import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import '../css/ChatRoom/ChatRoomInputField.css';

export const ChatRoomInputField = ({messageProc}) => {
    const [newMessage, setNewMessage] = useState("")

    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage === "") {
            return;
        }

        messageProc(newMessage)

        setNewMessage(() => "");
    }
    return (
        <div className="message-input">
            <span className="message-input-field">
                <input placeholder="Write a message..." type="text" id="message" value={newMessage} onInput={(e) => setNewMessage(() => e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { sendMessage(e); } }} />
            </span>
            <span onClick={sendMessage} className="message-input-field-btn">
                <FontAwesomeIcon icon={faPaperPlane} style={{color: "#880E4f"}}/>
            </span>
        </div>
    )
}
