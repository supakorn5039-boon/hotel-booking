package services

import (
	"supakorn-5039/src/database"
	"supakorn-5039/src/models"

	"gorm.io/gorm"
)

type BookingService struct {
	db *gorm.DB
}

func NewBookingService() *BookingService {
	return &BookingService{db: database.Db}
}

func (s *BookingService) CreateBookings(booking *models.Booking) (*models.BookingDto, error) {

	if err := s.db.Create(booking).Error; err != nil {
		return nil, err
	}

	if err := s.db.Preload("Hotel").Where("id = ?", booking.ID).First(&booking).Error; err != nil {
		return nil, err
	}

	return booking.ToBookingDto(), nil
}

func (s *BookingService) GetBookingByUserId(UserId uint) ([]*models.BookingDto, error) {
	var booking []models.Booking

	if err := s.db.Preload("Hotel").Where("user_id = ?", UserId).Find(&booking).Error; err != nil {
		return nil, err
	}

	result := make([]*models.BookingDto, len(booking))

	for i, b := range booking {
		result[i] = b.ToBookingDto()
	}
	return result, nil
}
