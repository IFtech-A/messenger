import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router';
import Chat from '../components/Chat/Room/Chat';
import ChatList from '../components/Chat/List'
import { getAllRooms } from '../queries/queries';
import { CssBaseline } from '@mui/material';


const MainApp = ({user}) => {
    // queries
    const { loading: roomsLoading, error, data: roomsData } = useQuery(getAllRooms, {
        variables: {
            userID: user.id
        }
    })

    // states
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);


    useEffect(() => {
        if (!roomsLoading && roomsData?.roomReadAll) setRooms([...roomsData.roomReadAll])
        return () => {
            setRooms([])
        }
    }, [roomsLoading, roomsData]);

    const onRoomSelected = (room) => {
        setSelectedRoom(room);
        console.log('onChatSelected', {
            room
        })
    }

    if (roomsLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    return (
        <main style={{
            display: 'flex',
            width: '100%',
            height: '100vh',
        }}>
            <CssBaseline />
            {/* Chats */}
            <ChatList user={user} chatRooms={rooms} selectedRoom={selectedRoom?.id} onRoomSelected={onRoomSelected} />
            {/* Chat */}
            {selectedRoom && <Chat user={user} roomID={selectedRoom.id} roomTitle={selectedRoom.title} />}
        </main>
    )
}

const Main = () => {

    const userID = localStorage.getItem('userID');
    const username = localStorage.getItem('userName');
    if (!userID || !username) {
        localStorage.removeItem('userID');
        localStorage.removeItem('userName');
        return <Redirect to="/login" />
    }

    const user = {
        id: userID,
        name: username,
        avatar: null
    }

    return (
        <MainApp user={user}/>
    )
}

export default Main
