package repository

import "github.com/grkon03/newblog/backend/model"

type DBPingHandler interface {
	CreateDBPing() error
	Ping() model.DBPing
}
