package schema

import (
	"backend/pkg/logger"
	"backend/pkg/store"

	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
)

var rootMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootMutation",
	Fields: graphql.Fields{
		"createUser": &graphql.Field{
			Type:        UserType,
			Description: "Creates a user",
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
			Resolve: createUser,
		},
		"createRoom": &graphql.Field{
			Type:        RoomType,
			Description: "Create a room",
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"desc": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
				"members": &graphql.ArgumentConfig{
					Type: graphql.NewList(graphql.String),
				},
				"photos": &graphql.ArgumentConfig{
					Type: graphql.NewList(graphql.String),
				},
			},
			Resolve: createRoom,
		},
		"updateRoom": &graphql.Field{
			Type:        RoomType,
			Description: "Update a room",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
				"name": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
				"desc": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
				"photo": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				roomID := p.Args["id"].(string)
				room, err := store.ReadRoom(roomID)
				if err != nil {
					return nil, err
				}

				updater := bson.M{}
				if name, ok := p.Args["name"].(string); ok {
					updater["name"] = name
				}
				if desc, ok := p.Args["desc"].(string); ok {
					updater["desc"] = desc
				}
				if photo, ok := p.Args["photo"].(string); ok {
					updater["photo"] = photo
				}

				err = store.UpdateRoom(roomID, updater)
				if err != nil {
					return nil, err
				}
				return room, nil
			},
		},
		"addRoomUser": &graphql.Field{
			Type:        RoomType,
			Description: "Add a user to room",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
				"user_id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull((graphql.ID)),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				roomID := p.Args["id"].(string)
				room, err := store.ReadRoom(roomID)
				if err != nil {
					return nil, err
				}
				newUser := p.Args["user_id"].(string)
				for i := range room.Members {
					if newUser == room.Members[i] {
						logger.Info("User already in romm", newUser, room.Members)
						return room, nil
					}
				}
				room.Members = append(room.Members, newUser)

				err = store.UpdateRoom(roomID, bson.M{"members": room.Members})
				if err != nil {
					return nil, err
				}
				return room, nil
			},
		},
		"createMessage": &graphql.Field{
			Type:        MessageType,
			Description: "Creates a message",
			Args: graphql.FieldConfigArgument{
				"room_id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
				"member_id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
				"content": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: createMessage,
		},
		"deleteRoom": &graphql.Field{
			Type:        graphql.ID,
			Description: "Delete room by id",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: deleteRoom,
		},
	},
})
