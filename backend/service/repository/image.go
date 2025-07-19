package repository

import "github.com/grkon03/newblog/backend/model"

type ImageHandler interface {
	GetImage(id uint) (*model.Image, error)
}
