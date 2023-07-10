const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

exports.getLoginPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','login.html'))
}

exports.postLoginPage = async(req,res,next)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        let user = await User.findOne({email:email});
        // checking if user email exists in DB or not
        if(user===null){
            res.status(404).json({msg:'User not found'})
        }
        else{
            bcrypt.compare(password,user.password,async(err,same)=>{
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: 'Internal server error' });
                }
                else if(same){
                    
                    res.json({msg:'logging in user',token:generateJWT(user._id)})
                }
                else{
                    res.status(401).json({msg:'User not authorized'})
                }
            })
        }
    }
    catch(err){
        console.log(err)
    }
}

function generateJWT(id){
    return jwt.sign({userId:id},process.env.JWT_KEY)
}

function tokenToData(token){
    return jwt.verify(token,process.env.JWT_KEY)
}
