import React from 'react'
import Box from '@mui/material/Box'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import { Avatar, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => {
    return {
        roomHeader: {
            backgroundColor: theme.palette.secondary,
            height: theme.spacing(8),
            padding: theme.spacing(1),
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 3px 3px 1px rgba(56,53,53,30%)',
            boxSizing: 'border-box',
        },
        roomHeaderAvatar: {
            marginRight: theme.spacing(2),
            height: '40px',
            width: '40px'
        },
        roomHeaderContent: {
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'flex-start'
        },

    }
})


const ChatHeader = ({ chatRoom }) => {

    const classes = useStyles();

    console.log(chatRoom);
    return (
        <Box className={classes.roomHeader}>
            <Avatar
                className={classes.roomHeaderAvatar}
                alt={chatRoom.title}>
                {chatRoom.title.toUpperCase()[0]}
            </Avatar>
            <Box className={classes.roomHeaderContent}>
                <Typography
                    noWrap
                    variant='h6'
                    component='h3'>
                    {chatRoom.title}
                </Typography>
                <Typography
                    noWrap
                    variant='caption'
                    component='p'>
                    Last time seen 5m ago
                </Typography>
            </Box>
            <IconButton aria-label="Chat information" >
                <MoreHorizRoundedIcon color="primary" />
            </IconButton>
        </Box>
    )
}

export default ChatHeader
