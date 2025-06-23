package database

import (
	"fmt"

	"github.com/grkon03/newblog/backend/config"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func dsn(sc config.SQLConfig) string {
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		sc.User, sc.Pass, sc.Host, sc.Port, sc.Name,
	)
}

func ConnectSQL(sc config.SQLConfig) (*gorm.DB, error) {
	return gorm.Open(mysql.Open(dsn(sc)), &gorm.Config{})
}
