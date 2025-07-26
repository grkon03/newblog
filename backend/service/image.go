package service

import (
	"errors"
	"mime/multipart"
	"net/http"
	"strconv"

	"github.com/grkon03/newblog/backend/service/repository"
	"github.com/grkon03/newblog/backend/util"
	"github.com/labstack/echo"
	"gorm.io/gorm"
)

type ImageAPI struct {
	h repository.ImageHandler
}

func (a *ImageAPI) GetImage(c echo.Context) error {
	id64, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "parameter 'id' must be specified as an integer ")
	}
	id := uint(id64)

	image, err := a.h.GetImage(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.String(http.StatusNoContent, "image with such id is not registered")
		} else {
			return c.String(http.StatusInternalServerError, err.Error())
		}
	}

	return c.File(util.GetImageDirectPath(image.Path))
}

type PostImageRequest struct {
	Keywords string                `form:"keywords"`
	Type     util.ImageType        `form:"type"`
	image    *multipart.FileHeader // form:"image" cannot use c.Bind
}

func (a *ImageAPI) PostImage(c echo.Context) error {
	_, err := GetJWTUserClaims(c)
	if err != nil {
		return c.String(http.StatusUnauthorized, err.Error())
	}

	var req PostImageRequest

	err = c.Bind(&req)
	if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

	req.image, err = c.FormFile("image")
	if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

	status, path, err := util.UploadImage(req.image, req.Type)
	if err != nil {
		return c.String(status, err.Error())
	}

	img, err := a.h.PostImage(path, req.Keywords)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, img)
}
