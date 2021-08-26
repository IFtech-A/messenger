import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { getRoom, createMessage, onCreateMessage } from '../../queries/queries';
import { ChatRoomHeader } from './ChatRoomHeader';
import { ChatRoomMessages } from '../Message/MessagesList';
import { ChatRoomInputField } from './ChatRoomInputField';

const ChatRoom = ({ id, title }) => {
    //queries
    const { loading, data } = useQuery(getRoom, { variables: { id } });
    const { data: subData, loading: subLoading } = useSubscription(onCreateMessage, { variables: { id } });
    const [createMessageFunc] = useMutation(createMessage)

    //States
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({})


    useEffect(() => {
        if (!loading) {
            if (data?.roomReadOne.messages) setMessages(m => [...m, ...data.roomReadOne.messages])
        }
        return () => setMessages(() => []);
    }, [loading, data?.roomReadOne]);

    useEffect(() => {
        if (!subLoading && subData?.onMessageCreate) {
            console.log(subData.onMessageCreate)
            subData.onMessageCreate.user = user;
            setMessages(m => [...m, subData.onMessageCreate]);
        }
    }, [subData?.onMessageCreate, subLoading, user])
    
    useLayoutEffect(() => {setUser(()=>{return {id:localStorage.getItem('userID'), name:localStorage.getItem('userName')} })}, [])


    const sendMessage = (message) => {
        if (message === "") {
            return;
        }

        createMessageFunc({
            variables: {
                newMessage: {
                    content: message,
                    roomID: id,
                    userID: user.id,
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
                <ChatRoomMessages messages={messages} user={user} />
                <ChatRoomInputField messageProc={sendMessage} />

            </div>
        );
    }
};

export default ChatRoom;