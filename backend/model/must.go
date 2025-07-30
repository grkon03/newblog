package model

import (
	"log"

	"gorm.io/gorm"
)

func CreateMust(db *gorm.DB) {
	createImages(db)
}

func createImages(db *gorm.DB) {
	noimage := Image{
		ID:   1,
		Path: "template/NoImage.png",
	}

	res := db.Save(&noimage)
	if res.Error != nil {
		log.Fatal(res.Error)
	}
}
