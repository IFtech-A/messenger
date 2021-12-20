import React from "react";
import "../../css/ChatRoom/ChatRoomContainer.css";
import { MessageGroup } from "../../Message/MessagesList";
import ChatHeader from "./Header";
import ChatFooter from "./Footer";
import { makeStyles } from "@mui/styles";
import { Typography, Box } from "@mui/material";

const useStyles = makeStyles((theme) => {
  return {
    roomContainer: {
      display: "flex",
      flexDirection: "column",
      minWidth: "520px",
      flexGrow: 1,
    },
    roomContainerContent: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(1),
      overflow: "auto",
    },
    roomContainerFooter: {},
  };
});

const Chat = ({ user, roomData, messages, onMessageSendClick, loading }) => {
  const classes = useStyles();

  if (loading || !roomData?.roomReadOne) {
    return <Typography color="info">Loading...</Typography>;
  }

  const messageGroups = makeMessageGroupsByMinute(messages);

  return (
    <Box component="section" className={classes.roomContainer}>
      <ChatHeader chatRoom={roomData?.roomReadOne} />
      <div className={classes.roomContainerContent}>
        {messageGroups.map((group, i) => (
          <MessageGroup
            key={i}
            timeGroup={group.time}
            messages={group.messages}
            user={user}
          />
        ))}
      </div>
      <ChatFooter onMessageSend={onMessageSendClick} />
    </Box>
  );
};

const makeMessageGroupsByMinute = (messages) => {
  const messageGroups = [];

  let currentGroup = null;
  let lastGroup = 0;
  let lastUser = "";
  messages.forEach((message) => {
    let currentGroupTime = Math.floor(
      new Date(message.createdAt).getTime() / 1000 / 60
    );
    let currentUser = message.user.id;
    if (currentGroupTime !== lastGroup || lastUser !== currentUser) {
      currentGroup = {
        time: new Date(currentGroupTime * 60 * 1000).toLocaleTimeString(
          "en-US",
          {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        messages: [message],
      };
      messageGroups.push(currentGroup);
    } else {
      currentGroup.messages.push(message);
    }
    lastGroup = currentGroupTime;
    lastUser = currentUser;
  });

  return messageGroups;
};

export default Chat;
