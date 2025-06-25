package service

import (
	"net/http"

	"github.com/grkon03/newblog/backend/database"
	"github.com/labstack/echo"
)

type PingAPI struct {
	h *database.DBPingHandler
}

func (a *PingAPI) Ping(c echo.Context) error {
	return c.String(http.StatusOK, "pong")
}

func (a *PingAPI) DBPing(c echo.Context) error {
	return c.String(http.StatusOK, a.h.Ping().Pong)
}
