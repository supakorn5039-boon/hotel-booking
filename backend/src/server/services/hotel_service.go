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

func (s *HotelService) CreateHotel(hotel *models.Hotel) (*models.HotelDto, error) {

	if err := s.db.Create(hotel).Error; err != nil {
		return nil, err
	}

	dto := hotel.ToHotelDto()

	return &dto, nil

}

func (s *HotelService) UpdateHotel(id uint, hotel *models.Hotel) (*models.HotelDto, error) {
	var exist models.Hotel

	if err := s.db.First(&exist, id).Error; err != nil {
		return nil, err
	}

	if err := s.db.Model(&exist).Updates(hotel).Error; err != nil {
		return nil, err
	}

	dto := exist.ToHotelDto()
	return &dto, nil
}

func (s *HotelService) DeleteHotel(id uint) error {
	if err := s.db.Delete(&models.Hotel{}, id).Error; err != nil {
		return err
	}

	return nil
}
