const express = require('express')

const router = express.Router();

const shopController = require('../controller/shop')
const userAuthenticaltion = require('../middleware/auth')

router.get('/',shopController.getShop);

router.get('/allProducts',shopController.getAllProducts);

router.get('/product/:productId',userAuthenticaltion.authenticate,shopController.getProduct)

router.get('/products',shopController.getProductsPage);

router.post('/addToCart',userAuthenticaltion.authenticate,shopController.addToCart);

router.get('/cart',shopController.getCart);

router.get('/cartItems',userAuthenticaltion.authenticate,shopController.getCartItems)

router.post('/cart-delete-item',userAuthenticaltion.authenticate,shopController.postCartDeleteItem)

router.get('/productDetail/:productId',shopController.getProductDetailPage);

router.get('/create-order',userAuthenticaltion.authenticate,shopController.postCreateOrder)

router.get('/orders',shopController.getOrderPage);

router.get('/getAllOrders',userAuthenticaltion.authenticate,shopController.getAllOrders);

module.exports = router