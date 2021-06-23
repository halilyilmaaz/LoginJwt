const router = require('express').Router();

const authRouteController = require("../controller/routefunc");

router.post('/register', authRouteController.registerAuth);


router.post('/login', authRouteController.loginAuth);



module.exports = router;

