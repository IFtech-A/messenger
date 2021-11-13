import React, { useState, useEffect } from 'react'
import '../css/ChatRoom/ChatRoomContainer.css'
import { MessageGroup } from '../Message/MessagesList'
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { createMessage, getRoom, onCreateMessage } from '../../queries/queries';
import ChatHeader from './Header';
import ChatFooter from './Footer';

const Chat = ({ user, roomID, roomTitle }) => {

    // queries
    const { loading, data: roomData } = useQuery(getRoom, { variables: { id: roomID } });
    const { data: subscriptionData, loading: subscriptionLoading } = useSubscription(onCreateMessage, { variables: { id: roomID } });
    const [createMessageFunc] = useMutation(createMessage);

    // states
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        if (!loading) {
            if (roomData?.roomReadOne.messages) setMessages(() => [...roomData.roomReadOne.messages])
        }
        return () => {
            setMessages(() => []);
        }
    }, [loading, roomData?.roomReadOne]);

    useEffect(() => {
        if (!subscriptionLoading && subscriptionData?.onMessageCreate) {
            console.log(subscriptionData.onMessageCreate);
            setMessages(m => [...m, subscriptionData.onMessageCreate]);
        }
        return () => {

        }
    }, [subscriptionData?.onMessageCreate, subscriptionLoading]);

    const messageGroups = makeMessageGroupsByMinute(messages);

    const onSendMesssageClick = (message) => {
        if (message.length === 0) {
            return;
        }

        createMessageFunc({
            variables: {
                newMessage: {
                    content: message,
                    roomID,
                    userID: user.id,
                    createdAt: new Date(),
                }
            }
        });
    }

    return (
        <section className='chat--container'>
            {roomData && roomData.roomReadOne && <ChatHeader chatRoom={roomData?.roomReadOne} />}
            <div className='chat--body'>
                {
                    loading ?
                        <div>Loading...</div>
                        :
                        messageGroups.map((group, i) =>
                            <MessageGroup key={i} timeGroup={group.time} messages={group.messages} user={user} />
                        )
                }
            </div>
            <div className='chat--footer' style={{backgroundColor:'transparent'}}>
                <ChatFooter />
            </div>
        </section>
    )
}


const makeMessageGroupsByMinute = (messages) => {
    const messageGroups = [];

    let currentGroup = null;
    let lastGroup = 0;
    let lastUser = '';
    messages.forEach(message => {
        let currentGroupTime = Math.floor(new Date(message.createdAt).getTime() / 1000 / 60);
        let currentUser = message.user.id;
        if (currentGroupTime !== lastGroup || lastUser !== currentUser) {
            currentGroup = {
                time: new Date(currentGroupTime * 60 * 1000).toLocaleTimeString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                messages: [message]
            }
            messageGroups.push(currentGroup);
        } else {
            currentGroup.messages.push(message);
        }
        lastGroup = currentGroupTime;
        lastUser = currentUser;
    });

    return messageGroups;
}

export default Chat
