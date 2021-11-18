import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import React from 'react'
import Header from './Header'
import Content from './Content'
import Search from './Search'

const useStyles = makeStyles(theme => {
    return {
        chatListContainer : {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: "360px",
            padding: '5px',
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0, 0, 0, 50%)',
        }
    }
})

const ChatList = (props) => {

    const classes = useStyles();

    return (
        <Box className={classes.chatListContainer}>
            
            {/* chats header */}
            <Header user={props.user}/>
            {/* chats search */}
            <Search />
            {/* chats' preview */}
            <Content {...props} />
        </Box>
    )
}

export default ChatList
