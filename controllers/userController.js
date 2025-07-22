const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//register user
const registerUser = asyncHandler(async(req, res) => {
    const {name, email} = req.body

    if(!name || !email){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const isUserExists = await User.findOne({email})

    if(isUserExists){
        res.status(400)
        throw new Error('User already exists!')
    }

    //create user
    const user = await User.create({
        name,
        email,
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})


//login user
const loginUser = asyncHandler(async (req, res) => {
    const {name , email} = req.body

    //check if user exists
    const user = await User.findOne({email})

    if(user && user.name === name){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials!')
    }
})

// Get current user (should only fetch data, not update)
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id)
  res.status(200).json({
    id: _id,
    name,
    email,
  })
})


//generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}