package models

import (
	"time"

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

type Profile struct {
	gorm.Model
	Email    string `gorm:"not null"`
	Password string `gorm:"not null"`
}

type Hotel struct {
	gorm.Model
	Name        string `gorm:"not null" binding:"required"`
	Description string
	Rating      int    `gorm:"not null"`
	Price       int    `gorm:"not null"`
	Image       string `gorm:"not null"`
	People      int    `gorm:"not null"`
}

type Booking struct {
	gorm.Model
	UserId    uint      `gorm:"not null"`
	HotelId   uint      `gorm:"not null"`
	StartDate time.Time `gorm:"not null"`
	EndDate   time.Time `gorm:"not null"`
	Hotel     Hotel     `gorm:"foreignKey:HotelId;references:ID"`
}

type Customer struct {
	gorm.Model
	Name string `gorm:"not null"`
	Text string `gorm:"not null"`
}
