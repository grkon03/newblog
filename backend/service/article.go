package service

import (
	"encoding/json"
	"log"
	"mime/multipart"
	"net/http"
	"strconv"

	"github.com/grkon03/newblog/backend/model"
	"github.com/grkon03/newblog/backend/service/repository"
	"github.com/grkon03/newblog/backend/util"
	"github.com/labstack/echo"
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

	articles, err := a.h.GetArticles(from, count)
	if err != nil {
		log.Println(err.Error())
		c.String(http.StatusInternalServerError, err.Error())
		return err
	}

	c.JSON(http.StatusOK, articles)
	return nil
}

type PostArticleRequest struct {
	Article   model.Article           `form:"article"`
	Images    []*multipart.FileHeader `form:"images"`
	Thumbnail *multipart.FileHeader   `form:"thumbnail"`
}

func (a *ArticleAPI) PostArticle(c echo.Context) error {
	claims, err := GetJWTUserClaims(c)
	if err != nil {
		return c.String(http.StatusUnauthorized, "please login")
	}
	writerID := claims.UserID

	var request PostArticleRequest

	err = c.Request().ParseMultipartForm(1 << 24)
	if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}
	form, err := c.MultipartForm()
	if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

	articleJSON := form.Value["article"]
	if len(articleJSON) == 0 {
		return c.String(http.StatusBadRequest, "bad request")
	}
	thumbnailsrc := form.File["thumbnail"]
	if len(thumbnailsrc) == 0 {
		return c.String(http.StatusBadRequest, "bad request")
	}
	imagessrc := form.File["images"]

	err = json.Unmarshal([]byte(articleJSON[0]), &request.Article)
	if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}
	request.Thumbnail = thumbnailsrc[0]
	request.Images = imagessrc

	thumbnaildb, err := a.ih.CreateImage(request.Thumbnail, util.ImageTypeThumbnail)
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}
	content, err := a.ih.UploadImagesInArticle(request.Article.Content, request.Images)
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	err = a.h.CreateArticle(
		request.Article.Title,
		content,
		request.Article.Description,
		true,
		writerID,
		thumbnaildb.ID)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.String(http.StatusOK, "success")
}
