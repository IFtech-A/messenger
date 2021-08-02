package store

import (
	"backend/pkg/model"
	"errors"
	"time"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateUser(user *model.User) (*model.User, error) {
	return s.CreateUser(user)
}

func (s *Store) CreateUser(user *model.User) (*model.User, error) {
	collection := s.client.Database(s.conf.DBName).Collection(CollectionUsers)
	user.CreatedAt = time.Now()
	ctx, cancel := s.ContextWithTimeout()
	defer cancel()
	res, err := collection.InsertOne(ctx, user)
	if err != nil {
		return nil, err
	}
	user.ID = res.InsertedID.(primitive.ObjectID).Hex()
	logrus.Info("created user: ", user.ID)

	return user, nil
}

func ReadUser(id string) (*model.User, error) {
	return s.ReadUser(id)
}
func (s *Store) ReadUser(id string) (*model.User, error) {

	collection := s.client.Database(s.conf.DBName).Collection(CollectionUsers)
	user := &model.User{}
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
	err = collection.FindOne(ctx, bson.M{"_id": primID}, options.FindOne()).Decode(user)
	if err != nil {
		switch {
		case err == mongo.ErrNoDocuments:
			return nil, ErrNoDocuments
		default:
			return nil, err
		}
	}
	return user, nil
}

func ReadUsers(filter bson.M) ([]*model.User, error) {
	return s.ReadUsers(filter)
}

func (s *Store) ReadUsers(filter bson.M) ([]*model.User, error) {
	var users []*model.User
	collection := s.client.Database(s.conf.DBName).Collection(CollectionUsers)

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
		user := new(model.User)
		err := cursor.Decode(user)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	if len(users) == 0 {
		return users, ErrNoDocuments
	}
	return users, nil
}

func UpdateUser(user *model.User, updater bson.M) error {
	return s.UpdateUser(user, updater)
}

func (s *Store) UpdateUser(user *model.User, updater bson.M) error {
	if user.ID == "" {
		return ErrIncorrectID
	}
	userID, err := primitive.ObjectIDFromHex(user.ID)
	if err != nil {
		return ErrIncorrectID
	}
	if updater == nil {
		return errors.New("updater is nil")
	}
	collection := s.client.Database(s.conf.DBName).Collection(CollectionUsers)
	updater["updated_at"] = time.Now()

	ctx, cancel := s.ContextWithTimeout()
	defer cancel()
	_, err = collection.UpdateByID(ctx, userID, bson.M{
		"$set": updater,
	})
	return err
}

func DeleteUser(user *model.User) error {
	return s.DeleteUser(user)
}
func (s *Store) DeleteUser(user *model.User) error {
	if user.ID == "" {
		return ErrIncorrectID
	}

	userID, err := primitive.ObjectIDFromHex(user.ID)
	if err != nil {
		return ErrIncorrectID
	}

	collection := s.client.Database(s.conf.DBName).Collection(CollectionUsers)

	ctx, cancel := s.ContextWithTimeout()
	defer cancel()
	_, err = collection.DeleteOne(ctx, bson.M{"_id": userID}, nil)

	return err
}
