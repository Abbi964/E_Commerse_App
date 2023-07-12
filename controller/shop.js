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