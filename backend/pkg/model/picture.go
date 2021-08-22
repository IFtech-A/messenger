package model

type Picture struct {
	ID       string `json:"id" bson:"_id,omitempty"`
	Link     string `json:"link" bson:"link"`
	Filename string `json:"filename" bson:"filename"`
}
