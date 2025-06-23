package database

import (
	model "github.com/grkon03/newblog/backend/model"
	"gorm.io/gorm"
)

type DBPingHandler struct {
	DB *gorm.DB
}

func NewDBPingHandler(db *gorm.DB) *DBPingHandler {
	return &DBPingHandler{db}
}

func (h *DBPingHandler) CreateDBPing() error {
	ping := model.DBPing{Pong: "pong"}
	db := h.DB.Create(&ping)
	return db.Error
}

func (h *DBPingHandler) Ping() model.DBPing {
	var result model.DBPing
	if IsNoRecord(h.DB.First(&result)) {
		h.CreateDBPing()
	}

	return result
}
