import React from 'react'
import Box from '@mui/material/Box'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import { Avatar, IconButton, Typography } from '@mui/material'


const ChatHeader = ({ chatRoom }) => {
    console.log(chatRoom);
    return (
        <div className='chat--header'>
            <Avatar
                sx={{
                    marginRight: '10px',
                    height: 40,
                    width: 40,
                }}
                alt={chatRoom.title}
                children={chatRoom.title.toUpperCase()[0]}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    width: '-webkit-fill-available',
                }}>
                <Typography
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                    variant='subtitle1'
                    component='subtitle1'>
                    {chatRoom.title}
                </Typography>
                <Typography
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                    variant='subtitle2'
                    component='subtitle2'>
                    Last time seen 5m ago
                </Typography>
            </Box>
            <MoreHorizRoundedIcon aria-label="Chat information" color="primary" sx={{
                margin: '5px',
                '&:hover': {
                    cursor: 'pointer',
                }
            }} />
        </div>
    )
}

export default ChatHeader
