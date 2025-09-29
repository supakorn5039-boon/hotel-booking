package controllers

import (
	"net/http"
	"supakorn-5039/src/models"
	"supakorn-5039/src/server/services"
	"supakorn-5039/src/utils"

	"github.com/gin-gonic/gin"
)

type CustomerController struct {
	service *services.CustomerService
}

func NewCustomerController(svc *services.CustomerService) *CustomerController {
	return &CustomerController{service: svc}
}

func (cc *CustomerController) GetCustomerReviews(c *gin.Context) {

	customers, err := cc.service.GetCustomerReviews()

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, customers)

}

func (cc *CustomerController) CreateCustomerReviews(c *gin.Context) {

	var req models.CustomerDto

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	review := models.Customer{
		Name: req.Name,
		Text: req.Text,
	}

	dto, err := cc.service.CreateCustomerReviews(&review)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	utils.SuccessResponse(c, dto)
}
