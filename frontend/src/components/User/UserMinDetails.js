import React from 'react';
import { useQuery } from "@apollo/client";
import { getUserMin } from '../../queries/queries';

const UserMinDetails = ({ userID }) => {
    const { loading, error, data } = useQuery(getUserMin, {
        variables: { user_id: userID },
    });

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div id="user-details">
            <p>{data.userReadOne.name}</p>
        </div>
    );
};

export default UserMinDetails;