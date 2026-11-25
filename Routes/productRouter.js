const express = require('express')
const { addProduct, getProduct, delProduct, updateProduct, getOneProduct } = require('../Controller/productController')
const productRouter = express.Router()
const upload = require('../Middleware/upload')

productRouter.post('/add-product', upload.single('image'), addProduct)
productRouter.get('/fatch-product', getProduct)
productRouter.get('/getOne-product/:id', getOneProduct)

productRouter.delete('/delete-product/:id', delProduct)
productRouter.put('/update-product/:id', upload.single('image'), updateProduct)

module.exports = productRouter