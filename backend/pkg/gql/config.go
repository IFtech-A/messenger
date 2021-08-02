package gql

import "backend/pkg/store"

type Log struct {
	Level  string `yaml:"level"`
	Output string `yaml:"output"`
}

type Config struct {
	Addr       string `yaml:"bind_addr"`
	ServerCert string `yaml:"server_cert"`
	ServerKey  string `yaml:"server_key"`
	LogConfig  *Log   `yaml:"log"`
	DBConfig   *store.DBConfig
}

func NewConfig() *Config {
	return &Config{
		Addr: ":8080",
		LogConfig: &Log{
			Level: "debug",
		},
		DBConfig: store.NewConfig(),
	}
}
