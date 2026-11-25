const express = require('express')
const userrouter = require('./Routes/userRouter')
const errorHandler = require("./Middleware/errorMiddleware")
const connectdb = require('./Config/connectdb')
const productRouter = require('./Routes/productRouter')
const orderrouter = require('./Routes/orderRouter')
const cors = require('cors')
require('dotenv').config()

require('colors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
connectdb()
const path = require('path')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))



app.use('/api' , userrouter)
app.use('/api', productRouter)
app.use('/api', orderrouter)
app.use(errorHandler)



app.listen(process.env.PORT, () => console.log(`server stared  on port ${process.env.PORT.yellow}`))