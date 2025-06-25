package service

import (
	"log"
	"net/http"
	"strconv"

	"github.com/grkon03/newblog/backend/database"
	"github.com/labstack/echo"
)

type ArticleAPI struct {
	h *database.ArticleHandler
}

func (a *ArticleAPI) GetArticle(c echo.Context) error {
	id64, err := strconv.ParseUint(c.Param("id"), 10, 64)
	id := uint(id64)

	if err != nil {
		log.Println(err.Error())
		c.String(http.StatusBadRequest, "Bad request")
	}

	article, err := a.h.GetArticle(id)
	if err != nil {
		log.Println(err.Error())
		c.String(http.StatusNotFound, "No such article")
		return err

	}

	c.JSON(http.StatusOK, *article)
	return nil

}
