import React from 'react'
import Box from '@mui/material/Box'
import Preview from '../Preview/Preview'


const Content = ({ user, chatRooms, onRoomSelected, selectedRoom }) => {
    return (
        <Box mt='10px' mb='10px'>
            {
                chatRooms.map(chatRoom =>
                    <Preview
                        key={chatRoom.id}
                        user={user}
                        chatRoom={chatRoom}
                        selectedRoom={selectedRoom}
                        onRoomSelected={onRoomSelected} />
                )
            }
        </Box>
    )
}

export default Content
