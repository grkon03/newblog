package main

import (
	"log"

	"github.com/grkon03/newblog/backend/config"
	"github.com/grkon03/newblog/backend/database"
	"github.com/grkon03/newblog/backend/service"
	"github.com/labstack/echo"
)

func main() {
	apiconfig, err := config.NewAppConfig()
	if err != nil {
		log.Fatal(err)
	}

	sqlh, err := database.ConnectSQL(apiconfig.SQLConfig)
	if err != nil {
		log.Fatal(err)
	}

	sqlh.Migration()

	api := service.NewAPI(sqlh)

	e := echo.New()
	err = service.Routing(e, api)

	if err != nil {
		log.Fatal(err)
	}

	e.Logger.Fatal(e.Start(":3111"))
}
