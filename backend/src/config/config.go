package config

import (
	"supakorn-5039/src/models"

	"gopkg.in/ini.v1"
)

type AppConfig struct {
	Config *models.Config
}

func NewAppConfig() *AppConfig {
	return &AppConfig{}
}

func (a *AppConfig) LoadConfig() (*models.Config, error) {
	return &models.Config{}, nil
}

func (a *AppConfig) Load(path string) error {
	cfgFile, err := ini.Load(path)
	if err != nil {
		return err
	}

	config := &models.Config{}

	err = cfgFile.Section("server").MapTo(&config.Server)
	if err != nil {
		return err
	}

	err = cfgFile.Section("database").MapTo(&config.Database)
	if err != nil {
		return err
	}

	a.Config = config

	return nil

}
