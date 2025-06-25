package database

import (
	"github.com/grkon03/newblog/backend/model"
	"gorm.io/gorm"
)

type ArticleHandler struct {
	DB *gorm.DB
}

func NewArticleHandler(db *gorm.DB) *ArticleHandler {
	return &ArticleHandler{db}
}

func (h *ArticleHandler) CreateArticle(title string, content string, writerID uint) error {
	return h.DB.Create(&model.Article{Title: title, Content: content, WriterID: writerID}).Error
}

func (h *ArticleHandler) GetArticle(id uint) (*model.Article, error) {
	var article model.Article
	err := h.DB.Where("id = ?", id).First(&article).Error

	return &article, err
}
