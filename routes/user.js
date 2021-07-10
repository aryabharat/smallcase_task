const express = require('express');
const router = express.Router();
const userController = require('./../controller/user');;


router.post('/trades', userController.postTrade);

router.get('/trades', userController.getTrade);


module.exports = router;
