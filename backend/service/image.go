package service

import (
	"errors"
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
