package database

import (
	models "github.com/grkon03/newblog/backend/model"
	"gorm.io/gorm"
)

func Migration(db *gorm.DB) {
	db.AutoMigrate(&models.DBPing{})
}
