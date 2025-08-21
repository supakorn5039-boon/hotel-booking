package database

import (
	"fmt"
	"log"
	"supakorn-5039/src/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func Init(config *models.DatabaseConfig) {
	host := config.Host
	port := config.Port
	password := config.Password
	dbName := config.Name
	user := config.User

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable TimeZone=Asia/Bangkok", host, port, user, password, dbName)

	var err error

	Db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
}
