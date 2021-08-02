import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { getAllUsers } from '../../queries/queries';
import UserDetails from './UserDetails';

const UserList = () => {
    const {loading, error, data} = useQuery(getAllUsers);
    const [userSelected, setUserSelected] = useState();

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const onUserSelect = (user_id) => {
        setUserSelected(user_id)
    }

    return (
    <div id="user-list">
        <h1>Users</h1>
        <ul >
          {data.users.map(user => <li key={user.id} onClick={() => onUserSelect(user.id)}>{user.name}</li>)}
        </ul>
        {userSelected && <UserDetails user_id={userSelected} />}
    </div>
    );
}

export default UserList;