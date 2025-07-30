package database

import (
	"log"
	"mime/multipart"
	"regexp"
	"strconv"

	"github.com/grkon03/newblog/backend/model"
	"github.com/grkon03/newblog/backend/util"
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

func (h *ImageHandler) CreateImage(image *multipart.FileHeader, it util.ImageType) (*model.Image, error) {
	var im model.Image

	path, err := util.StoreImage(image, it)
	if err != nil {
		return nil, err
	}

	im.Path = path
	err = h.DB.Create(&im).Error
	if err != nil {
		return nil, err
	}

	return &im, nil
}

func (h *ImageHandler) UploadImagesInArticle(content string, images []*multipart.FileHeader) (string, error) {
	nameidMap := map[string]uint{}

	rexp, err := regexp.Compile(`!\[.*\]\((local/.*)\)`)
	if err != nil {
		log.Fatal(err.Error())
	}

	for _, imgsrc := range images {
		imgdb, err := h.CreateImage(imgsrc, util.ImageTypeInArticle)
		if err != nil {
			return "", err
		}

		nameidMap[imgsrc.Filename] = imgdb.ID
	}

	updated := rexp.ReplaceAllFunc([]byte(content), func(match []byte) []byte {
		name := string([]rune(string(match[1]))[6:])
		id, ok := nameidMap[name]
		if !ok {
			id = 1 // no image
		}
		return []byte("/image/" + strconv.Itoa(int(id)))
	})

	return string(updated), nil
}
