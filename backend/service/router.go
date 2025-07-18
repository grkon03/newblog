package service

import "github.com/labstack/echo"

func Routing(e *echo.Echo, api API) error {
	a := e.Group("/api")
	{
		ping := a.Group("/ping")
		{
			ping.GET("", api.PingAPI.Ping)
			ping.GET("/db", api.PingAPI.DBPing)
		}

		a.GET("/articles", api.ArticleAPI.GetArticles)

		article := a.Group("/article")
		{
			article.GET("/:id", api.ArticleAPI.GetArticle)
		}
	}

	return nil
}
