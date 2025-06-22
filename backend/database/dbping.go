package database

import (
	"gorm.io/gorm"
)

type DBPingHandler struct {
	DB *gorm.DB
}

func NewDBPingHandler(db *gorm.DB) *DBPingHandler {
	return &DBPingHandler{db}
}

type DBPing struct {
	gorm.Model
	Pong string
}

func (h *DBPingHandler) CreateDBPing() error {
	ping := DBPing{gorm.Model{}, "pong"}
	db := h.DB.Create(&ping)
	return db.Error
}

func (h *DBPingHandler) Ping() DBPing {
	var result DBPing
	if IsNoRecord(h.DB.First(&result)) {
		h.CreateDBPing()
	}

	return result
}
