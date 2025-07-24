package model

import (
	"log"
	"os"

	"gorm.io/gorm"
)

const samplesDir = "/nwb/samples"

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

	res := db.Save(&user1)
	if res.Error != nil {
		log.Fatal(res.Error)
	}
}

func createArticleSamples(db *gorm.DB) {
	content, err := os.ReadFile(samplesDir + "/article1.md")
	if err != nil {
		log.Fatal(err.Error())
	}

	var article1 = Article{
		ID:      1,
		Title:   "サンプル記事1",
		Content: string(content),
		Description: `
			1つ目の記事です。
		`,
		WriterID:    1,
		ThumbnailID: 1,
	}

	content, err = os.ReadFile(samplesDir + "/article2.md")

	if err != nil {
		log.Fatal(err.Error())
	}

	var article2 = Article{
		ID:      2,
		Title:   "サンプル記事2",
		Content: string(content),
		Description: `
			2つ目の記事です。いぇいいぇい。
		`,
		WriterID:    1,
		ThumbnailID: 1,
	}

	res := db.Save(&article1)
	if res.Error != nil {
		log.Fatal(res.Error)
	}
	res = db.Save(&article2)
	if res.Error != nil {
		log.Fatal(res.Error)
	}
}
