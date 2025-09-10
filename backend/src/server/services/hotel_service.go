package services

import (
	"supakorn-5039/src/database"
	"supakorn-5039/src/models"

	"gorm.io/gorm"
)

type HotelService struct {
	db *gorm.DB
}

func NewHotelService() *HotelService {
	return &HotelService{db: database.Db}
}

func (s *HotelService) GetHotels() ([]*models.HotelDto, error) {
	var hotels []models.Hotel

	if err := s.db.Find(&hotels).Error; err != nil {
		return nil, err
	}

	result := make([]*models.HotelDto, len(hotels))
	for i, hotel := range hotels {
		dto := hotel.ToHotelDto()
		result[i] = &dto
	}
	return result, nil
}

func (s *HotelService) GetHotel(id uint) (*models.HotelDto, error) {
	var hotel models.Hotel

	if err := s.db.First(&hotel, id).Error; err != nil {
		return nil, err
	}

	dt := hotel.ToHotelDto()
	return &dt, nil
}
