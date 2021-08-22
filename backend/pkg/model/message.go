package model

import (
	"time"
)

type Message struct {
	ID       string `json:"id" bson:"_id,omitempty"`
	ParentID string `json:"parentId" bson:"parent_id,omitempty"`
	RoomID   string `json:"roomId" bson:"room_id"`
	UserID   string `json:"userId" bson:"user_id"`

	Type    string `json:"type" bson:"type"`
	Content string `json:"content" bson:"content"`

	CreatedAt time.Time `json:"createdAt" bson:"created_at"`
}

type NewMessage struct {
	RoomID    string `json:"roomID"`
	UserID    string `json:"userID"`
	Content   string `json:"content"`
	CreatedAt string `json:"createdAt"`
}
