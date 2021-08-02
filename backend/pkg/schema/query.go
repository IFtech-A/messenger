package schema

import (
	"backend/pkg/store"

	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
)

var rootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuery",
	Fields: graphql.Fields{
		"room": &graphql.Field{
			Type:        RoomType,
			Name:        "RoomQuery",
			Description: "Get single room",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return store.ReadRoom(p.Args["id"].(string))
			},
		},
		"rooms": &graphql.Field{
			Type: graphql.NewList(RoomType),
			Name: "ReadRooms",
			Args: graphql.FieldConfigArgument{},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return store.ReadRooms(bson.M{})
			},
		},
		"room_messages": &graphql.Field{
			Type:        graphql.NewList(MessageType),
			Name:        "ReadRoomMessages",
			Description: "Reads room messages using room id",
			Args: graphql.FieldConfigArgument{
				"room_id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				roomID := p.Args["room_id"].(string)
				return store.ReadRoomMessages(roomID)
			},
		},
		"user_rooms": &graphql.Field{
			Type:        graphql.NewList(RoomType),
			Name:        "Find user rooms",
			Description: "Find rooms where user is a member",
			Args: graphql.FieldConfigArgument{
				"user_id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				userID := p.Args["user_id"].(string)
				return store.ReadRooms(bson.M{"members": userID})
			},
		},
		"user": &graphql.Field{
			Type:        UserType,
			Name:        "Read user info",
			Description: "Read user information",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				id := p.Args["id"].(string)
				return store.ReadUser(id)
			},
		},
		"users": &graphql.Field{
			Type:        graphql.NewList(UserType),
			Name:        "Read users",
			Description: "Read all users",
			Args:        graphql.FieldConfigArgument{},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return store.ReadUsers(bson.M{})
			},
		},
	},
})
