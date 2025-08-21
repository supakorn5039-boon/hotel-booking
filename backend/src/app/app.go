package app

import (
	"supakorn-5039/src/database"
	"supakorn-5039/src/models"
	"supakorn-5039/src/server"
)

type App struct {
	config *models.Config
}

func NewApp(config *models.Config) *App {
	app := &App{config: config}
	database.Init(&config.Database)
	return app
}

func (a *App) WebServer() {
	server.WebServer(models.ServerConfig{Port: a.config.Server.Port})

}
