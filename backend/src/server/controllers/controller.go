package controllers

import (
	"supakorn-5039/src/server/middleware"

	"github.com/gin-gonic/gin"
)

func Routes(r *gin.Engine) {

	api := r.Group("/api")
	{
		{
			auth := api.Group("/auth")
			{
				auth.POST("/login", Login)
				auth.POST("/register", Register)
				auth.GET("/profile", middleware.Protected(), GetProfile)
				auth.PUT("/profile", middleware.Protected(), UpdateProfile)
			}
		}
	}

}
