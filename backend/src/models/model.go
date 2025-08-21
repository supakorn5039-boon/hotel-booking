package models

import (
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

type Claims struct {
	jwt.RegisteredClaims
	Id uint `json:"id"`
}

type User struct {
	gorm.Model
	Role     string `gorm:"not null"`
	Email    string `gorm:"not null"`
	Password string `gorm:"not null"`
}
