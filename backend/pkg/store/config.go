package store

import "fmt"

type DBConfig struct {
	User     string `env:"MONGO_USER"`
	Password string `env:"MONGO_PASSWORD"`
	Address  string `env:"MONGO_ADDR"`
	DBName   string `env:"MONGO_DBNAME"`
}

const (
	CollectionChatRooms = "rooms"
	CollectionMessages  = "messages"
	CollectionUsers     = "users"
)

func NewConfig() *DBConfig {
	return &DBConfig{}
}

func (c *DBConfig) ConnString() string {
	return fmt.Sprintf("mongodb+srv://%v:%v@%v/%v?retryWrites=true&w=majority", c.User, c.Password, c.Address, c.DBName)
}
