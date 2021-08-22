package gql

import (
	"backend/graph"
	"backend/graph/generated"
	"backend/pkg/store"
	"log"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/sirupsen/logrus"
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

func (s *Server) configureDB() error {
	if s.config.DBConfig == nil {
		s.config.DBConfig = store.NewConfig()
	}
	return store.Init(s.config.DBConfig)
}

func (s *Server) Start() error {

	if err := s.configureDB(); err != nil {
		logrus.Error(err)
		return err
	}
	defer store.Close()

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	s.server.Any("/", echo.WrapHandler(playground.Handler("GraphQL playground", "/query")))
	s.server.Any("/query", echo.WrapHandler(srv), middleware.CORS())

	log.Printf("connect to http://%v/ for GraphQL playground", s.config.Addr)
	return s.server.Start(s.config.Addr)
}
