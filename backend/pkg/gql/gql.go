package gql

import (
	"backend/pkg/logger"
	"backend/pkg/schema"
	"backend/pkg/store"
	"os"

	"github.com/graphql-go/handler"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Server struct {
	config *Config
	server *echo.Echo
}

func New(conf *Config) *Server {
	return &Server{
		config: conf,
		server: echo.New(),
	}
}

func (s *Server) configureLogger() error {
	if err := logger.SetLevel(s.config.LogConfig.Level); err != nil {
		return err
	}
	if s.config.LogConfig.Output != "" {
		switch s.config.LogConfig.Output {
		case "stdout":
			logger.SetOutput(os.Stdout)
		case "stderr":
			logger.SetOutput(os.Stderr)
		default:
			f, err := os.Open(s.config.LogConfig.Output)
			if err != nil {
				return err
			}
			logger.SetOutput(f)
		}
	}
	return nil
}
func (s *Server) configureRoute() {

	s.server.Use(middleware.CORS())
	s.server.Any("/graphql", echo.WrapHandler(handler.New(&handler.Config{
		Schema:     &schema.Schema,
		Pretty:     true,
		Playground: true,
		// GraphiQL: true,
	})))
}
func (s *Server) configureDB() error {
	if s.config.DBConfig == nil {
		s.config.DBConfig = store.NewConfig()
	}
	return store.Init(s.config.DBConfig)
}

func (s *Server) Start() error {

	if err := s.configureLogger(); err != nil {
		logger.Error(err)
	}
	s.configureRoute()
	if err := s.configureDB(); err != nil {
		logger.Error(err)
		return err
	}
	defer store.Close()

	return s.server.Start(s.config.Addr)
}
