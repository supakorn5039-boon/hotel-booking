package controllers

import (
	"net/http"
	"strconv"
	"supakorn-5039/src/models"
	"supakorn-5039/src/server/services"
	"supakorn-5039/src/utils"

	"github.com/gin-gonic/gin"
)

type HotelController struct {
	service *services.HotelService
}

func NewHotelController(svc *services.HotelService) *HotelController {
	return &HotelController{service: svc}
}

func (hc *HotelController) GetHotels(c *gin.Context) {
	hotels, err := hc.service.GetHotels()

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, hotels)
}

func (hc *HotelController) GetHotelById(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	hotel, err := hc.service.GetHotel(uint(id))

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	utils.SuccessResponse(c, hotel)

}

func (hc *HotelController) CreateHotel(c *gin.Context) {
	var req models.HotelDto

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	hotel := models.Hotel{
		Name:        req.Name,
		Description: req.Description,
		Rating:      req.Rating,
		Price:       req.Price,
		Image:       req.Image,
		People:      req.People,
	}

	dto, err := hc.service.CreateHotel(&hotel)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
	}

	utils.SuccessResponse(c, dto)

}

func (hc *HotelController) UpdateHotel(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	var input models.Hotel

	if err := c.ShouldBindJSON(&input); err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	hotel, err := hc.service.UpdateHotel(uint(id), &input)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
	}

	utils.SuccessResponse(c, hotel)

}

func (hc *HotelController) DeleteHotel(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)

	if err != nil {
		utils.ErrorResponse(c, "Invalid ID", http.StatusBadRequest)
		return
	}

	if err := hc.service.DeleteHotel(uint(id)); err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.SuccessResponse(c, gin.H{
		"message": "Hotel deleted successfully",
	})
}
