import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { getAllRooms } from '../../queries/queries';
import RoomDetails from './RoomDetails';

const RoomList = () => {
    const { loading, error, data } = useQuery(getAllRooms);
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
        <div className="opening-list">
            <div className="list" id="user-list">
                <h1>Rooms</h1>
                <ul >
                    {data.roomReadAll.map(room => <li key={room.id} onClick={() => onRoomSelect(room.id)}>{room.title}</li>)}
                </ul>
            </div>
            <div style={{width:"50%"}}>
                {roomSelected && <RoomDetails room_id={roomSelected} />}
            </div>
        </div>
    );
}

export default RoomList;