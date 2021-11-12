import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router';
import Chat from '../../components/Chat/Chat';
import Chats from '../../components/Chats/Chats'
import { getAllRooms } from '../../queries/queries';


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

    // const chatHeaders = [
    //     { id: '1', title: 'Test User', preview: 'Test message was sent by Test User. Check it out!!!!', time: '01/02/2021 12:45 PM' },
    //     { id: '2', title: 'User Assistant', preview: 'Have you checked what I have sent? Check it out!!!!', time: '09/11/2021 4:21 AM' }
    // ]

    // const chatMessages = [
    //     { id: '1', user: { id: '1', name: 'John Doe' }, createdAt: '05/25/2020, 12:18 PM', content: "I don't know how no one spotted that before they put the picture up" },
    //     { id: '2', user: { id: '1', name: 'John Doe' }, createdAt: '05/25/2020, 12:18 PM', content: "but it's the firts thing Zach said when he saw it and now I can't unsee it" },
    //     { id: '3', user: { id: '2', name: 'Alice' }, createdAt: '05/25/2020, 12:18 PM', content: "Maybe that's what was actually happening" },
    //     { id: '4', user: { id: '1', name: 'John Doe' }, createdAt: '05/25/2020, 12:20 PM', content: "god I hope not" },
    //     { id: '5', user: { id: '2', name: 'Alice' }, createdAt: '05/25/2020, 12:20 PM', content: 'Yes' },
    //     { id: '6', user: { id: '1', name: 'John Doe' }, createdAt: '05/25/2020, 05:08 PM', content: "you joining?" },
    //     { id: '7', user: { id: '1', name: 'John Doe' }, createdAt: '05/25/2020, 10:56 PM', content: "you free this weekend for a video chat or movie night or jackbox" },
    //     { id: '8', user: { id: '2', name: 'Alice' }, createdAt: '05/26/2020, 11:01 AM', content: "I'd love to but we are out of town this weekend." },
    //     { id: '9', user: { id: '1', name: 'John Doe' }, createdAt: '12/24/2020, 06:48 PM', content: "it's CHRISTMAAAAS" },
    //     { id: '10', user: { id: '2', name: 'Alice' }, createdAt: '12/24/2020, 06:48 PM', content: "Merry christmas!" },
    //     { id: '11', user: { id: '2', name: 'Alice' }, createdAt: '12/24/2020, 06:48 PM', content: "Wish you good day!" },
    //     { id: '12', user: { id: '1', name: 'John Doe' }, createdAt: '12/24/2020, 06:48 PM', content: "Merry Christmas!" },
    // ]
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
            {/* Chats */}
            <Chats user={user} chatRooms={rooms} onRoomSelected={onRoomSelected} />
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
