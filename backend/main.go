package main

import (
	"log"

	"github.com/grkon03/newblog/backend/service"
	"github.com/labstack/echo"
)

func main() {
	e := echo.New()

	err := service.Routing(e)

	if err != nil {
		log.Fatal(err)
	}
}
