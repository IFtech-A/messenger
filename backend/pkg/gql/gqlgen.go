package gql

import (
	"backend/graph"
	"backend/graph/generated"
	"backend/pkg/store"
	"log"
	"net/http"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/websocket"
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

func newGraphqlServer() *handler.Server {
	srv := handler.New(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	srv.AddTransport(&transport.Websocket{
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
			HandshakeTimeout: time.Second * 3,
			ReadBufferSize:   1024,
			WriteBufferSize:  1024,
		},
		KeepAlivePingInterval: 10 * time.Second,
	})

	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})

	srv.SetQueryCache(lru.New(1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New(100),
	})

	return srv
}

func (s *Server) configureRouter() {
	gServer := newGraphqlServer()

	s.server.Use(middleware.CORSWithConfig(middleware.CORSConfig{}))
	s.server.GET("/", echo.WrapHandler(playground.Handler("GraphQL playground", "/query")))
	s.server.POST("/query", echo.WrapHandler(gServer))
	s.server.GET("/subscriptions", echo.WrapHandler(gServer))
}

func (s *Server) Start() error {

	if err := s.configureDB(); err != nil {
		logrus.Error(err)
		return err
	}
	defer store.Close()

	s.configureRouter()

	log.Printf("connect to http://%v/ for GraphQL playground", s.config.Addr)
	return s.server.Start(s.config.Addr)
}
