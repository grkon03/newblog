package service

type CreateArticleParams struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}
