import MoreHorizRoundedIcon  from '@mui/icons-material/MoreHorizRounded'
import { Avatar, IconButton, Typography } from '@mui/material'
import React from 'react'

const Header = ({ user }) => {

    const avatarProps = { alt: user.name }
    if (user.avatar) {
        avatarProps.src = user.avatar
    } else {
        avatarProps.children = user.name.toUpperCase()[0];
    }
    return (
        <div style={{
            position: 'relative',
            display:'flex',
            padding: '8px',
            justifyContent:'space-between',
            boxBottomShadow: '1',
            zIndex: '1',
            marginBottom: '5px'
            }}>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Avatar 
                {...avatarProps}
                sx={{
                    marginRight: '10px', 
                }} />
                <Typography variant='h3' component='h3'>Chats</Typography>
            </div>
            <IconButton aria-label='user-info'>
                <MoreHorizRoundedIcon />
            </IconButton>
        </div>
    )
}

export default Header
