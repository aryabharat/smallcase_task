const UserTrades = require('../model/userTrade');

const postTrade = async (req, res, next) => {
    try {
        // add trades trade list and porfolio

        const newTrade = new UserTrades(req.body);
        await newTrade.save()

        //sell
        // cannot sell less then current qty
        // if no asset then return false
        // 
        //buy
        // cannot be less then 0

        res.json(newTrade);
    } catch (err) {
        console.error(err)
        res.status(500).json(err);
    }
};

const getTrade = async (req, res, next) => {
    let trades = await UserTrades.find();

    res.json(trades);
};

module.exports = { getTrade, postTrade };