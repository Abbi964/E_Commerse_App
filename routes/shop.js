const express = require('express')

const router = express.Router();

const shopController = require('../controller/shop')

router.get('/',shopController.getShop);

router.get('/allProducts',shopController.getAllProducts);

module.exports = router