package repository

import (
	"github.com/grkon03/newblog/backend/model"
)

type ImageHandler interface {
	GetImage(id uint) (*model.Image, error)
	PostImage(path, keywords string) (*model.Image, error)
}
