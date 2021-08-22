import React from 'react';
import { useQuery } from "@apollo/client";
import { getUser } from '../../queries/queries';

const UserDetails = ({user_id}) => {
    const {loading, error, data} = useQuery(getUser, {
        variables: {user_id},
    });

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
    <div className="list" id="user-details">
        <h1>UserDetails</h1>
        <p>{data.userReadOne.name}</p>
        <ul>
            {data.userReadOne.rooms.map(room => <li key={room.ID}>{room.title}</li>)}
        </ul>
    </div>
    );
};

export default UserDetails;