import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { getAllRooms } from '../../queries/queries';
import RoomDetails from './RoomDetails';

const RoomList = () => {
    const { loading, error, data } = useQuery(getAllRooms);
    const [rooms, setRooms] = useState([]);
    const [roomSelected, setRoomSelected] = useState();


    useEffect(() => {
        if (!loading && data?.roomReadAll) setRooms(() => [...data.roomReadAll])
        return () => {
            setRooms(() => [])
        }
    }, [loading, data?.roomReadAll])

    const onRoomSelect = (room) => {
        setRoomSelected(() => room)
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="opening-list">
            <div className="list" id="user-list">
                <h1>Rooms</h1>
                <ul >
                    {rooms.map(room => <li key={room.id} onClick={() => onRoomSelect(room)}>{room.title}</li>)}
                </ul>
            </div>
            <div style={{ width: "50%" }}>
                {roomSelected && <RoomDetails {...roomSelected} />}
            </div>
        </div>
    );
}

export default RoomList;