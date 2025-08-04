package service

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
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
	return echojwt.WithConfig(echojwt.Config{
		SigningKey: []byte(j.secretKey),
		ContextKey: JWTUserContextKey,
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(JWTUserClaims)
		},
		TokenLookup: "header:Authorization",
	})
}

type JWTUserClaims struct {
	UserID uint `json:"UserID"`
	jwt.RegisteredClaims
}

func newJWTUserClaims(id uint) JWTUserClaims {
	return JWTUserClaims{
		UserID: id,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 72)),
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
