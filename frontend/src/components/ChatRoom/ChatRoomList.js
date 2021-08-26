import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useQuery } from "@apollo/client";
import { getAllRooms } from '../../queries/queries';
import ChatRoom from './ChatRoom';
import { Redirect, Link } from 'react-router-dom';
import { RoomListItem } from './ChatRoomListItem';
import '../css/ChatRoom/ChatRoomContainer.css'
import '../css/ChatRoom/ChatRoomList.css'
import '../css/ChatRoom/ChatRoomInputField.css'

const RoomList = () => {
    const { loading, error, data } = useQuery(getAllRooms, {
        variables: {
            userID: localStorage.getItem('userID')
        }
    });
    const [rooms, setRooms] = useState([]);
    const [roomSelected, setRoomSelected] = useState();
    const [loggedIn, setLoggedIn] = useState(undefined)

    useLayoutEffect(() => {
        const userID = localStorage.getItem('userID')
        const userName = localStorage.getItem('userName')
        if (!userID || !userName) {
            localStorage.removeItem('userID')
            localStorage.removeItem('userName')
            setLoggedIn(() => false)
        } else {
            setLoggedIn(() => true)
        }
    }, [])

    useEffect(() => {
        if (!loading && data?.roomReadAll) setRooms(() => [...data.roomReadAll])
        return () => {
            setRooms(() => [])
        }
    }, [loading, data?.roomReadAll])

    const onRoomSelect = (room) => {
        setRoomSelected(() => room)
    }

    if (loggedIn !== undefined && loggedIn === false) {
        return <Redirect to="/login" />
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="chatView">
            <nav>
                {localStorage.getItem('userID') !== null &&
                    <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                        <p style={{ cursor: 'pointer', marginRight: '15px', width: 'fit-content', padding: '5px' }} onClick={() => { localStorage.removeItem('userID'); localStorage.removeItem('userName'); }}>
                            <Link to="/login">Logout</Link>
                        </p>
                    </div>
                }

            </nav>
            <div className="chatRoomContainer">

                <div className="chatRoomList">
                    <div className="chatRoomListHeader">
                        <span>Chats</span>
                    </div>
                    <div style={{minHeight:'720px', maxHeight:'720px'}}>
                        {rooms.map(room => <RoomListItem key={room.id} room={room} roomSelectedFunc={onRoomSelect} />)}
                    </div>
                    <div className="message-input" style={{ justifySelf:'flex-start'}}>

                    </div>
                </div>
                <div style={{ flex:1 }}>
                    {roomSelected && <ChatRoom {...roomSelected} />}
                </div>
            </div>
        </div>
    );
}

export default RoomList;