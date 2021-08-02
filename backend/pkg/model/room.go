package model

import (
	"strings"
	"time"
)

type Room struct {
	ID          string    `json:"id" bson:"_id,omitempty"`
	Members     []string  `json:"members" bson:"members"`
	Type        string    `json:"type" bson:"type"`
	InviteLink  string    `json:"invite_link" bson:"invite_link"`
	Code        string    `json:"code" bson:"code"`
	Name        string    `json:"name" bson:"name"`
	Description string    `json:"desc" bson:"desc"`
	PhotoMain   string    `json:"photo_main" bson:"photo_main"`
	Photos      []string  `json:"photos" bson:"photos"`
	CreatedAt   time.Time `json:"created_at" bson:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" bson:"updated_at"`
}

func (r *Room) String() string {
	sb := strings.Builder{}

	sb.WriteString("ChatRoom -> ")
	sb.WriteString("Name: ")
	sb.WriteString(r.Name)
	sb.WriteString(" | Description: ")
	sb.WriteString(r.Description)
	sb.WriteString(" | Invite Link: ")
	sb.WriteString(r.InviteLink)
	sb.WriteString(" | ID: ")
	sb.WriteString(r.ID)
	sb.WriteString(" | Created at: ")
	sb.WriteString(r.CreatedAt.Local().Format("Mon Jan 2 15:04:05"))

	return sb.String()
}
