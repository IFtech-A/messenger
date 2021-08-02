package schema

import (
	"backend/pkg/logger"
	"backend/pkg/model"
	"backend/pkg/store"
	"time"

	"github.com/graphql-go/graphql"
	"github.com/sirupsen/logrus"
)

func createUser(p graphql.ResolveParams) (interface{}, error) {
	user := new(model.User)
	user.Name = p.Args["name"].(string)
	return store.CreateUser(user)
}

func createRoom(p graphql.ResolveParams) (interface{}, error) {

	room := &model.Room{}
	room.Name = p.Args["name"].(string)

	logger.Debug(p.Args)
	if membersInf, ok := p.Args["members"]; ok {
		members := membersInf.([]interface{})
		room.Members = make([]string, len(members))
		for i := range members {
			room.Members[i] = members[i].(string)
		}

	}
	if desc, ok := p.Args["desc"]; ok {
		room.Description = desc.(string)
	}
	room.CreatedAt = time.Now()
	room.UpdatedAt = time.Now()
	err := store.CreateRoom(room)
	if err != nil {
		logrus.Error("createRoom failed. ", err)
		return nil, err
	}
	return room, nil
}

func createMessage(p graphql.ResolveParams) (interface{}, error) {
	message := new(model.Message)
	message.RoomID = p.Args["room_id"].(string)
	message.MemberID = p.Args["member_id"].(string)
	message.Content = p.Args["content"].(string)

	return store.CreateMessage(message)
}

func deleteRoom(p graphql.ResolveParams) (interface{}, error) {
	roomID := p.Args["id"].(string)
	return roomID, store.DeleteRoom(roomID)
}
