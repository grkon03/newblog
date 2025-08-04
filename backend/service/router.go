package service

import (
	"github.com/labstack/echo/v4"
)

func Routing(e *echo.Echo, api API) error {
	userauth := api.JWT.user.JWTUserMiddleware()

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

		image := a.Group("/image")
		{
			image.GET("/:id", api.ImageAPI.GetImage)
		}

		a.POST("/login", api.UserAPI.Login)

		admin := a.Group("/auth")
		admin.Use(userauth)
		{
			admin.GET("/ping", api.PingAPI.Ping)
			admin.POST("/article", api.ArticleAPI.PostArticle)
			admin.PUT("/article/:id", api.ArticleAPI.PutArticle)
			admin.DELETE("/article/:id", api.ArticleAPI.DeleteArticle)
			admin.GET("/myarticles", api.ArticleAPI.GetMyArticles)
		}
	}

	return nil
}
