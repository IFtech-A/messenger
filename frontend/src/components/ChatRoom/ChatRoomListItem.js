import React from 'react'
import '../css/ChatRoom/ChatRoomListItem.css'
export const RoomListItem = ({ room, roomSelectedFunc }) => {

    return (
        <div className="room-list-item" onClick={() => roomSelectedFunc(room)}>
            <span style={{ color: 'whitesmoke', marginLeft: '5px', alignSelf:'flex-start' }}>{room.title}</span>
            {room.lastMessage &&
                <div className="room-list-item-content">
                    <div style={{ display: 'flex' }}>
                        <span style={{ color: 'blue', marginRight: "10px" }}>{room.lastMessage.user.name}: </span>
                        <span>{room.lastMessage.content}</span>
                    </div>
                    <span style={{ color: 'darkgrey' }}>{new Date(room.lastMessage?.createdAt).toLocaleTimeString()}</span>
                </div>}
        </div>
    )
}
