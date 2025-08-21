package controllers

import (
	"net/http"
	"strings"
	"supakorn-5039/src/models"
	"supakorn-5039/src/security"
	"supakorn-5039/src/server/services"
	"supakorn-5039/src/utils"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func Login(c *gin.Context) {
	var body models.CredentialDto

	if err := c.ShouldBindJSON(&body); err != nil {
		var errorMessages []string
		for _, e := range err.(validator.ValidationErrors) {
			errorMessages = append(errorMessages, e.Field()+" is required")
		}
		utils.ErrorResponse(c, strings.Join(errorMessages, "; "), http.StatusBadRequest)
		return
	}

	authService := services.NewAuthenticateService()
	user, err := authService.Login(body.Email, body.Password)
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	token, err := security.GenerateJWT(user.Id)
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.SuccessResponse(c, gin.H{
		"user":  user,
		"token": token,
	})
}

func Register(c *gin.Context) {
	var body models.CredentialDto

	if err := c.ShouldBindJSON(&body); err != nil {
		var errorMessages []string
		for _, e := range err.(validator.ValidationErrors) {
			errorMessages = append(errorMessages, e.Field()+" is required")
		}
		utils.ErrorResponse(c, strings.Join(errorMessages, "; "), http.StatusBadRequest)
		return
	}

	authService := services.NewAuthenticateService()
	user, err := authService.Register(body.Email, body.Password)
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	token, err := security.GenerateJWT(user.Id)
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.SuccessResponse(c, gin.H{
		"user":  user,
		"token": token,
	})
}

func GetProfile(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		utils.ErrorResponse(c, "Authorization header missing", http.StatusUnauthorized)
		return
	}

	token := authHeader
	if strings.HasPrefix(authHeader, "Bearer ") {
		token = authHeader[7:]
	}

	authService := services.NewAuthenticateService()
	user, err := authService.GetProfile(token)
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusUnauthorized)
		return
	}

	utils.SuccessResponse(c, user)
}

func UpdateProfile(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		utils.ErrorResponse(c, "Authorization header missing", http.StatusUnauthorized)
		return
	}

	token := authHeader
	if strings.HasPrefix(authHeader, "Bearer ") {
		token = authHeader[7:]
	}

	var body models.ProfileDto
	if err := c.ShouldBindJSON(&body); err != nil {
		var errorMessages []string
		for _, e := range err.(validator.ValidationErrors) {
			errorMessages = append(errorMessages, e.Field()+" is required")
		}
		utils.ErrorResponse(c, strings.Join(errorMessages, "; "), http.StatusBadRequest)
		return
	}

	authService := services.NewAuthenticateService()
	user, err := authService.UpdateProfile(token, &body)
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	utils.SuccessResponse(c, user)

}
