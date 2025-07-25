package config

import (
	"os"

	"gopkg.in/yaml.v2"
)

type ExecConfig struct {
	DoMigration   bool `yaml:"do_miguration"`
	CreateSamples bool `yaml:"create_samples"`
}

type SQLConfig struct {
	User string `yaml:"user"`
	Pass string `yaml:"pass"`
	Host string `yaml:"host"`
	Name string `yaml:"name"`
	Port int    `yaml:"port"`
}

type APIConfig struct {
	JWTKey string `yaml:"jwtkey"`
}

type AppConfig struct {
	ExecConfig `yaml:"exec_config"`
	SQLConfig  `yaml:"sql_config"`
	APIConfig  `yaml:"api_config"`
}

const (
	config = "/nwb/config.yaml"
)

func NewAppConfig() (AppConfig, error) {
	f, err := os.Open(config)

	if err != nil {
		return AppConfig{}, err
	}

	defer f.Close()

	var ac AppConfig

	err = yaml.NewDecoder(f).Decode(&ac)
	if err != nil {
		panic(err)
	}

	return ac, nil
}
