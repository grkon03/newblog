package repository

import "github.com/grkon03/newblog/backend/model"

type ArticleHandler interface {
	CreateArticle(title, content, description string, writerID, thumbnailID uint) error
	GetArticle(id uint) (*model.Article, error)
	GetArticles(from, count uint) ([]model.Article, error)
}
