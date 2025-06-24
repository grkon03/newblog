package model

import (
	"log"

	"gorm.io/gorm"
)

func CreateSamples(db *gorm.DB) {
	createUserSamples(db)
	createArticleSamples(db)
}

func createUserSamples(db *gorm.DB) {
	var user1 = User{
		Username: "grkon",
		Passhash: "password",
	}

	res := db.Create(&user1)
	if res.Error != nil {
		log.Fatal(res.Error)
	}
}

func createArticleSamples(db *gorm.DB) {
	var article1 = Article{
		Title: "サンプル記事1",
		Content: `
			# サンプル1
			## こんにちは
			Hello World!
			## さようなら
			Good bye.
		`,
		WriterID: 1,
	}

	var article2 = Article{
		Title: "サンプル記事2",
		Content: `
			# 今日の天気
			## 気分いいね
			今日は晴れです
			## 気分よくないね
			今日は雨です
		`,
		WriterID: 1,
	}

	res := db.Create(&article1)
	if res.Error != nil {
		log.Fatal(res.Error)
	}
	res = db.Create(&article2)
	if res.Error != nil {
		log.Fatal(res.Error)
	}
}
