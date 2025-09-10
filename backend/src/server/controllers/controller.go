package controllers

import (
	"supakorn-5039/src/server/middleware"
	"supakorn-5039/src/server/services"

	"github.com/gin-gonic/gin"
)

func Routes(r *gin.Engine) {

	api := r.Group("/api")
	{
		v1 := api.Group("/v1")
		{
			auth := v1.Group("/auth")
			{
				auth.POST("/login", Login)
				auth.POST("/register", Register)
				auth.GET("/profile", middleware.Protected(), GetProfile)
				auth.PUT("/profile", middleware.Protected(), UpdateProfile)
			}

			hotel := v1.Group("/hotel")
			hotel.Use(middleware.Protected())
			hc := &HotelController{service: services.NewHotelService()}
			{
				hotel.GET("", hc.GetHotels)
				hotel.GET("/:id", hc.GetHotelById)

			}

			booking := v1.Group("/booking")
			booking.Use(middleware.Protected())
			bs := &BookingController{service: services.NewBookingService()}
			{
				booking.GET("", bs.GetBookingByUserId)
			}
		}
	}

}
