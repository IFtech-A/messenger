package store

import (
	"backend/pkg/model"
	"context"
	"errors"
	"time"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateRoom(room *model.Room) error {
	return s.CreateRoom(room)
}

func (s *Store) CreateRoom(room *model.Room) error {
	collection := s.client.Database(s.conf.DBName).Collection(CollectionChatRooms)
	res, err := collection.InsertOne(context.TODO(), room)
	if err != nil {
		return err
	}
	room.ID = res.InsertedID.(primitive.ObjectID).Hex()
	logrus.Info("created room: ", room.ID)

	return nil
}

func ReadRoom(id string) (*model.Room, error) {
	return s.ReadRoom(id)
}
func (s *Store) ReadRoom(id string) (*model.Room, error) {

	collection := s.client.Database(s.conf.DBName).Collection(CollectionChatRooms)
	room := &model.Room{}
	primID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		switch {
		case err == primitive.ErrInvalidHex:
			return nil, ErrIncorrectID
		default:
			return nil, err
		}
	}

	ctx, cancel := s.ContextWithTimeout()
	defer cancel()
	err = collection.FindOne(ctx, bson.M{"_id": primID}, options.FindOne()).Decode(room)
	if err != nil {
		switch {
		case err == mongo.ErrNoDocuments:
			return nil, ErrNoDocuments
		default:
			return nil, err
		}
	}
	return room, nil
}

func ReadRooms(filter bson.M) ([]*model.Room, error) {
	return s.ReadRooms(filter)
}

func (s *Store) ReadRooms(filter bson.M) ([]*model.Room, error) {
	var rooms []*model.Room
	collection := s.client.Database(s.conf.DBName).Collection(CollectionChatRooms)

	ctx, cancel := s.ContextWithTimeout()
	defer cancel()
	cursor, err := collection.Find(ctx, filter, &options.FindOptions{})
	if err != nil {
		switch {
		case err == mongo.ErrNoDocuments:
			return nil, ErrNoDocuments
		default:
			return nil, err
		}
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		room := new(model.Room)
		err := cursor.Decode(room)
		if err != nil {
			return nil, err
		}
		rooms = append(rooms, room)
	}

	if len(rooms) == 0 {
		return rooms, ErrNoDocuments
	}
	return rooms, nil
}

func UpdateRoom(roomID string, updater bson.M) error {
	return s.UpdateRoom(roomID, updater)
}

func (s *Store) UpdateRoom(roomID string, updater bson.M) error {
	id, err := primitive.ObjectIDFromHex(roomID)
	if err != nil {
		return ErrIncorrectID
	}
	if updater == nil {
		return errors.New("updater is nil")
	}
	collection := s.client.Database(s.conf.DBName).Collection(CollectionChatRooms)
	updater["updated_at"] = time.Now()

	ctx, cancel := s.ContextWithTimeout()
	defer cancel()

	_, err = collection.UpdateByID(ctx, id, bson.M{
		"$set": updater,
	})
	return err
}

func DeleteRoom(roomID string) error {
	return s.DeleteRoom(roomID)
}
func (s *Store) DeleteRoom(roomID string) error {
	if roomID == "" {
		return ErrIncorrectID
	}

	collection := s.client.Database(s.conf.DBName).Collection(CollectionChatRooms)

	ctx, cancel := s.ContextWithTimeout()
	defer cancel()
	_, err := collection.DeleteOne(ctx, bson.M{"_id": roomID}, nil)

	return err
}
