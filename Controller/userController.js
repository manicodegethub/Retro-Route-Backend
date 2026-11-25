const handler = require("express-async-handler")
const userModel = require("../Model/userModel")
const bcrypt = require('bcrypt')

const regesterUser = handler(async (req, res) => {
    const { username, password } = req.body
const email = req.body.email?.trim().toLowerCase()
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("please fill all the field")


    }

    const finduser = await userModel.findOne({
        email
    })
    
    if(finduser){
        res.status(400)
        throw new Error('Email already exist')

    }
    const hashpass = await bcrypt.hash(password ,10)

    const createuser = await userModel.create({
        username,
        email,
        password:hashpass,
    });
      res.status(201).json({
        _id: createuser._id,
        username: createuser.username,
        email: createuser.email,
    })



})


const loginUser = handler(async (req, res) => {
    const { password } = req.body
    const email = req.body.email?.trim().toLowerCase()

    if (!email || !password) {
        res.status(400)
        throw new Error("Please fill all the fields")
    }

    const finduser = await userModel.findOne({ email })

    if (!finduser || !(await bcrypt.compare(password, finduser.password))) {
        res.status(401)
        throw new Error("Invalid email or password")
    }

    res.status(200).json({
        _id: finduser._id,
        username: finduser.username,
        email: finduser.email,
    })
})







module.exports = {regesterUser,loginUser}