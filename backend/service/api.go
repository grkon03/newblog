package service

import (
	"github.com/grkon03/newblog/backend/database"
	"gorm.io/gorm"
)

type API struct {
	PingAPI
	ArticleAPI
}

func NewAPI(db *gorm.DB) API {
	return API{
		PingAPI:    PingAPI{&database.DBPingHandler{DB: db}},
		ArticleAPI: ArticleAPI{&database.ArticleHandler{DB: db}},
	}
}
