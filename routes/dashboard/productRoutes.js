
const productController = require('../../controllers/dashboard/productController')
const { authMiddleware } = require('../../middlewares/authMiddlewares')
const router = require('express').Router()

 router.post('/product-add',authMiddleware, productController.add_product)


 module.exports = router 