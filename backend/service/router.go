package service

import "github.com/labstack/echo"

func Routing(e *echo.Echo) error {
	api := e.Group("/api")
	{
		v1 := api.Group("/v1")
		{
			v1.GET("/ping", Ping)
		}
	}

	return nil
}
