const express = require("express")
const orderrouter = express.Router()
const { createOrder, getOrders, updateOrderStatus } = require("../Controller/orderController")

orderrouter.post("/create-order", createOrder)
orderrouter.get('/fetch-orders', getOrders)
orderrouter.put('/update-order/:id', updateOrderStatus)

module.exports = orderrouter