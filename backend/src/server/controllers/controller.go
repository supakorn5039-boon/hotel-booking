package controllers

import "github.com/gin-gonic/gin"

func Routes(r *gin.Engine) {

	api := r.Group("/api")
	{
		{
			auth := api.Group("/auth")
			{
				auth.POST("/login", Login)
				auth.POST("/register", Register)
			}
		}
	}

}
