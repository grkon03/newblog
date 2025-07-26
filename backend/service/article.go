package service

import (
	"log"
	"net/http"
	"strconv"

	"github.com/grkon03/newblog/backend/model"
	"github.com/grkon03/newblog/backend/service/repository"
	"github.com/labstack/echo"
)

type ArticleAPI struct {
	h repository.ArticleHandler
}

func (a *ArticleAPI) GetArticle(c echo.Context) error {
	id64, err := strconv.ParseUint(c.Param("id"), 10, 64)
	id := uint(id64)

	if err != nil {
		log.Println(err.Error())
		c.String(http.StatusBadRequest, "Bad request")
		return err
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

// ?from=xxx&count=xxx
func (a *ArticleAPI) GetArticles(c echo.Context) error {
	var from, count uint = 0, 0

	param := c.QueryParam("from")
	if param != "" {
		from64, err := strconv.ParseInt(param, 10, 64)
		if err != nil {
			log.Println(err)
			c.String(http.StatusBadRequest, "Bad request")
			return err
		}
		from = uint(from64)
	}

	param = c.QueryParam("count")
	if param != "" {
		count64, err := strconv.ParseInt(param, 10, 64)
		if err != nil {
			log.Println(err)
			c.String(http.StatusBadRequest, "Bad request")
			return err
		}
		count = uint(count64)
	}

	articles, err := a.h.GetArticles(from, count)
	if err != nil {
		log.Println(err.Error())
		c.String(http.StatusInternalServerError, err.Error())
		return err
	}

	c.JSON(http.StatusOK, articles)
	return nil
}

func (a *ArticleAPI) PostArticle(c echo.Context) error {
	claims, err := GetJWTUserClaims(c)
	if err != nil {
		return c.String(http.StatusUnauthorized, "please login")
	}
	writerID := claims.UserID

	var article model.Article

	err = c.Bind(&article)
	if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

	err = a.h.CreateArticle(
		article.Title,
		article.Content,
		article.Description,
		writerID,
		article.ThumbnailID)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.String(http.StatusOK, "success")
}
