const express = require('express')

const router = express.Router();

const shopController = require('../controller/shop')
const userAuthenticaltion = require('../middleware/auth')

router.get('/',shopController.getShop);

router.get('/allProducts',shopController.getAllProducts);

router.get('/product/:productId',userAuthenticaltion.authenticate,shopController.getProduct)

module.exports = router