package database

import (
	"errors"

	"gorm.io/gorm"
)

func IsNoRecord(db *gorm.DB) bool {
	return errors.Is(db.Error, gorm.ErrRecordNotFound)
}
