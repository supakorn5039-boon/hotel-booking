package main

import (
	"fmt"
	"log"
	"os"
	"supakorn-5039/src/config"
	"supakorn-5039/src/models"
	"supakorn-5039/src/security"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	appConfig := config.NewAppConfig()

	if err := appConfig.Load("config.ini"); err != nil {
		panic(err)
	}

	host := appConfig.Config.Database.Host
	port := appConfig.Config.Database.Port
	user := appConfig.Config.Database.User
	password := appConfig.Config.Database.Password
	dbName := appConfig.Config.Database.Name

	dbSSL := os.Getenv("DB_SSL")
	var sslmode string
	if dbSSL == "true" {
		sslmode = "require"
	} else {
		sslmode = "disable"
	}

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s TimeZone=Asia/Bangkok", host, port, user, password, dbName, sslmode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {

		log.Fatalf("failed to connect database: %v", err)
	}

	err = db.Migrator().DropTable(
		&models.User{}, &models.Hotel{}, &models.Booking{},
	)
	if err != nil {
		log.Fatalf("failed to drop tables: %v", err)
	}

	if err = db.AutoMigrate(
		&models.User{}, &models.Hotel{}, &models.Booking{},
	); err != nil {
		log.Fatalf("failed to migrate tables: %v", err)
	}

	log.Println("Migration successfully!")

	hashedPassword, err := security.HashPassword("password")
	if err != nil {
		log.Fatalf("failed to hash password: %v", err)
	}

	mockUpUser := models.User{
		Email:    "admin@gmail.com",
		Password: hashedPassword,
		Role:     "admin",
	}

	if err = db.Create(&mockUpUser).Error; err != nil {
		log.Fatalf("failed to create mock up user: %v", err)
	}

	mockUpHotel := []models.Hotel{{
		Name:        "Hotel 1",
		Description: "Test Hotel",
		Rating:      5,
		Price:       600,
		Image:       "https://upload.opalcollection.com/app/uploads/sites/9/2022/07/22154724/HEADER_Stay-at-Jupiter-Beach-Resort.jpg",
		People:      2,
	}, {
		Name:        "Hotel 2",
		Description: "Test Hotel",
		Rating:      4,
		Price:       1000,
		Image:       "https://content.r9cdn.net/rimg/himg/2e/7b/a5/expedia_group-94818-faad0b-358361.jpg?width=1366&height=768&crop=true",
		People:      4,
	}}

	if err = db.Create(&mockUpHotel).Error; err != nil {
		log.Fatalf("failed to create mock up hotel: %v", err)
	}

	mockUpBooking := []models.Booking{{
		HotelId:   1,
		UserId:    1,
		StartDate: time.Now(),
		EndDate:   time.Now().AddDate(0, 0, 5),
	}, {
		HotelId:   2,
		UserId:    1,
		StartDate: time.Now(),
		EndDate:   time.Now().AddDate(0, 0, 5),
	}}

	if err := db.Create(&mockUpBooking).Error; err != nil {
		log.Fatalf("failed to create mock up booking: %v", err)
	}

	log.Println("Seeding complete!")
}
