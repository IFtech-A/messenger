import React from 'react';
import { useQuery } from "@apollo/client";
import { getRoom } from '../../queries/queries';
import UserMinDetails from '../User/UserMinDetails';

const RoomDetails = ({room_id}) => {
    const {loading, error, data} = useQuery(getRoom, {
        variables: {room_id},
    });

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
    <div id="room-details">
        <h1>RoomDetails</h1>
        <p>{data.room.name}</p>
        <ul>
            {data.room.members.map(member => <li key={member}><UserMinDetails user_id={member}/></li>)}
        </ul>
    </div>
    );
};

export default RoomDetails;