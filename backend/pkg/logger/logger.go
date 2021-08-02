package logger

import (
	"io"

	"github.com/sirupsen/logrus"
)

var logger *logrus.Logger

func init() {
	logger = logrus.New()
	logger.SetLevel(logrus.DebugLevel)
	// logger.ReportCaller = true
}

func SetOutput(f io.WriteCloser) {
	logger.SetOutput(f)
}
func SetLevel(level string) error {
	l, err := logrus.ParseLevel(level)
	if err != nil {
		return err
	}
	logger.SetLevel(l)
	return nil
}
func Level() string {
	return logger.GetLevel().String()
}
func Output() io.Writer {
	return logger.Out
}
func Info(args ...interface{}) {
	logger.Info(args)
}
func Infof(format string, args ...interface{}) {
	logger.Infof(format, args)
}
func Debug(args ...interface{}) {
	logger.Debug(args)
}
func Debugf(format string, args ...interface{}) {
	logger.Debugf(format, args)
}
func Error(args ...interface{}) {
	logger.Error(args)
}
func Errorf(format string, args ...interface{}) {
	logger.Errorf(format, args)
}
func Fatal(args ...interface{}) {
	logger.Fatal(args)
}
func Fatalf(format string, args ...interface{}) {
	logger.Fatalf(format, args)
}
func Panic(args ...interface{}) {
	logger.Panic(args)
}
func Panicf(format string, args ...interface{}) {
	logger.Panicf(format, args)
}
