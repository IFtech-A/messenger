import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { getRoom, createMessage, onCreateMessage } from '../../queries/queries';
import { ChatRoomHeader } from './ChatRoomHeader';
import { ChatRoomMessages } from './ChatRoomMessages';
import { ChatRoomInputField } from './ChatRoomInputField';

const RoomDetails = ({ id, title }) => {
    //queries
    const { loading, data } = useQuery(getRoom, { variables: { id } });
    const { data: subData, loading: subLoading } = useSubscription(onCreateMessage, { variables: { id } });
    const [createMessageFunc] = useMutation(createMessage)

    //States
    const [messages, setMessages] = useState([]);
    // const [newMessage, setNewMessage] = useState("")
    const [userID, setUserID] = useState('')


    useEffect(() => {
        if (!loading) {
            if (data?.roomReadOne.messages) setMessages(m => [...m, ...data.roomReadOne.messages])
        }
        return () => setMessages(() => []);
    }, [loading, data?.roomReadOne]);

    useEffect(() => {
        if (!subLoading && subData?.onMessageCreate) setMessages(m => [...m, subData.onMessageCreate])
    }, [subData?.onMessageCreate, subLoading])
    
    useLayoutEffect(() => {setUserID(()=>localStorage.getItem('userID'))}, [])


    const sendMessage = (message) => {
        // e.preventDefault();
        if (message === "") {
            return;
        }

        createMessageFunc({
            variables: {
                newMessage: {
                    content: message,
                    roomID: id,
                    userID: userID,
                    createdAt: new Date()
                }
            }
        });
    }

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (

            <div className="chat-room" >
                <ChatRoomHeader title={title} mainPic="https://www.randomkittengenerator.com/cats/44190.jpg" />
                <ChatRoomMessages messages={messages} />
                <ChatRoomInputField messageProc={sendMessage} />

            </div>
        );
    }
};

export default RoomDetails;