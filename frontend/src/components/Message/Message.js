import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import React from "react";
import "../css/Message/Message.css";

const useStyles = makeStyles((theme) => {
  return {
    message: {
      display: "inline-block",
      wordBreak: "break-all",
      wordWrap: "break-word",
      maxWidth: "80%",
      fontSize: "18px",
      padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
      lineHeight: 1.5,
      fontWeight: 200,
      margin: theme.spacing(0.25, 0.5, 0, 0.5),
      textAlign: (isSelf) => (isSelf ? "end" : "start"),
      alignSelf: (isSelf) => (isSelf ? "flex-end" : "flex-start"),
      color: (isSelf) =>
        isSelf ? "rgba(255,255,255,95%)" : "rgba(0,0,0, 95%)",
      borderRadius: (isSelf) =>
        isSelf ? theme.spacing(3, 0, 0, 3) : theme.spacing(0, 3, 3, 0),
      backgroundColor: (isSelf) =>
        isSelf ? theme.palette.primary.main : "#c7ced1",
      "&:first-child": {
        borderTopRightRadius: (isSelf) => {
          if (isSelf) return theme.spacing(3);
        },
        borderTopLeftRadius: (isSelf) => {
          if (!isSelf) return theme.spacing(3);
        },
      },
      "&:last-child": {
        borderBottomRightRadius: (isSelf) => {
          if (isSelf) return theme.spacing(3);
        },
        borderBottomLeftRadius: (isSelf) => {
          if (!isSelf) return theme.spacing(3);
        },
      },
    },
  };
});

export const Message = ({ id, content, user, userSelf: isSelf }) => {
  const classes = useStyles(isSelf);
  return (
    <div className={classes.message}>
      <Typography>{content}</Typography>
    </div>
  );
};

export default Message;
