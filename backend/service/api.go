package service

import (
	"github.com/grkon03/newblog/backend/config"
	"github.com/grkon03/newblog/backend/database"
	"gorm.io/gorm"
)

type API struct {
	PingAPI    PingAPI
	ArticleAPI ArticleAPI
	ImageAPI   ImageAPI
	UserAPI    UserAPI
	JWT        JWT
}

func NewAPI(db *gorm.DB, config config.APIConfig) API {
	return API{
		PingAPI:    PingAPI{&database.DBPingHandler{DB: db}},
		ArticleAPI: ArticleAPI{&database.ArticleHandler{DB: db}, &database.ImageHandler{DB: db}},
		ImageAPI:   ImageAPI{&database.ImageHandler{DB: db}},
		UserAPI:    NewUserAPI(&database.UserHandler{DB: db}, config.JWTKey),
		JWT:        NewJWT(config.JWTKey),
	}
}
