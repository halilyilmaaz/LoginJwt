
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../model/validation');


const loginAuth =async (req,res,next)=>{
    //VALIDATE USER
    const { error } = loginValidation(req.body); 
    if(error) return res.status(400).send(error.details[0].message);
    
    // checking if the user is already in the database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('email or password wrong!!');
    
    // password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('ınvalid password');


    // create and assign a token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send("token : "+token);



    res.send('logged in');

};

const registerAuth = async (req,res)=>{
    
    // VALIDATE USER
   // const {error} = schema.validate(req.body);
    const { error } = registerValidation(req.body); 
    if(error) return res.status(400).send(error.details[0].message);
    

    // checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('email already exist');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    await user
    .save()
    .then(result =>{
        res.status(201).json({
            user: user._id
        });
    })
    .catch(err=> {
        res.status(500).json({
            error: err
        });
    });
    
};

module.exports = {
    loginAuth,
    registerAuth
}