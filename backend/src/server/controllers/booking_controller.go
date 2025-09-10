package controllers

import (
	"supakorn-5039/src/server/services"

	"github.com/gin-gonic/gin"
)

type BookingController struct {
	service *services.BookingService
}

func NewBookingController(svc *services.BookingService) *BookingController {
	return &BookingController{service: svc}
}

func (bc *BookingController) GetBookingByUserId(c *gin.Context) {
	userId, exist := c.MustGet("user_id").(uint)

	if !exist {
		c.JSON(400, gin.H{"error": "User ID not found"})
		return
	}

	bookings, err := bc.service.GetBookingByUserId(userId)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, bookings)
}
