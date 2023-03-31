package controllers

import (
	"appy/web/dto"
	"appy/web/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// POST /api/register
func Register(c *gin.Context) {
	var body dto.RegisterRequest
	var response dto.CommonResponse

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(
			http.StatusOK,
			dto.CommonResponse{
				Status:  dto.CommonStatus.Error,
				Message: err.Error(),
			},
		)
		return
	}

	user := models.User{}
	user.Username = body.Username
	user.Password = body.Password

	_, err := user.Insert()
	if err != nil {
		c.JSON(
			http.StatusOK,
			dto.CommonResponse{
				Status:  dto.CommonStatus.Error,
				Message: err.Error(),
			},
		)
		return
	}

	response.Status = dto.CommonStatus.Ok
	response.Message = "User " + user.Username + " has been registered"

	c.JSON(http.StatusOK, response)
}

// POST /api/login
func Login(c *gin.Context) {
	response := dto.CommonResponse{
		Status: dto.CommonStatus.Ok,
	}

	c.JSON(http.StatusOK, response)
}

// POST /api/pwdrecover
func RecoverPassword(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "ok",
	})
}
