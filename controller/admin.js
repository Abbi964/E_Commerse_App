const path = require('path')

const Product = require('../models/product');
const { json } = require('body-parser');

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