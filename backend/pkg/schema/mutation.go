package schema

import (
	"github.com/graphql-go/graphql"
)

var nextResolve = func(p graphql.ResolveParams) (interface{}, error) {
	if p.Source != nil {
		return p.Source, nil
	}
	return struct{}{}, nil
}

var userMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "UserMutation",
	Fields: graphql.Fields{
		"create": &graphql.Field{
			Type:        UserType,
			Description: "Creates a user",
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
			Resolve: createUser,
		},
	},
})

var roomMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "RoomMutation",
	Fields: graphql.Fields{
		"create": &graphql.Field{
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
		"update": &graphql.Field{
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
			Resolve: updateRoom,
		},
		"delete": &graphql.Field{
			Type:        graphql.ID,
			Description: "Delete room by id",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: deleteRoom,
		},
		"addUser": &graphql.Field{
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
			Resolve: addUserToRoom,
		},
	},
})

var messageMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "MessageMutation",
	Fields: graphql.Fields{
		"create": &graphql.Field{
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
	},
})
var rootMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootMutation",
	Fields: graphql.Fields{
		"user": &graphql.Field{
			Type:        userMutation,
			Description: "User based mutations",
			Resolve:     nextResolve,
		},
		"room": &graphql.Field{
			Type:        roomMutation,
			Description: "Room based mutations",
			Resolve:     nextResolve,
		},
		"message": &graphql.Field{
			Type:        messageMutation,
			Description: "Message based mutations",
			Resolve:     nextResolve,
		},
	},
})
