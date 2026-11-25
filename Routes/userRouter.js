const express = require('express')
const {regesterUser, loginUser} = require('../Controller/userController')
const userrouter =express.Router()

userrouter.post('/regester-user', regesterUser)
userrouter.post('/login-user',loginUser)






module.exports = userrouter