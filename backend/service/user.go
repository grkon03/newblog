package service

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/grkon03/newblog/backend/service/repository"
	"github.com/grkon03/newblog/backend/util"
	"github.com/labstack/echo"
)

type UserAPI struct {
	h         repository.UserHandler
	secretKey []byte
}

func NewUserAPI(h repository.UserHandler, secretKey string) UserAPI {
	return UserAPI{h: h, secretKey: []byte(secretKey)}
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (a *UserAPI) Login(c echo.Context) error {
	var req LoginRequest
	if err := c.Bind(&req); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request")
	}

	user, err := a.h.GetUserByUP(req.Username, util.PasswordHash(req.Password))
	if err != nil {
		return c.String(http.StatusUnauthorized, "username or password is wrong")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, newJWTUserClaims(user.ID))

	tokenstr, err := token.SignedString(a.secretKey)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.String(http.StatusOK, tokenstr)
}
