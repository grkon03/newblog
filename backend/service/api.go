package service

import "github.com/grkon03/newblog/backend/database"

type API struct {
	sqlh *database.SQLHandler
}

func NewAPI(sqlh *database.SQLHandler) API {
	return API{sqlh}
}
