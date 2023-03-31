package main

import (
	"appy/web/controllers"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	app := gin.Default()

	api := app.Group("/api")

	api.POST("/login", controllers.Login)
	api.POST("/register", controllers.Register)
	api.POST("/pwdrecover", controllers.RecoverPassword)

	// gin.SetMode(gin.ReleaseMode)
	// or
	// export GIN_MODE=release
	app.Run(fmt.Sprintf("%s:%s", os.Getenv("HOST"), os.Getenv("PORT")))
}
