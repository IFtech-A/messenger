import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  createMessage,
  getRoom,
  onCreateMessage,
} from "../../queries/queries";
import ChatComponent from "../../components/Chat/Room/Chat";

const Chat = ({ user, roomID, roomTitle }) => {
  // queries
  const { loading, data: roomData } = useQuery(getRoom, {
    variables: { id: roomID },
  });
  const { data: subscriptionData, loading: subscriptionLoading } =
    useSubscription(onCreateMessage, { variables: { id: roomID } });
  const [createMessageFunc] = useMutation(createMessage);

  // states
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (roomData?.roomReadOne.messages)
        setMessages(() => [...roomData.roomReadOne.messages]);
    }
    return () => {
      setMessages(() => []);
    };
  }, [loading, roomData?.roomReadOne]);

  useEffect(() => {
    if (!subscriptionLoading && subscriptionData?.onMessageCreate) {
      console.log(subscriptionData.onMessageCreate, user);
      if (user.id === subscriptionData.onMessageCreate.userID) {
        subscriptionData.onMessageCreate.user = user;
      } else {
        subscriptionData.onMessageCreate.user = { id: subscriptionData.userID };
      }
      setMessages((m) => [...m, subscriptionData.onMessageCreate]);
    }
    return () => {};
  }, [subscriptionData, subscriptionLoading, user]);

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
        },
      },
    });
  };

  return (
    <ChatComponent
      user={user}
      roomData={roomData}
      loading={loading}
      messages={messages}
      onMessageSendClick={onSendMesssageClick}
    />
  );
};

export default Chat