package models

type ServerConfig struct {
	Port       int  `ini:"port"`
	Production bool `ini:"production"`
}

type DatabaseConfig struct {
	Host     string `ini:"host"`
	Port     int    `ini:"port"`
	Password string `ini:"password"`
	Name     string `ini:"name"`
	User     string `ini:"user"`
}

type Config struct {
	Server   ServerConfig   `ini:"server"`
	Database DatabaseConfig `ini:"database"`
}
