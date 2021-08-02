package schema

import (
	"backend/pkg/model"
	"backend/pkg/store"

	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
)

var MessageType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Message",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"parent_id": &graphql.Field{
			Type: graphql.String,
		},
		"room_id": &graphql.Field{
			Type: graphql.String,
		},
		"member_id": &graphql.Field{
			Type: graphql.String,
		},
		"type": &graphql.Field{
			Type: graphql.String,
		},
		"content": &graphql.Field{
			Type: graphql.String,
		},
		"created_at": &graphql.Field{
			Type: graphql.DateTime,
		},
	},
})

var RoomType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Room",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"members": &graphql.Field{
			Type: graphql.NewList(graphql.ID),
		},
		// "member_details": &graphql.Field{
		// 	Type: graphql.NewList(UserType),
		// 	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		// 		room := p.Source.(*model.Room)
		// 		userIDs := make([]primitive.ObjectID, len(room.Members))
		// 		var err error
		// 		for i := range room.Members {
		// 			userIDs[i], err = primitive.ObjectIDFromHex(room.Members[i])
		// 			if err != nil {
		// 				return nil, err
		// 			}
		// 		}
		// 		return store.ReadUsers(bson.M{"_id": bson.M{"$in": userIDs}})
		// 	},
		// },
		"type": &graphql.Field{
			Type: graphql.String,
		},
		"invite_link": &graphql.Field{
			Type: graphql.String,
		},
		"code": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"desc": &graphql.Field{
			Type: graphql.String,
		},
		"photo_main": &graphql.Field{
			Type: graphql.String,
		},
		"photos": &graphql.Field{
			Type: &graphql.List{
				OfType: graphql.String,
			},
		},
		"created_at": &graphql.Field{
			Type: graphql.DateTime,
		},
		"updated_at": &graphql.Field{
			Type: graphql.DateTime,
		},
		"messages": &graphql.Field{
			Type: graphql.NewList(MessageType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if room, ok := p.Source.(*model.Room); ok {
					messages, err := store.ReadRoomMessages(room.ID)
					if err != nil {
						if err == store.ErrNoDocuments {
							return []interface{}{}, nil
						} else {
							return []interface{}{}, err
						}
					} else {
						return messages, nil
					}
				} else {
					return []interface{}{}, nil
				}
			},
		},
	},
})

var UserType = graphql.NewObject(graphql.ObjectConfig{
	Name: "User",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"created_at": &graphql.Field{
			Type: graphql.DateTime,
		},
		"updated_at": &graphql.Field{
			Type: graphql.DateTime,
		},
		"rooms": &graphql.Field{
			Type: graphql.NewList(RoomType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				user := p.Source.(*model.User)
				return store.ReadRooms(bson.M{"members": user.ID})
			},
		},
	},
})
