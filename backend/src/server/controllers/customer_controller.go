package controllers

import (
	"net/http"
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
