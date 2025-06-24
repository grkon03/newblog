package main

import (
	"log"

	"github.com/grkon03/newblog/backend/config"
	"github.com/grkon03/newblog/backend/database"
	"github.com/grkon03/newblog/backend/model"
	"github.com/grkon03/newblog/backend/service"
	"github.com/labstack/echo"
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

	if appconfig.DoMigration {
		model.Migration(db)
	}
	if appconfig.CreateSamples {
		model.CreateSamples(db)
	}

	api := service.NewAPI(db)

	e := echo.New()
	err = service.Routing(e, api)

	if err != nil {
		log.Fatal(err)
	}

	e.Logger.Fatal(e.Start(":3111"))
}
