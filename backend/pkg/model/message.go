package model

import (
	"time"
)

type Message struct {
	ID       string `json:"id" bson:"_id,omitempty"`
	ParentID string `json:"parent_id" bson:"parent_id,omitempty"`
	RoomID   string `json:"room_id" bson:"room_id"`
	MemberID string `json:"member_id" bson:"member_id"`

	Type    string `json:"type" bson:"type"`
	Content string `json:"content" bson:"content"`

	CreatedAt time.Time `json:"created_at" bson:"created_at"`
}
