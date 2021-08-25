import React from 'react'
import '../css/RoomListItem.css'
export const RoomListItem = ({room, roomSelectedFunc}) => {

    
    return (
        <li key={room.id} onClick={() => roomSelectedFunc(room)}>
            <div className="room-list-item">
                <p style={{color:'black'}}>{room.title}</p>
                {room.lastMessage && 
                <div className="room-list-item-content">
                    <div style={{display:'flex'}}>
                        <p style={{color:'blue', marginRight:"10px"}}>{room.lastMessage.user.name}: </p>
                        <p>{room.lastMessage.content}</p>
                    </div>
                    <p style={{color:'grey'}}>{new Date(room.lastMessage?.createdAt).toLocaleTimeString()}</p>
                </div>}
            </div>
        </li>
    )
}
