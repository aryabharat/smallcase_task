// const UserTrades = require('../model/userTrade');
const tradeService = require('../service/trade.service');
const portfolioService = require('../service/portfolio.service');

const getPortoflio = async (req, res) => {
    try {

        res.json(await portfolioService.getPortfolio());

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
};

// const getTrade = async (req, res) => {
//     try {
//         // let tradelist = 
//         res.json(await tradeService.getTrades());
//     } catch (err) {
//         res.status(500).send(err)
//     }
// };

module.exports = { getPortoflio };