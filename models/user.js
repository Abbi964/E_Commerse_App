const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password : {
    type : String,
    required : true
  },
  cart: {
    items: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }]
  },
  products: [{
    productId : { type: Schema.Types.ObjectId, ref: 'Product', required: true }
  }]
})


userSchema.methods.deleteFromProductsArray = function(prodId){
  try{
    // finding index of product to delete
    let prodIndex = this.products.findIndex(ele => {
      return ele.productId.toString() === prodId.toString()
    })
  
    if(prodIndex >= 0){
      // if product exists then deleting it
  
      updatedProdsArray = [...this.products];
      updatedProdsArray.splice(prodIndex,1)
      this.products = [...updatedProdsArray]
  
      // now saving user
      this.save()
        .then(result => { 
          console.log(result) 
          return true
        })
        .catch(err => console.log(err))
    }
    else{
      return false
    }
  }
  catch(err){
    console.log(err)
  }
}

userSchema.methods.addToCart = function (product) {
  // checking if product is already in cart or not
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString()
  })

  let newQuantity = 1;
  let updatedCartItem = [...this.cart.items]

  if (cartProductIndex >= 0) {
    // if product already exist in cart then increasing quantity
    newQuantity = this.cart.items[cartProductIndex].quantity + 1
    updatedCartItem[cartProductIndex].quantity = newQuantity;
  }
  else {
    // if product does not exist than adding product
    updatedCartItem.push({
      productId: product._id,
      quantity: newQuantity,
    })
  }

  const updatedCart = { items: updatedCartItem }

  // updating the cart
  this.cart = { ...updatedCart }
  return this.save()
    .then(result => { console.log(result) })
    .catch(err => console.log(err))

}

userSchema.methods.deleteProductFromCart = function (prodId) {
  // finding index of product to delete
  let prodIndex = this.cart.items.findIndex(ele => {
    return ele.productId.toString() === prodId.toString()
  })

  // now removing product from that index
  let updatedItemsArray = [...this.cart.items]
  updatedItemsArray.splice(prodIndex, 1);

  let updatedCart = { items: updatedItemsArray }

  // now updating the cart

  this.cart = {...updatedCart}
  return this.save()
    .then(result => { console.log(result) })
    .catch(err => console.log(err))
}

const Order = require('./order')

userSchema.methods.createOrder = function(){
  // first getting products and quantity from cart
  let prodArr = [...this.cart.items]

  // making a new order instence
  let order = new Order({
    products : prodArr,
    userId : this._id
  })

  return order.save()
    .then(result =>{
      // clearing the user cart 
      this.cart = {items : []};
      return this.save()
    })
    .catch(err => console.log(err))
}

module.exports = mongoose.model('User', userSchema);