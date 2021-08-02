package store

import (
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var s *Store

var (
	ErrIncorrectID = errors.New("store: incorrect id")
	ErrNoDocuments = errors.New("store: documents not found")
)

type Store struct {
	conf    *DBConfig
	client  *mongo.Client
	timeout time.Duration
}

func New(conf *DBConfig) *Store {
	return &Store{
		conf:    conf,
		timeout: 15 * time.Second,
	}
}

func Init(conf *DBConfig) error {
	s = New(conf)
	err := s.Connect()
	if err != nil {
		return err
	}
	return nil
}

func Close() error {
	return s.Disconnect()
}

func (s *Store) ContextWithTimeout() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.TODO(), s.timeout)
}

func (s *Store) Connect() error {

	clientOptions := options.Client().
		ApplyURI(s.conf.ConnString())
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return err
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		return err
	}
	s.client = client
	return nil
}

func (s *Store) Disconnect() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err := s.client.Disconnect(ctx)
	if err != nil {
		return err
	}
	s.client = nil
	return nil

}
