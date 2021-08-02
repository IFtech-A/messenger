package main

import (
	"backend/pkg/gql"
	"backend/pkg/logger"
	"bytes"
	"fmt"
	"io"
	"os"

	env "github.com/Netflix/go-env"
	"github.com/sirupsen/logrus"
)

func main() {
	file, err := os.ReadFile(".secrets")
	if err != nil {
		logrus.Fatal(err)
	}
	fileReader := bytes.NewReader(file)
	lines := make([]string, 0)
	for {
		var line string
		_, err = fmt.Fscanln(fileReader, &line)
		if err != nil {
			if err != io.EOF {
				logrus.Error(err)
			}
			break
		}
		lines = append(lines, line)
	}
	ens, err := env.EnvironToEnvSet(lines)
	if err != nil {
		logrus.Fatal(err)
	}
	conf := gql.NewConfig()
	err = env.Unmarshal(ens, conf.DBConfig)
	if err != nil {
		logrus.Fatal(err)
	}

	// Create server
	s := gql.New(conf)
	err = s.Start()
	if err != nil {
		logger.Panic(err)
	}
}
