package main

import (
	"log"
	"net/http"

	"github.com/grkon03/newblog/backend/config"
	"github.com/grkon03/newblog/backend/database"
	"github.com/grkon03/newblog/backend/model"
	"github.com/grkon03/newblog/backend/service"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	appconfig, err := config.NewAppConfig()
	if err != nil {
		log.Fatal(err)
	}

	db, err := database.ConnectSQL(appconfig.SQLConfig)
	if err != nil {
		log.Fatal(err)
	}

	// initialize database
	if appconfig.DoMigration {
		model.Migration(db)
	}
	model.CreateMust(db)
	if appconfig.CreateSamples {
		model.CreateSamples(db)
	}

	// create api
	api := service.NewAPI(db, appconfig.APIConfig)

	// set acceptables
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPost, http.MethodDelete},
	}))

	// routing
	err = service.Routing(e, api)

	if err != nil {
		log.Fatal(err)
	}

	e.Logger.Fatal(e.Start(":3111"))
}
