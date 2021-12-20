import Chat from "../containers/ChatRoom";
import ChatList from "../components/Chat/List";
import { getAllRooms } from "../queries/queries";
import { CssBaseline } from "@mui/material";
import { selectUser } from "../store/user/userSlice";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";

const ChatPage = () => {
    const user = useSelector(selectUser);

  console.log(user);
  // queries
  const {
    loading: roomsLoading,
    error,
    data: roomsData,
  } = useQuery(getAllRooms, {
    variables: {
      userID: user.id,
    },
  });

  // states
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (!roomsLoading && roomsData?.roomReadAll)
      setRooms([...roomsData.roomReadAll]);
    return () => {
      setRooms([]);
    };
  }, [roomsLoading, roomsData]);

  const onRoomSelected = (room) => {
    setSelectedRoom(room);
    console.log("onChatSelected", {
      room,
    });
  };

  if (roomsLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <main
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
    >
      <CssBaseline />
      {/* Chats */}
      <ChatList
        user={user}
        chatRooms={rooms}
        selectedRoom={selectedRoom?.id}
        onRoomSelected={onRoomSelected}
      />
      {/* Chat */}
      {selectedRoom && (
        <Chat
          user={user}
          roomID={selectedRoom.id}
          roomTitle={selectedRoom.title}
        />
      )}
    </main>
  );
};

export default ChatPage;
