package controllers

import (
	"net/http"
	"supakorn-5039/src/models"
	"supakorn-5039/src/server/services"
	"supakorn-5039/src/utils"

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

func (bc *BookingController) CreateBooking(c *gin.Context) {
	var req models.BookingDto

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	userId, ok := c.MustGet("user_id").(uint)

	if !ok {
		c.JSON(400, gin.H{"error": "User ID not found"})
	}

	booking := models.Booking{
		UserId:    userId,
		HotelId:   uint(req.Hotel.Id),
		StartDate: req.StartDate,
		EndDate:   req.EndDate,
	}

	dto, err := bc.service.CreateBookings(&booking)
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
	}

	utils.SuccessResponse(c, dto)

}
