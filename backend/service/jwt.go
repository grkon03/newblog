package service

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

const (
	JWTUserContextKey = "JWTUser"
	JWTUserID         = "ID"
)

var ErrJWTInvalidToken = errors.New("invalid token")

type JWT struct {
	user *JWTUser
}

func NewJWT(secretKey string) JWT {
	return JWT{
		user: &JWTUser{secretKey: secretKey},
	}
}

type JWTUser struct {
	secretKey string
}

func (j *JWTUser) JWTUserMiddleware() echo.MiddlewareFunc {
	return middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: []byte(j.secretKey),
		ContextKey: JWTUserContextKey,
	})
}

func (j *JWTUser) NewJWTFunc(c echo.Context) jwt.Claims {
	return new(JWTUserClaims)
}

type JWTUserClaims struct {
	UserID uint `json:"UserID"`
	jwt.StandardClaims
}

func newJWTUserClaims(id uint) JWTUserClaims {
	return JWTUserClaims{
		UserID: id,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().AddDate(0, 6, 0).Unix(),
		},
	}
}

func GetJWTUserClaims(c echo.Context) (claims *JWTUserClaims, err error) {
	t, ok := c.Get(JWTUserContextKey).(*jwt.Token)
	if !ok {
		err = ErrJWTInvalidToken
		return
	}

	claims, ok = t.Claims.(*JWTUserClaims)
	if !ok {
		err = ErrJWTInvalidToken
		return
	}

	return
}
