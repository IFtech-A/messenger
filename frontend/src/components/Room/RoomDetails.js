import React from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { getRoom, createMessage } from '../../queries/queries';
import UserMinDetails from '../User/UserMinDetails';

const RoomDetails = ({room_id}) => {
    const {loading, error, data} = useQuery(getRoom, {
        variables: {room_id},
    });

    
    const [createMessageFunc, {creating, createError}] = useMutation(createMessage, {
        // update: (cache, result) => {
        //     const newMessage = result.data.message.create;
        //     const cachedData = cache.readQuery({
        //         query: getRoom, variables: {room_id: newMessage.room_id}
        //     });
        //     if (cachedData === null) {
        //         const room = {
        //             readOne: {
        //                 messages: [newMessage]
        //             }
        //         }
        //         cache.writeQuery({
        //             query: getRoom,
        //             variables: {
        //                 room_id: newMessage.room_id,
        //             },
        //             data: {
        //                 room: room, 
        //             }
        //         })
        //     } else {
        //         cache.writeQuery({
        //             query: getRoom,
        //             variables: {
        //                 room_id: newMessage.room_id,
        //             },
        //             data: {
        //                 room : {
        //                     readOne: {
        //                         ...cachedData.room.readOne,
        //                         messages: [...cachedData.room.readOne.messages, newMessage] 
        //                     }
        //                 }
        //             }
        //         })
        //     }
        // },
        refetchQueries:[getRoom]
        
    })

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const sendMessage = (event) => {
        event.preventDefault();

        const inputElement = document.getElementById('message');
        createMessageFunc({variables: {
            message: inputElement.value,
            room_id: room_id,
            user_id: data.roomReadOne.members[0]
        }})
        inputElement.value = '';
    }

    return (
    <div className="list" style={{width:"100%"}} id="room-details">
        <h1>RoomDetails</h1>
        <p>{data.roomReadOne.title}</p>
        <ul>
            {data.roomReadOne.members.map(member => <li key={member}><UserMinDetails user_id={member}/></li>)}
        </ul>
        <ul id="message-list">
            {data.roomReadOne.messages.map(message=> {
                return (
                    <li key={message.id}>
                        <div>
                            {message.content}
                        </div>
                        <p style={{textAlign:'right', color:"grey"}}>{message.created_at}</p>
                    </li>
                )
            })}
        </ul>
        <div className="message-input">
            <input type="text" id="message" />
            <div onClick={(e) =>sendMessage(e)}>
                Send
            </div>
        </div>
        
    </div>
    );
};

export default RoomDetails;