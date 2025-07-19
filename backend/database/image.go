package database

import (
	"github.com/grkon03/newblog/backend/model"
	"gorm.io/gorm"
)

type ImageHandler struct {
	DB *gorm.DB
}

func (h *ImageHandler) GetImage(id uint) (*model.Image, error) {
	var im model.Image
	res := h.DB.First(&im)
	if res.Error != nil {
		return nil, res.Error
	}

	return &im, nil
}
