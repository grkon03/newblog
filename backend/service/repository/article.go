package repository

type ArticleHandler interface {
	CreateArticle(title string, content string, writerDI uint) error
}
