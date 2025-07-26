package repository

import "github.com/grkon03/newblog/backend/model"

type UserHandler interface {
	GetUserByUP(username string, passhash string) (*model.User, error)
}
