
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');



// IMPORT ROUTES
const authRoute = require('./api/routes/auth');
const postRoute = require('./api/routes/posts');

dotenv.config();
// DB CONNECT
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true,useUnifiedTopology:true})
.then((result)=>console.log('connected to db'))
.catch((error)=> console.log(error))

mongoose.Promise = global.Promise;

// MIDDLEWARE
app.use(express.json());



// ROUTES MIDDLEWARES
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.use((req,res,next)=>{
    res.send("404 Not Found");
});

PORT = 3000 || process.env.PORT;
app.listen(PORT,()=>{
    console.log("server run on " + PORT)
});