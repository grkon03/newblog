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
		ID:       1,
		Username: "grkon",
		Passhash: "password",
	}

	res := db.FirstOrCreate(&user1)
	if res.Error != nil {
		log.Fatal(res.Error)
	}
}

func createArticleSamples(db *gorm.DB) {
	var article1 = Article{
		ID:    1,
		Title: "サンプル記事1",
		Content: `
			# サンプル1
			## こんにちは
			Hello World!
			## さようなら
			Good bye.
		`,
		Description: `
			一つ目の記事です。
		`,
		WriterID:    1,
		ThumbnailID: 1,
	}

	var article2 = Article{
		ID:    2,
		Title: "サンプル記事2",
		Content: `
			# 今日の天気
			## 気分いいね
			今日は晴れです
			## 気分よくないね
			今日は雨です
		`,
		Description: `
			2つ目の記事です。いぇいいぇい。
		`,
		WriterID:    1,
		ThumbnailID: 1,
	}

	res := db.FirstOrCreate(&article1)
	if res.Error != nil {
		log.Fatal(res.Error)
	}
	res = db.FirstOrCreate(&article2)
	if res.Error != nil {
		log.Fatal(res.Error)
	}
}
