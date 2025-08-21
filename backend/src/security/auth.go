package security

import (
	"errors"
	"fmt"
	"supakorn-5039/src/models"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var (
	secret = "B63GF15eL2AjzNst"
	jwtKey = []byte(secret)
)

func GenerateJWT(id uint) (string, error) {
	expirationTime := time.Now().Add(1 * 24 * time.Hour)
	claims := &models.Claims{
		Id: id,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func ValidateToken(tokenStr string) (*models.Claims, error) {
	claims := &models.Claims{}

	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtKey, nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	if claims.ExpiresAt.Time.Before(time.Now()) {
		return nil, fmt.Errorf("token expired")
	}

	return claims, nil

}

func ParseJWT(tokenStr string) (uint, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil || !token.Valid {
		return 0, errors.New("invalid token")
	}
	claims, ok := token.Claims.(jwt.MapClaims)

	if !ok {
		return 0, errors.New("invalid token")
	}

	userId, ok := claims["id"].(float64)
	if !ok {
		return 0, errors.New("invalid User Id in token")
	}

	return uint(userId), nil

}
