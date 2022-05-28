package test

import (
	"fmt"

	"gorm.io/gorm"
	"sun.com/cloud/include"
)

type User struct {
	Id uint
	gorm.Model
	Role       string
	Department int
	Verify     int
	Username   string
	Truename   string
	Password   string
	Email      string
	Phone      string
	NickName   string
	AvatarUrl  string
	Country    string
	Province   string
	City       string
	Gender     string
	Unionid    string
	Openid     string
	Last_ip    string
	Invite_num int
	Source     string
}

func TMessageRegister() {
	var user User
	DB := include.GetDB("db")
	DB.First(&user)
	fmt.Println(user)
}
