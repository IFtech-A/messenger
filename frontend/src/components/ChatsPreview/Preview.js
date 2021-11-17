import React from 'react'
import Box from '@mui/material/Box'
import { Avatar, Typography } from '@mui/material'
import { Calculate } from '@mui/icons-material'

const previewStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
    '&:hover': {
        bgcolor: '#e9e9e9',
        cursor: 'pointer',
    },
    width: 'calc(100% - 16px)',
    borderRadius: '5px',
    textAlign: 'start',
    p: '5px',
    mt: '2px',
    mb: '2px',
}

const previewAvatarStyle = {
    marginRight: '5px',
    alignSelf: 'flex-end',
    height: 56,
    width: 56,
}

const previewTextBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'flex-start',
    width: '-webkit-fill-available',
} 


const Preview = ({ user, chatRoom, onRoomSelected }) => {
    return (
        <Box
            sx={previewStyle} onClick={(e) => onRoomSelected(chatRoom)}>
            <Avatar
                sx={previewAvatarStyle}
                alt={chatRoom.title}
                children={chatRoom.title.toUpperCase()[0]}
            />
            <Box
                sx={previewTextBoxStyle}>
                <Typography
                    noWrap
                    variant='subtitle1'
                    component='p'>
                    {chatRoom.title}
                </Typography>
                <Typography
                    noWrap
                    variant='caption'
                    component='p'>
                    {chatRoom?.lastMessage.content}
                </Typography>
             </Box>
        </Box>
    )
}

const ChatsPreview = ({ user, chatRooms, onRoomSelected }) => {
    return (
        <Box mt='10px' mb='10px'>
            {chatRooms.map(chatRoom => <Preview key={chatRoom.id} user={user} chatRoom={chatRoom} onRoomSelected={onRoomSelected} />)}
        </Box>
    )
}

export default ChatsPreview
