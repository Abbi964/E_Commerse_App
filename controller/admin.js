const path = require('path')

const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'addProduct.html'))
}

exports.postAddProduct = async (req, res, next) => {
    try {
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const product = await Product.create({
            title: title,
            price: price,
            description: description,
            imageUrl: imageUrl,
            userId: req.user._id,
        });

        res.redirect('/admin/products');
    }
    catch (err) {
        console.log(err);
    }
};