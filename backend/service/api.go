package service

import (
	"github.com/grkon03/newblog/backend/database"
	"github.com/grkon03/newblog/backend/service/repository"
	"gorm.io/gorm"
)

type API struct {
	sqlh repository.SQLHandler
}

func NewAPI(db *gorm.DB) API {
	return API{
		repository.SQLHandler{
			DBPingHandler:  &database.DBPingHandler{DB: db},
			UserHandler:    &database.UserHandler{DB: db},
			ArticleHandler: &database.ArticleHandler{DB: db},
		},
	}
}
