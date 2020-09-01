const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');

router.get('/',(req, res)=>{
    res.status(200).json({status:"OK"});
})

router.get('/user',UserController.index)
router.post('/user',UserController.create)

module.exports = router;