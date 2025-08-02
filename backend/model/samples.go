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
		Passhash: "4b7479cd6f9d9efbd936b1b963dbec6a2a2961e89684d76d13b0e4abefaaa77f",
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
		IsPublished: true,
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
		IsPublished: true,
		WriterID:    1,
		ThumbnailID: 1,
	}

	content, err = os.ReadFile(samplesDir + "/article3.md")

	if err != nil {
		log.Fatal(err.Error())
	}

	var article3 = Article{
		ID:      3,
		Title:   "サンプル記事3",
		Content: string(content),
		Description: `
			3つ目の記事です。編集中。
		`,
		IsPublished: false,
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
	res = db.Save(&article3)
	if res.Error != nil {
		log.Fatal(res.Error)
	}
}
