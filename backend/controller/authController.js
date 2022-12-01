const User = require("../models/User");
const bcrypt = require('bcrypt')
const createError = require('http-errors');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

const createToken = (payload) => {
    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: '5d'});
    return token
}

const login = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email})
    
    if(!user) throw createError(400,"username of email is incorrect")

    const legit = await bcrypt.compare(password,user.password)
    if(!legit) throw createError(400,"username or password is incorrect")

    const token = createToken({id: user._id,isAdmin: user.isAdmin})
  
    res.status(200).json({id:user._id,userName: user.userName,email,token})
    
})

const register = asyncHandler(async (req,res)=> {
    const {userName,email,password} = req.body;
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password,salt)

    const exist = await User.findOne({userName: userName})
    if(exist) throw createError(404,"This userName is taken");

    const exist2 = await User.findOne({email})
    if(exist2) throw createError(404,"This email is taken");

    const user = new User({
        userName,
        email,
        password: hash,
    })

    if(!user) throw createError(500,'Something went wrong');
    await user.save()
    res.status(201).send(user)
    
})


module.exports = {login,register}