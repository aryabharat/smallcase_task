// const UserTrades = require('../model/userTrade');
const tradeService = require('../service/trade.service');
const portfolioService = require('../service/portfolio.service');

const addNewTrade = async (req, res) => {
    try {

        // validate req data
        // add trades trade list 
        // add new trade data in porfolio
        // add in validator => check the side case

        let portfolio = await portfolioService.getPortfolio({ ticker_symbol: req.body.ticker_symbol });


        if (portfolio.length > 0) {

            // console.log(port)
            let avg_price = portfolio[0].avg_price
            let current_quantity = portfolio[0].quantity

            let { new_avg_price, new_qty } = tradeService.calculatePriceAndQty(avg_price, current_quantity, req.body.side, req.body.quantity, req.body.price);
             
            console.log({ new_avg_price, new_qty })
            // res.json({ new_avg_price, new_qty })

            let trade = await tradeService.postTrades(req.body)

            let result = await portfolioService.updatePortfolio({ avg_price: new_avg_price, quantity: new_qty }, { ticker_symbol: req.body.ticker_symbol })

            res.json(trade)
            return;
        }

        if (req.body.side === "SELL") {
            return res.status(422).json({ msg: "cannot sell a symbol you down own"})
        }


        let trade = await tradeService.postTrades(req.body)

        let result = await portfolioService.addTradeToPortfolio({ ticker_symbol: req.body.ticker_symbol, avg_price: req.body.price, quantity: req.body.quantity })

        // const newTrade = new UserTrades(req.body);
        // await newTrade.save()

        //sell
        // cannot sell less then current qty
        // if no asset then return false
        // 
        //buy
        // cannot be less then 0

        res.json(trade);
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
};

const getTrade = async (req, res) => {
    try {
        // let tradelist = 
        res.json(await tradeService.getTrades());
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports = { getTrade, addNewTrade };