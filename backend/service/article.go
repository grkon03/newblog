package service

import (
	"log"
	"mime/multipart"
	"net/http"
	"strconv"

	"github.com/grkon03/newblog/backend/service/repository"
	"github.com/grkon03/newblog/backend/util"
	"github.com/labstack/echo/v4"
)

type ArticleAPI struct {
	h  repository.ArticleHandler
	ih repository.ImageHandler
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

	articles, err := a.h.GetArticles(from, count, true)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return err
	}

	c.JSON(http.StatusOK, articles)
	return nil
}

type EditArticleRequest struct {
	Title       string                  `form:"title"`
	Content     string                  `form:"content"`
	Description string                  `form:"description"`
	Publish     bool                    `form:"publish"`
	Thumbnail   *multipart.FileHeader   `form:"thumbnail"`
	Images      []*multipart.FileHeader `form:"images"`
}

func (a *ArticleAPI) PostArticle(c echo.Context) error {
	claims, err := GetJWTUserClaims(c)
	if err != nil {
		return c.String(http.StatusUnauthorized, "please login")
	}
	writerID := claims.UserID

	var request EditArticleRequest
	err = c.Bind(&request)
	if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

	thumbnaildb, err := a.ih.CreateImage(request.Thumbnail, util.ImageTypeThumbnail)
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}
	content, err := a.ih.UploadImagesInArticle(request.Content, request.Images)
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	err = a.h.CreateArticle(
		request.Title,
		content,
		request.Description,
		request.Publish,
		writerID,
		thumbnaildb.ID)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.String(http.StatusOK, "success")
}

// ?from=xxx&count=xxx
func (a *ArticleAPI) GetMyArticles(c echo.Context) error {
	claims, err := GetJWTUserClaims(c)
	if err != nil {
		return c.String(http.StatusUnauthorized, "please login")
	}
	writerID := claims.UserID

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

	articles, err := a.h.GetWritersArticles(writerID, false, from, count)

	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, articles)
}

func (a *ArticleAPI) PutArticle(c echo.Context) error {
	claims, err := GetJWTUserClaims(c)
	if err != nil {
		return c.String(http.StatusUnauthorized, "Please login")
	}
	writerID := claims.UserID

	id64, err := strconv.ParseUint(c.Param("id"), 10, 64)
	id := uint(id64)

	if err != nil {
		log.Println(err.Error())
		c.String(http.StatusBadRequest, "bad request")
		return err
	}

	var req EditArticleRequest

	err = c.Bind(&req)
	if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

	var thumbnailID uint
	if req.Thumbnail != nil {
		thumbnaildb, err := a.ih.CreateImage(req.Thumbnail, util.ImageTypeThumbnail)
		if err != nil {
			return c.String(http.StatusBadRequest, err.Error())
		}
		thumbnailID = thumbnaildb.ID
	}

	err = a.h.UpdateArticle(id, req.Title, req.Content, req.Description, req.Publish, writerID, thumbnailID)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusOK)
}

func (a *ArticleAPI) DeleteArticle(c echo.Context) error {
	claims, err := GetJWTUserClaims(c)
	if err != nil {
		return c.String(http.StatusUnauthorized, "Please login")
	}
	writerID := claims.UserID

	id64, err := strconv.ParseUint(c.Param("id"), 10, 64)
	id := uint(id64)

	if err != nil {
		log.Println(err.Error())
		c.String(http.StatusBadRequest, "Bad request")
		return err
	}

	err = a.h.DeleteArticle(id, writerID)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusOK)
}
