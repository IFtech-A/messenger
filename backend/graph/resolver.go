package graph

import (
	"backend/pkg/model"
	"time"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

var roomChannels = map[string][]chan *model.Message{}

const defaultTimeFormat = time.RFC1123

type Resolver struct{}
