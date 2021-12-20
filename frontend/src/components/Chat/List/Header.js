import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Avatar, Button, IconButton, Popover, Typography } from "@mui/material";
import React from "react";

const iconButtonRounded = {
  color: "rgba(0,0,0, 80%)",
  bgcolor: "#f5f5f5",
  "&:hover": {
    bgcolor: "#e9e9e9",
  },
};

const Header = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const avatarProps = { alt: user.name };
  if (user.avatar) {
    avatarProps.src = user.avatar;
  } else {
    avatarProps.children = user.name.toUpperCase()[0];
  }

  const moreOpen = Boolean(anchorEl);
  const id = moreOpen ? "more-options" : undefined;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        padding: "8px",
        justifyContent: "space-between",
        boxBottomShadow: "1",
        zIndex: "1",
        marginBottom: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          {...avatarProps}
          sx={{
            marginRight: "10px",
            width: 36,
            height: 36,
          }}
        />
        <Typography variant="h5" component="h5">
          Chats
        </Typography>
      </div>
      <IconButton
        aria-describedby={id}
        sx={iconButtonRounded}
        aria-label="user-info"
        onClick={handleClick}
      >
        <MoreHorizRoundedIcon />
      </IconButton>
      <Popover
        id={id}
        open={moreOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Button variant="text" onClick={onLogout}>
          Logout
        </Button>
      </Popover>
    </div>
  );
};

export default Header;
