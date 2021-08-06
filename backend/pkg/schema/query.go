package schema

import (
	"backend/pkg/store"

	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
)

var roomQueries = graphql.NewObject(graphql.ObjectConfig{
	Name:        "RoomQuery",
	Description: "Room based queries",
	Fields: graphql.Fields{
		"readOne": &graphql.Field{
			Type:        RoomType,
			Name:        "RoomQuery",
			Description: "Get single room",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.ID,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return store.ReadRoom(p.Args["id"].(string))
			},
		},
		"readAll": &graphql.Field{
			Type: graphql.NewList(RoomType),
			Name: "ReadRooms",
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return store.ReadRooms(bson.M{})
			},
		},
		"readHavingMember": &graphql.Field{
			Type:        graphql.NewList(RoomType),
			Name:        "ReadRoomsHavingMember",
			Description: "Find rooms where a given user is a member",
			Args: graphql.FieldConfigArgument{
				"user_id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				userID := p.Args["user_id"].(string)
				return store.ReadRooms(bson.M{"members": userID})
			},
		},
		"readRoomMessages": &graphql.Field{
			Type:        graphql.NewList(MessageType),
			Name:        "ReadRoomMessages",
			Description: "Reads the room messages",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				roomID := p.Args["id"].(string)
				return store.ReadRoomMessages(roomID)
			},
		},
	},
})

var userQueries = graphql.NewObject(graphql.ObjectConfig{
	Name:        "UserQueries",
	Description: "User based queries",
	Fields: graphql.Fields{
		"readOne": &graphql.Field{
			Type:        UserType,
			Name:        "Read user info",
			Description: "Read user information",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				id := p.Args["id"].(string)
				return store.ReadUser(id)
			},
		},
		"readAll": &graphql.Field{
			Type:        graphql.NewList(UserType),
			Name:        "Read users",
			Description: "Read all users",
			Args:        graphql.FieldConfigArgument{},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return store.ReadUsers(bson.M{})
			},
		},
		"readUserRooms": &graphql.Field{
			Type:        graphql.NewList(RoomType),
			Name:        "Read user rooms",
			Description: "Find rooms where a given user is a member",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				userID := p.Args["id"].(string)
				return store.ReadRooms(bson.M{"members": userID})
			},
		},
	},
})

var rootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuery",
	Fields: graphql.Fields{
		"room": &graphql.Field{
			Type:        roomQueries,
			Name:        "RoomQueries",
			Description: "Room based queries",
			Resolve:     nextResolve,
		},
		"user": &graphql.Field{
			Type:        userQueries,
			Name:        "UserQueries",
			Description: "User based queries",
			Resolve:     nextResolve,
		},
	},
})
