const express = require('express')

const adminController = require('../controller/admin');
const userAuthenticaltion = require('../middleware/auth')

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product',userAuthenticaltion.authenticate, adminController.postAddProduct);

router.get('/products', adminController.getAdminProductsPage);

router.get('/adminProducts',userAuthenticaltion.authenticate,adminController.getAdminProducts)

module.exports = router