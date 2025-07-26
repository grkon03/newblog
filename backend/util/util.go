package util

import (
	"crypto/hmac"
	"crypto/sha256"
	"fmt"
	"log"
)

const HashKey = "meow"

func PasswordHash(password string) string {
	mac := hmac.New(sha256.New, []byte(HashKey))
	_, err := mac.Write([]byte(password))
	if err != nil {
		log.Fatal(err.Error())
	}

	return fmt.Sprintf("%x", mac.Sum(nil))
}
