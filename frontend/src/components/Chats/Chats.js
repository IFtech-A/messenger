import React from 'react'
import Header from '../ChatsHeader/Header'
import ChatsPreview from '../ChatsPreview/Preview'
import Search from '../ChatsSearch/Search'

const Chats = (props) => {

    return (
        <section style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minWidth: '400px',
            maxWidth: '720px',
            padding: '5px',
            borderRight: '1px solid rgba(0, 0, 0, 50%)',
        }}>
            
            {/* chats header */}
            <Header user={props.user}/>
            {/* chats search */}
            <Search />
            {/* chats' preview */}
            <ChatsPreview {...props} />
        </section>
    )
}

export default Chats
