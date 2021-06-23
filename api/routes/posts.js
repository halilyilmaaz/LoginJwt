const router = require('express').Router();
const User = require('../model/User.js');
const verify = require('./verifyToken.js');

router.get('/', verify,(req,res)=>{
    res.send(req.user);
    
})

module.exports = router;