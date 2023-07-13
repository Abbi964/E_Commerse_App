const path = require("path")

const Product = require('../models/product')


exports.getShop = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','shop.html'))
}

exports.getAllProducts = async(req,res,next)=>{
    try{
        // getting all products from db
        let products = await Product.find()
        // if there are products in db sending then 
        if(products.length > 0){
            res.json({products : products, success : true});
        }
        else{
            res.json({success : false});
        }
    }
    catch(err){
        console.log(err)
    }
}

exports.getProduct = async(req,res,next)=>{
    try{
        const productId = req.params.productId;

        // now finding the product
        let product = await Product.findOne({_id : productId})

        if(product){
            res.json({product : product, success : true})
        }
        else{
            res.json({success : false})
        }
    }
    catch(err){
        console.log(err)
    }
}

exports.getProductsPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','products.html'))
}

exports.addToCart = async(req,res,next)=>{
    try{
        const productId = req.body.productId;
        const user = req.user;
    
        // checking if product with given id exists
        let product = await Product.findById(productId);

        if(product){
            // if product exists then addin it to cart
            await user.addToCart(product)

            res.json({success : true})
        }
        else{
            res.json({success : false, msg : "Product doesn't exists"})
        }

    }
    catch(err){
        console.log(err)
    }
}

exports.getCart = (req, res, next)=>{
    res.sendFile(path.join(__dirname,'..','views','cart.html'))
}

exports.getCartItems = async(req,res,next)=>{
    try{
        const user = req.user;
        // getting cart items
        let popUser = await user.populate('cart.items.productId');
        let cartItems = [...popUser.cart.items]

        res.json({cartItems})
    }
    catch(err){
        console.log(err)
    }

}

exports.postCartDeleteItem = async(req,res,next)=>{
    try{
        const user = req.user;
        const productId = req.body.productId;
    
        await user.deleteProductFromCart(productId);

        res.json({success : true})
    }
    catch(err){
        console.log(err)
    }
}

exports.getProductDetailPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','productDetail.html'))
}