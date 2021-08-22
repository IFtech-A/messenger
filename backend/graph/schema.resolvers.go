package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"backend/graph/generated"
	"backend/pkg/model"
	"backend/pkg/store"
	"context"
	"errors"
	"time"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
)

func (r *messageResolver) CreatedAt(ctx context.Context, obj *model.Message) (string, error) {
	return obj.CreatedAt.Format(defaultTimeFormat), nil
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	user := new(model.User)
	user.Name = input.Name
	return store.CreateUser(user)
}

func (r *mutationResolver) CreateRoom(ctx context.Context, input model.NewRoom) (*model.Room, error) {
	room := &model.Room{
		Members:     input.Members,
		Description: input.Desc,
		Title:       input.Title,
	}
	return store.CreateRoom(room)
}

func (r *mutationResolver) UpdateRoom(ctx context.Context, input model.NewRoom) (*model.Room, error) {
	room, err := store.ReadRoom(input.ID)
	if err != nil {
		return nil, err
	}
	updater := bson.M{
		"desc":    input.Desc,
		"members": input.Members,
		"title":   input.Title,
	}

	err = store.UpdateRoom(input.ID, updater)
	if err != nil {
		return nil, err
	}
	return room, nil
}

func (r *mutationResolver) UpdateRoomAddUser(ctx context.Context, roomID string, userID string) (*model.Room, error) {
	room, err := store.ReadRoom(roomID)
	if err != nil {
		return nil, err
	}
	for i := range room.Members {
		if userID == room.Members[i] {
			logrus.Info("User already in room", userID, room.Members)
			return room, nil
		}
	}
	room.Members = append(room.Members, userID)

	err = store.UpdateRoom(roomID, bson.M{"members": room.Members})
	if err != nil {
		return nil, err
	}
	return room, nil
}

func (r *mutationResolver) DeleteRoom(ctx context.Context, id string) (*model.Room, error) {
	room, err := store.ReadRoom(id)
	if err != nil {
		return nil, err
	}

	return room, store.DeleteRoom(id)
}

func (r *mutationResolver) CreateMessage(ctx context.Context, input model.NewMessage) (*model.Message, error) {
	t, err := time.Parse(time.RFC1123, input.CreatedAt)
	if err != nil {
		logrus.Error("parsing createAt failed: using server now() time")
		t = time.Now()
	}
	message := &model.Message{
		RoomID:    input.RoomID,
		UserID:    input.UserID,
		Content:   input.Content,
		CreatedAt: t,
	}
	newMessage, err := store.CreateMessage(message)
	if err != nil {
		return newMessage, err
	}

	channels := roomChannels[newMessage.RoomID]
	for _, ch := range channels {
		ch <- message
	}

	return newMessage, nil
}

func (r *queryResolver) RoomReadOne(ctx context.Context, id string) (*model.Room, error) {
	return store.ReadRoom(id)
}

func (r *queryResolver) RoomReadAll(ctx context.Context, userID *string) ([]*model.Room, error) {
	filter := bson.M{}
	if userID != nil {
		filter["members"] = *userID
	}
	return store.ReadRooms(filter)
}

func (r *queryResolver) RoomReadMessages(ctx context.Context, id string) ([]*model.Message, error) {
	return store.ReadRoomMessages(id)
}

func (r *queryResolver) UserReadOne(ctx context.Context, id string) (*model.User, error) {
	return store.ReadUser(id)
}

func (r *queryResolver) UserReadAll(ctx context.Context, name *string) ([]*model.User, error) {
	filter := bson.M{}
	if name != nil {
		filter["name"] = *name
	}
	return store.ReadUsers(filter)
}

func (r *queryResolver) UserReadRooms(ctx context.Context, id string) ([]*model.Room, error) {
	return store.ReadRooms(bson.M{"members": id})
}

func (r *roomResolver) Desc(ctx context.Context, obj *model.Room) (string, error) {
	return obj.Description, nil
}

func (r *roomResolver) MainPicture(ctx context.Context, obj *model.Room) (*model.Picture, error) {
	return nil, errors.New("not implemented")
}

func (r *roomResolver) Pictures(ctx context.Context, obj *model.Room) ([]*model.Picture, error) {
	return nil, errors.New("not implemented")
}

func (r *roomResolver) CreatedAt(ctx context.Context, obj *model.Room) (string, error) {
	return obj.CreatedAt.String(), nil
}

func (r *roomResolver) UpdatedAt(ctx context.Context, obj *model.Room) (string, error) {
	return obj.UpdatedAt.String(), nil
}

func (r *roomResolver) LastMessage(ctx context.Context, obj *model.Room) (*model.Message, error) {
	logrus.Info("find last message of room:", obj.ID)
	message, err := store.ReadRoomLastMessage(obj.ID)
	if err != nil {
		logrus.Error(err)
		if err == store.ErrNoDocuments {
			return nil, nil
		} else {
			return nil, err
		}
	} else {
		return message, nil
	}
}

func (r *roomResolver) Messages(ctx context.Context, obj *model.Room) ([]*model.Message, error) {
	messages, err := store.ReadRoomMessages(obj.ID)
	if err != nil {
		if err == store.ErrNoDocuments {
			return []*model.Message{}, nil
		} else {
			return []*model.Message{}, err
		}
	} else {
		return messages, nil
	}
}

func (r *subscriptionResolver) OnMessageCreate(ctx context.Context, roomID string) (<-chan *model.Message, error) {
	receiverChannel := make(chan *model.Message, 1)
	roomChannels[roomID] = append(roomChannels[roomID], receiverChannel)
	return receiverChannel, nil
}

func (r *userResolver) CreatedAt(ctx context.Context, obj *model.User) (string, error) {
	return obj.CreatedAt.Format(defaultTimeFormat), nil
}

func (r *userResolver) UpdatedAt(ctx context.Context, obj *model.User) (string, error) {
	return obj.UpdatedAt.Format(defaultTimeFormat), nil
}

func (r *userResolver) Rooms(ctx context.Context, obj *model.User) ([]*model.Room, error) {
	return store.ReadRooms(bson.M{"members": obj.ID})
}

// Message returns generated.MessageResolver implementation.
func (r *Resolver) Message() generated.MessageResolver { return &messageResolver{r} }

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Room returns generated.RoomResolver implementation.
func (r *Resolver) Room() generated.RoomResolver { return &roomResolver{r} }

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type messageResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type roomResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
