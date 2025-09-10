package controllers

import (
	"net/http"
	"strconv"
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
