const handler = require("express-async-handler")
const orderModel = require("../Model/orderModel")
const productModel = require("../Model/productModel")

const createOrder = handler(async (req, res) => {
    const { user, items, fullName, phone, address, city, postalCode } = req.body

    // Step 1: check karo sab kuch aaya hai
    if (!user || !fullName || !phone || !address || !city || !postalCode) {
        res.status(400)
        throw new Error("please fill all the fields")
    }

    if (!items || items.length === 0) {
        res.status(400)
        throw new Error("no items in order")
    }

    // Step 2: har item ke liye product database se lo
    let subtotal = 0
    const orderItems = []

    for (const item of items) {
        if (!item.quantity || item.quantity < 1) {
            res.status(400)
            throw new Error("quantity must be at least 1")
        }

        const product = await productModel.findById(item.product)

        if (!product) {
            res.status(404)
            throw new Error("product not found")
        }

        orderItems.push({
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
        })

        subtotal = subtotal + product.price * item.quantity
    }

    // Step 3: total nikalo (13% tax)
    const tax = subtotal * 0.13
    const totalPrice = Number((subtotal + tax).toFixed(2))

    // Step 4: order save karo
    const order = await orderModel.create({
        user,
        items: orderItems,
        fullName,
        phone,
        address,
        city,
        postalCode,
        totalPrice,
    })

    res.status(201).json(order)
})

const getOrders = handler(async (req, res) => {
    const orders = await orderModel.find().sort({ createdAt: -1 })
    res.status(200).json(orders)
})

const updateOrderStatus = handler(async (req, res) => {
    const order = await orderModel.findById(req.params.id)
    if (!order) {
        res.status(404)
        throw new Error('order not found')
    }

    order.status = req.body.status
    await order.save()
    res.status(200).json(order)
})

module.exports = { createOrder, getOrders, updateOrderStatus }