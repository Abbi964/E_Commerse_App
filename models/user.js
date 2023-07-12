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

module.exports = mongoose.model('User', userSchema);