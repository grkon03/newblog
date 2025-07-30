package repository

import (
	"mime/multipart"

	"github.com/grkon03/newblog/backend/model"
	"github.com/grkon03/newblog/backend/util"
)

type ImageHandler interface {
	GetImage(id uint) (*model.Image, error)
	CreateImage(image *multipart.FileHeader, it util.ImageType) (*model.Image, error)
	UploadImagesInArticle(content string, images []*multipart.FileHeader) (string, error)
}
