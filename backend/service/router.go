package service

import "github.com/labstack/echo"

func Routing(e *echo.Echo, api API) error {
	a := e.Group("/api")
	{
		ping := a.Group("/ping")
		{
			ping.GET("/", api.Ping)
			ping.GET("/db", api.DBPing)
		}
	}

	return nil
}
