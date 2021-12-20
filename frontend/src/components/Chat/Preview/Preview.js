import React from 'react'

import { Avatar, Typography, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => {
    return {
        previewStyle: isSelected => {
            return {
                display: 'flex',
                justifyContent: 'flex-start',
                boxSizing: 'border-box',
                '&:hover': {
                    backgroundColor: !isSelected ? '#e9e9e9' : null,
                    cursor: 'pointer',
                },
                borderRadius: '5px',
                textAlign: 'start',
                padding: '5px',
                marginTop: '2px',
                marginBottom: '2px',
                backgroundColor: isSelected ? theme.palette.grey[400] : null,
            }
        },
        previewAvatarStyle: {
            marginRight: '5px',
            alignSelf: 'flex-end',
            height: 56,
            width: 56,
        },
        previewTextBoxStyle: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingRight: theme.spacing(1),
        }
    }
})


const Preview = ({ user, chatRoom, onRoomSelected, selectedRoom }) => {
    const isSelected = selectedRoom === chatRoom.id;
    const classes = useStyles(isSelected);

    console.log(chatRoom, isSelected)

    return (
        <Box
            className={classes.previewStyle} onClick={(e) => onRoomSelected(chatRoom)}>
            <Avatar
                className={classes.previewAvatarStyle}
                alt={chatRoom.title}
                children={chatRoom.title.toUpperCase()[0]}
            />
            <Box
                className={classes.previewTextBoxStyle}>
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
export default Preview
