package main

import (
	"supakorn-5039/src/app"
	"supakorn-5039/src/config"
)

func main() {
	appConfig := config.NewAppConfig()

	if err := appConfig.Load("config.ini"); err != nil {
		panic(err)
	}

	a := app.NewApp(appConfig.Config)
	a.WebServer()
}
