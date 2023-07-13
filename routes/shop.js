const express = require('express')

const router = express.Router();

const shopController = require('../controller/shop')
const userAuthenticaltion = require('../middleware/auth')

router.get('/',shopController.getShop);

router.get('/allProducts',shopController.getAllProducts);

router.get('/product/:productId',userAuthenticaltion.authenticate,shopController.getProduct)

router.get('/products',shopController.getProductsPage);

router.post('/addToCart',userAuthenticaltion.authenticate,shopController.addToCart)

module.exports = router