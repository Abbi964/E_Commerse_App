const path = require('path')
const bcrypt = require('bcrypt')

const User = require('../models/user');

exports.getSignupPage = (req, res, next)=>{
    res.sendFile(path.join(__dirname,'..','views','signup.html'))
}

exports.postSignupPage = async(req,res,next)=>{
    try{
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        // hashing the password
        bcrypt.hash(password,10,async(err,hash)=>{
            // finding or creating user
            let user = await User.findOne({email:email})
            if(!user){
                await User.create({
                    name:name,
                    email:email,
                    password:hash,
                })
    
            }
            res.json(user === null);
        })
    }
    catch(err){
        console.log(err)
    }
}

