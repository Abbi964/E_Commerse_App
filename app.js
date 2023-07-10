require('dotenv').config()

const bodyParser = require('body-parser');

const express = require('express');
const app = express()

const mongoose = require('mongoose')

const path = require('path')

// making public folder static
app.use(express.static(path.join(__dirname,'public')));
// using bodyparser
app.use(bodyParser.json())

// adding routes
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user')


// routing requests
app.get('/',(req,res,next)=>{
    res.redirect('/user/signup')
})

app.use('/shop',shopRoutes)
app.use('/user',userRoutes);


mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vghsxbb.mongodb.net/shop2?retryWrites=true`)
    .then(()=>{
        console.log('connected to mongoDB using mongoose')
        app.listen(3000)
    })
    .catch((err)=>console.log(err))