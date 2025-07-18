package model

import (
	"time"
)

type DBPing struct {
	Pong string
}

type User struct {
	ID        uint      `gorm:"primarykey" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Username  string    `json:"username"`
	Passhash  string    `json:"passhash"`
}

type Article struct {
	ID          uint      `gorm:"primarykey" json:"id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Title       string    `json:"title"`
	Content     string    `json:"content"`
	Description string    `json:"description"`
	WriterID    uint      `json:"writer_id"`
	Writer      User      `gorm:"foreignKey:WriterID" json:"writer"`
}
