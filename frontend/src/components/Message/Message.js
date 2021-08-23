import React from 'react'

export const Message = ({ id, content, createdAt }) => {
    return (
        <div>
            <div>
                {content}
            </div>
            <p style={{ textAlign: 'right', color: "grey" }}>{new Date(createdAt).toLocaleString()}</p>
        </div>
    )
}
