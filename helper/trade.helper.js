const _ = require('lodash')

/**
 * validates the request (maxIntegerLimit, negative_qty, invalid side)
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next  
 */

const validateTrade = async (req, res, next) => {
    try {

        // check if have all paramters
        let tradeParameter = ["ticker_symbol", "price", "quantity", "side"];

        if (!Object.keys(req.body).every(key => tradeParameter.includes(key))) {
            return res.send({ msg: "Mandatory parameters or extra parameters sent" })
        }

        // convert the ticker_symbol and side to uppercase
        req.body.side = (req.body.side).toUpperCase()
        req.body.ticker_symbol = (req.body.ticker_symbol).toUpperCase()

        // check the price and quantity limit 
        let { price, quantity } = req.body;
        if (_.isString(price) || price < 0 || price > Number.MAX_SAFE_INTEGER) {
            return res.json({ msg: "price cannot be negative or price too large" });
        }

        req.body.price = Number.parseFloat(price).toFixed(2);

        if (!Number.isSafeInteger(quantity) || quantity < 0)
            return res.json({ msg: "qty too large or not integer" })

        next();
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
};

module.exports = { validateTrade };