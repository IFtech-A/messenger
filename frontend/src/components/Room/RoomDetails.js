import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { getRoom, createMessage, onCreateMessage } from '../../queries/queries';
import UserMinDetails from '../User/UserMinDetails';
import { Message } from '../Message/Message';

const RoomDetails = ({ id, title }) => {
    //queries
    const { loading, data } = useQuery(getRoom, { variables: { id } });
    const { data: subData, loading: subLoading } = useSubscription(onCreateMessage, { variables: { id } });
    const [createMessageFunc] = useMutation(createMessage)

    //States
    const [room, setRoom] = useState({ id, title, members: [] })
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")


    useEffect(() => {
        if (!loading) {
            if (data?.roomReadOne) setRoom(room => { return { ...room, members: data.roomReadOne.members, title: data.roomReadOne.title } })
            if (data?.roomReadOne.messages) setMessages(m => [...m, ...data.roomReadOne.messages])
        }
        return () => setMessages(() => []);
    }, [loading, data?.roomReadOne]);

    useEffect(() => {
        if (!subLoading && subData?.onMessageCreate) setMessages(m => [...m, subData.onMessageCreate])
    }, [subData?.onMessageCreate, subLoading])

    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage === "") {
            return;
        }

        createMessageFunc({
            variables: {
                newMessage: {
                    content: newMessage,
                    roomID: id,
                    userID: room.members[0],
                    createdAt: new Date()
                }
            }
        });
        setNewMessage(() => "");
    }

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (

            <div className="list" style={{ width: "100%" }} id="room-details">
                <h1>RoomDetails</h1>
                <p>{title}</p>
                <ul>
                    {room.members.map(member => <li key={member}><UserMinDetails userID={member} /></li>)}
                </ul>
                <ul id="message-list">
                    {messages.map(message => <li key={message.id}><Message {...message} /></li>)}
                </ul>
                <div className="message-input">
                    <input type="text" id="message" value={newMessage} onInput={(e) => setNewMessage(() => e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { sendMessage(e); } }} />
                    <div onClick={sendMessage}>Send</div>
                </div>

            </div>
        );
    }
};

export default RoomDetails;