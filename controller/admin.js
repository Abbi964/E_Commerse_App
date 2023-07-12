const path = require('path')
const jwt = require('jsonwebtoken')

const Product = require('../models/product');
const User = require('../models/user')

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'addProduct.html'))
}

exports.postAddProduct = async (req, res, next) => {
    try {
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const user = req.user

        // creating product
        const product = await Product.create({
            title: title,
            price: price,
            description: description,
            imageUrl: imageUrl,
            userId: req.user._id,
        });

        // adding this product in user.products array
        let userProdArr = [...user.products]
        userProdArr.push({productId : product._id})
        user.products = [...userProdArr]

        await user.save()
        
        res.json({success : true});
    }
    catch (err) {
        console.log(err);
    }
};

exports.getAdminProductsPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','adminProducts.html'))
}

exports.getAdminProducts = async(req,res,next)=>{
    try{
        let user = req.user
        // geting prodcts of admin
        let popUser = await user.populate('products.productId')
    
        let prods = [...popUser.products]

        if(prods.length > 0){
            res.json({products : prods,success : true})
        }
        else{
            res.json({success : false})
        }

    }
    catch(err){
        conosle.log(err)
    }
}

exports.getEditProduct = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','editProduct.html'))
}

exports.postEditProduct = async(req,res,next)=>{
    try {
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const prodId = req.body.productId;

        // first finding the product in DB
        let product = await Product.findOne({_id : prodId});
        if(product){
            // if product exists then updating it and then saving it
            product.title = title;
            product.imageUrl = imageUrl;
            product.price = price;
            product.description = description;

            await product.save()

            res.json({success : true})
        }
        else{
            res.json({success : false})
        }
    }
    catch(err){
        console.log(err)
    }
}

exports.getDeleteProduct = async(req, res, next) => {
    try{
        const prodId = req.params.productId;
        const user = req.user

        // deleting product from user's products array
         user.deleteFromProductsArray(prodId)
    
         await Product.findByIdAndDelete(prodId)
         res.json({success : true})
    }
    catch(err){
        console.log(err)
    }
  };
  