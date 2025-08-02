package database

import (
	"github.com/grkon03/newblog/backend/model"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ArticleHandler struct {
	DB *gorm.DB
}

func NewArticleHandler(db *gorm.DB) *ArticleHandler {
	return &ArticleHandler{db}
}

func (h *ArticleHandler) CreateArticle(title, content, description string, isPublished bool, writerID, thumbnailID uint) error {
	return h.DB.Create(&model.Article{
		Title:       title,
		Content:     content,
		Description: description,
		IsPublished: isPublished,
		WriterID:    writerID,
		ThumbnailID: thumbnailID}).Error
}

func (h *ArticleHandler) GetArticle(id uint) (*model.Article, error) {
	var article model.Article
	err := h.DB.Where("id = ?", id).Preload(clause.Associations).First(&article).Error

	return &article, err
}

func (h *ArticleHandler) GetArticles(from, count uint, excludeUnpublished bool) ([]model.Article, error) {
	var articles []model.Article
	where := make(map[string]any)
	if excludeUnpublished {
		where["is_published"] = true
	}
	err := h.DB.Order("created_at desc").Where(where).Offset(int(from)).Limit(int(count)).Preload(clause.Associations).Find(&articles).Error
	return articles, err
}

func (h *ArticleHandler) GetWritersArticles(writerID uint, excludeUnpublished bool, from, count uint) ([]model.Article, error) {
	var articles []model.Article
	where := make(map[string]any)

	where["writer_id"] = writerID
	if excludeUnpublished {
		where["is_published"] = true
	}

	err := h.DB.Order("created_at desc").Where(where).Offset(int(from)).Limit(int(count)).Preload(clause.Associations).Find(&articles).Error
	return articles, err
}
