import React from 'react'
import Box from '@mui/material/Box'
import { Avatar, Typography } from '@mui/material'

const Preview = ({ user, chatRoom, onRoomSelected }) => {
    const width =400;
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                p: '5px',
                '&:hover': {
                    backgroundColor: '#ddd',
                    cursor: 'pointer',
                },
                borderRadius: '5px',
                whiteSpace: 'nowrap',
                textOverflow:'ellipsis',
                overflow:'hidden',
                width: `${width}px`,
                textAlign: 'start',
                pb: '10px',                
            }} onClick={(e) => onRoomSelected(chatRoom)}>
            <Avatar
                sx={{
                    marginRight: '5px',
                    alignSelf: 'flex-end'
                }}
                alt={chatRoom.title}
                children={chatRoom.title.toUpperCase()[0]}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%',
                }}>
                <Typography
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: `${width-30}px`
                    }}
                    variant='subtitle1'
                    component='subtitle1'>
                    {chatRoom.title}
                </Typography>
                <Typography
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: `${width-30}px`
                    }}
                    variant='subtitle2'
                    component='subtitle2'>
                    {chatRoom.content}
                </Typography>
            </Box>
        </Box>
    )
}

const ChatsPreview = ({ user, chatRooms, onRoomSelected }) => {
    return (
        <Box mt='10px' sx={{
            width: '95%'
        }}>
            {chatRooms.map(chatRoom => <Preview key={chatRoom.id} user={user} chatRoom={chatRoom} onRoomSelected={onRoomSelected} />)}
        </Box>
    )
}

export default ChatsPreview
