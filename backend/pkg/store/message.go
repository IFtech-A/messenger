package store

import (
	"backend/pkg/logger"
	"backend/pkg/model"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateMessage(message *model.Message) (*model.Message, error) {
	return s.CreateMessage(message)
}
func (s *Store) CreateMessage(message *model.Message) (*model.Message, error) {

	collection := s.client.Database(s.conf.DBName).Collection(CollectionMessages)
	ctx, cancel := s.ContextWithTimeout()
	defer cancel()

	message.CreatedAt = time.Now()
	res, err := collection.InsertOne(ctx, message)
	if err != nil {
		return message, err
	}

	message.ID = res.InsertedID.(primitive.ObjectID).Hex()
	logger.Info("created message: ", message.ID)

	return message, nil
}

func ReadRoomMessages(roomID string) ([]*model.Message, error) {
	return s.ReadRoomMessages(roomID)
}

func (s *Store) ReadRoomMessages(roomID string) ([]*model.Message, error) {
	var messages []*model.Message
	collection := s.client.Database(s.conf.DBName).Collection(CollectionMessages)

	ctx, cancel := s.ContextWithTimeout()
	defer cancel()
	cursor, err := collection.Find(ctx, bson.M{"room_id": roomID}, &options.FindOptions{
		Sort: bson.M{"created_at": 1},
	})
	if err != nil {
		switch {
		case err == mongo.ErrNoDocuments:
			return nil, ErrNoDocuments
		default:
			return nil, err
		}
	}

	defer cursor.Close(context.TODO())

	for cursor.Next(context.TODO()) {
		message := new(model.Message)
		err := cursor.Decode(message)
		if err != nil {
			return nil, err
		}
		messages = append(messages, message)
	}

	if len(messages) == 0 {
		return messages, ErrNoDocuments
	}
	return messages, nil
}
