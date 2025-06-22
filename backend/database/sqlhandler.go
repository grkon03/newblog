package database

import (
	"fmt"

	"github.com/grkon03/newblog/backend/config"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type SQLHandler struct {
	DB *gorm.DB
	*DBPingHandler
}

func NewSQLHandler(db *gorm.DB) *SQLHandler {
	return &SQLHandler{
		db,
		&DBPingHandler{db},
	}
}

func dsn(sc config.SQLConfig) string {
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		sc.User, sc.Pass, sc.Host, sc.Port, sc.Name,
	)
}

func ConnectSQL(sc config.SQLConfig) (*SQLHandler, error) {
	db, err := gorm.Open(mysql.Open(dsn(sc)), &gorm.Config{})
	return NewSQLHandler(db), err
}
