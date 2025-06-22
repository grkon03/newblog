package service

import (
	"net/http"

	"github.com/labstack/echo"
)

func (api *API) Ping(c echo.Context) error {
	return c.String(http.StatusOK, "pong")
}

func (api *API) DBPing(c echo.Context) error {
	return c.String(http.StatusOK, api.sqlh.DBPingHandler.Ping().Pong)
}
