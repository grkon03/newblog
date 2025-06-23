package repository

type SQLHandler struct {
	DBPingHandler  DBPingHandler
	UserHandler    UserHandler
	ArticleHandler ArticleHandler
}
