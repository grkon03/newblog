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
		user: &JWTUser{secretKey: []byte(secretKey)},
	}
}

type JWTUser struct {
	secretKey []byte
}

func (j *JWTUser) JWTUserMiddleware() echo.MiddlewareFunc {
	return echojwt.WithConfig(echojwt.Config{
		SigningKey:    j.secretKey,
		SigningMethod: jwt.SigningMethodHS256.Name,
		ContextKey:    JWTUserContextKey,
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(JWTUserClaims)
		},
	})
}

type JWTUserClaims struct {
	UserID uint `json:"UserID"`
	jwt.RegisteredClaims
}

func newJWTUserClaims(id uint) *JWTUserClaims {
	return &JWTUserClaims{
		UserID: id,
		RegisteredClaims: jwt.RegisteredClaims{
			IssuedAt:  jwt.NewNumericDate(time.Now()),
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
