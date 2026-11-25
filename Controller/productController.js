const handler = require("express-async-handler")
const productModel = require("../Model/productModel")

const addProduct = handler(async (req, res) => {
    const { name, brand, description, price, currency, category, countInStock } = req.body

    if (!name || !price || !category) {
        res.status(400)
        throw new Error("please fill name, price and category")
    }

    if (!req.file) {
        res.status(400)
        throw new Error("please select an image")
    }

    const createProduct = await productModel.create({
        name,
        brand,
        description,
        price,
        currency,
        category,
        countInStock,
        image: `/uploads/${req.file.filename}`,
    })

    res.status(201).json(createProduct)
})




const getProduct =handler(async(req,res)=>{
    const product = await productModel.find()
    res.send(product)

})


const getOneProduct = handler(async (req, res) => {
    const product = await productModel.findById(req.params.id)
    if (!product) {
        res.status(404)
        throw new Error('product not found')
    }
    res.status(200).json(product)
})

const delProduct =handler(async(req,res)=>{
    const product= await productModel.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error('product not found')
    }
    await product.deleteOne()
    res.send('product delted sucessfully')

})
const updateProduct =handler(async(req,res)=>{
    const product= await productModel.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error('product not found')
    }
    const update = await productModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    })
    res.send(update)
    

})


module.exports ={addProduct , getProduct,delProduct,updateProduct,getOneProduct}