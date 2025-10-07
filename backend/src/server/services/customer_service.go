package services

import (
	"supakorn-5039/src/database"
	"supakorn-5039/src/models"

	"gorm.io/gorm"
)

type CustomerService struct {
	db *gorm.DB
}

func NewCustomerService() *CustomerService {
	return &CustomerService{db: database.Db}
}

func (s *CustomerService) GetCustomerReviews() ([]*models.CustomerDto, error) {
	var customers []models.Customer

	if err := s.db.Find(&customers).Error; err != nil {
		return nil, err
	}

	r := make([]*models.CustomerDto, len(customers))

	for i, customer := range customers {
		dto := customer.ToCustomerDto()
		r[i] = &dto
	}

	return r, nil
}

func (s *CustomerService) CreateCustomerReviews(review *models.Customer) (*models.CustomerDto, error) {

	if err := s.db.Create(review).Error; err != nil {
		return nil, err
	}

	dto := review.ToCustomerDto()
	return &dto, nil

}

func (s *CustomerService) DeleteCustomerReviews(id uint) error {
	if err := s.db.Delete(&models.Customer{}, id).Error; err != nil {
		return err
	}

	return nil
}
