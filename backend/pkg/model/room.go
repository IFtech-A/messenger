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
	Title       string    `json:"title" bson:"title"`
	Description string    `json:"desc" bson:"desc"`
	CreatedAt   time.Time `json:"createdAt" bson:"created_at"`
	UpdatedAt   time.Time `json:"updatedAt" bson:"updated_at"`
}

func (r *Room) String() string {
	sb := strings.Builder{}

	sb.WriteString("ChatRoom -> ")
	sb.WriteString("Name: ")
	sb.WriteString(r.Title)
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

type NewRoom struct {
	ID      string   `json:"id"`
	Members []string `json:"members"`
	Title   string   `json:"title"`
	Desc    string   `json:"desc"`
}
