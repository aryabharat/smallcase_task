const express = require('express');
const router = express.Router();
const portfolioController = require('./../controller/portfolio.controller');;

// router.post('/', portfolioControlle.addNewTrade);

router.get('/', portfolioController.getPortoflio);



module.exports = router;
