package model

import "gorm.io/gorm"

type DBPing struct {
	gorm.Model
	Pong string
}

type User struct {
	gorm.Model
	Username string
	Passhash string
}

type Article struct {
	gorm.Model
	Title    string
	Content  string
	WriterID uint
	Writer   User `gorm:"foreignKey:WriterID"`
}
