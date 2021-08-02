import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { getAllRooms } from '../../queries/queries';
import RoomDetails from './RoomDetails';

const RoomList = () => {
    const {loading, error, data} = useQuery(getAllRooms);
    const [roomSelected, setRoomSelected] = useState();

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const onRoomSelect = (room_id) => {
        setRoomSelected(room_id)
    }

    return (
    <div id="user-list">
        <h1>Rooms</h1>
        <ul >
          {data.rooms.map(room => <li key={room.id} onClick={() => onRoomSelect(room.id)}>{room.name}</li>)}
        </ul>
        {roomSelected && <RoomDetails room_id={roomSelected} />}
    </div>
    );
}

export default RoomList;