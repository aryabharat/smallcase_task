const express = require('express');
const router = express.Router();
const tradeController = require('./../controller/trade.controller');;

router.post('/', tradeController.addNewTrade);

router.get('/', tradeController.getTrade);



module.exports = router;
