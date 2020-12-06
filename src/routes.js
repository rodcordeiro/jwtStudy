const express = require('express')
const routes = express.Router();
const jwt = require('./utils/jwt')

const UserController = require('./controllers/UserController');

routes.get('/',(req, res)=>{
    return res.status(200).json({step1:"post /sign a json with email and password",step2:"Post the same json to /login",step3:"Pass the token provided as token key on header on a GET request to /users"})
})
routes.post('/sign',UserController.add);
routes.post('/login',UserController.login);

//Authenticated users
routes.post('/auth',jwt.verify,UserController.auth);
routes.get('/users',jwt.verify,UserController.index);


module.exports = routes;