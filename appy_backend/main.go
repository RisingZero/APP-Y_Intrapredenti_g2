package main

import (
	"appy/web/controllers"
	"appy/web/models"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env", "../.env")
	if err != nil {
		panic("Error loading .env file")
	}

	app := gin.Default()

	api := app.Group("/api")

	api.POST("/login", controllers.Login)
	api.POST("/register", controllers.Register)
	api.POST("/pwdrecover", controllers.RecoverPassword)

	models.ConnectDatabase()

	// gin.SetMode(gin.ReleaseMode)
	// or
	// export GIN_MODE=release
	app.Run(fmt.Sprintf("%s:%s", os.Getenv("HOST"), os.Getenv("PORT")))
}
