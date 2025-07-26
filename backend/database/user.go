package database

import (
	"github.com/grkon03/newblog/backend/model"
	"gorm.io/gorm"
)

type UserHandler struct {
	DB *gorm.DB
}

func (h *UserHandler) GetUserByUP(username, passhash string) (*model.User, error) {
	var user model.User

	user.Username = username
	user.Passhash = passhash

	err := h.DB.Where(user).First(&user).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}
