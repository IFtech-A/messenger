import React, { useState, useEffect,useLayoutEffect } from 'react';
import { useQuery } from "@apollo/client";
import { getAllRooms } from '../../queries/queries';
import RoomDetails from './RoomDetails';
import { Redirect, Link } from 'react-router-dom';
import { RoomListItem } from './RoomListItem';

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
            setLoggedIn(()=>false)
        } else {
            setLoggedIn(()=>true)
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

    if (loggedIn !== undefined && loggedIn === false)  {
        return <Redirect to="/login" />
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
        <nav>
        {localStorage.getItem('userID') !== null &&
          <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
            <p style={{ cursor: 'pointer', marginRight: '15px', width: 'fit-content', padding: '5px' }} onClick={() => { localStorage.removeItem('userID'); localStorage.removeItem('userName'); }}>
              <Link to="/login">Logout</Link>
            </p>
          </div>
        }

      </nav>
        <div className="opening-list">
            
            <div className="list" id="user-list">
                <h1>Rooms</h1>
                <ul >
                    {rooms.map(room => <RoomListItem key={room.id} room={room} roomSelectedFunc={onRoomSelect} />)}
                </ul>
            </div>
            <div style={{ width: "50%" }}>
                {roomSelected && <RoomDetails {...roomSelected} />}
            </div>
        </div>
        </div>
    );
}

export default RoomList;