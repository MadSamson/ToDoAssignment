const express = require('express')
const jwt = require('jsonwebtoken');
const {userVerification, User} = require('../models/userModel')
const router = express()
const token_secret="thisisasecretblablabla74856"

router.post('/login', async(req,res)=>{
    const { username, password } = req.body
    const user = await userVerification(username, password)
    if(!user) return res.status(400)
    const userId = user._id.toString()
    const token = jwt.sign({userId, username: user.username},
        process.env.token_secret,
        {expiresIn: "24h", subject: userId}
    )
    res.json({token})

})

module.exports = router