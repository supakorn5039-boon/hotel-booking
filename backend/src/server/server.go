package server

import (
	"fmt"
	"supakorn-5039/src/models"
	"supakorn-5039/src/server/controllers"

	"github.com/gin-gonic/gin"
)

func WebServer(config models.ServerConfig) {
	if config.Production {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()
	applyCorsMiddleware(router)
	controllers.Routes(router)
	port := "8080"

	if port == "" {
		port = fmt.Sprintf("%d", config.Port)
	}

	err := router.Run(":" + port)

	if err != nil {
		panic(err)
	}

}
