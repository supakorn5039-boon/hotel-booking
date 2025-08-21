package services

import (
	"fmt"
	"log"
	"supakorn-5039/src/database"
	"supakorn-5039/src/models"
	"supakorn-5039/src/security"

	"gorm.io/gorm"
)

type AuthenticateService struct {
	db *gorm.DB
}

func NewAuthenticateService() *AuthenticateService {
	return &AuthenticateService{db: database.Db}
}

func (s *AuthenticateService) Login(email, password string) (*models.UserDto, error) {
	var user models.User

	err := s.db.Where("email = ?", email).First(&user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {

			log.Printf("Login failed for email '%s': user not found", email)
			return nil, fmt.Errorf("invalid email or password")
		}

		log.Printf("Database error during login for email '%s': %v", email, err)
		return nil, fmt.Errorf("internal server error")
	}

	if ok := security.VerifyPassword(user.Password, password); !ok {

		log.Printf("Login failed for email '%s': invalid password", email)
		return nil, fmt.Errorf("invalid email or password")
	}

	dto := user.ToDto()
	return &dto, nil
}

func (s *AuthenticateService) Register(email, password string) (*models.UserDto, error) {
	var existing models.User

	err := s.db.Where("email = ?", email).First(&existing).Error
	if err == nil {
		return nil, fmt.Errorf("email already exists")
	}

	hashedPassword, err := security.HashPassword(password)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %v", err)
	}

	newUser := models.User{
		Email:    email,
		Password: hashedPassword,
		Role:     "user",
	}

	if err := s.db.Create(&newUser).Error; err != nil {
		return nil, fmt.Errorf("failed to create user: %v", err)
	}

	dto := newUser.ToDto()
	return &dto, nil
}

func (s *AuthenticateService) GetProfile(token string) (*models.UserDto, error) {
	userId, err := security.ParseJWT(token)
	if err != nil {
		return nil, fmt.Errorf("invalid token: %v", err)
	}

	var user models.User
	if err := s.db.First(&user, userId).Error; err != nil {
		return nil, fmt.Errorf("user not found: %v", err)
	}

	dto := models.UserDto{
		Id:    user.ID,
		Email: user.Email,
		Role:  user.Role,
	}

	return &dto, nil
}

func (s *AuthenticateService) UpdateProfile(token string, updatedData *models.ProfileDto) (*models.ProfileDto, error) {
	userId, err := security.ParseJWT(token)

	if err != nil {
		return nil, fmt.Errorf("invalid token: %v", err)
	}

	var user models.User
	if err := database.Db.First(&user, userId).Error; err != nil {
		return nil, fmt.Errorf("user not found: %v", err)
	}

	if updatedData.Email != "" {
		user.Email = updatedData.Email
	}

	if updatedData.Password != "" {
		hashedPassword, err := security.HashPassword(updatedData.Password)
		if err != nil {
			return nil, fmt.Errorf("failed to hash password: %v", err)
		}
		user.Password = hashedPassword
	}

	if err := database.Db.Save(&user).Error; err != nil {
		return nil, fmt.Errorf("failed to update user profile: %v", err)
	}

	dto := models.ProfileDto{}
	return &dto, nil
}
