const Trade = require('../model/trade.model')

exports.getTrades = async function (query) {
    try {
        return await Trade.find(query)
    } catch (e) {
        throw Error(e)
    }
}

exports.postTrades = async function (query) {
    try {
        const trade = new Trade(query);
        await trade.save()
        return trade;
    } catch (e) {
        console.log(e)
        throw Error(e)
    }
}

exports.calculatePriceAndQty =  function (current_avg_price, current_quantity, side, quantity, price) {
    try {
        console.log(current_avg_price, current_quantity, side, quantity, price)

        if (side === "SELL" && current_quantity < quantity)
            throw "cannot sell quantity more then the current quantity."

        if (side === "BUY") {
            return {
                new_avg_price: (((current_avg_price * current_quantity) + (price * quantity)) / (current_quantity + quantity)).toFixed(2),
                new_qty: current_quantity + quantity
            }
        }

        return {
            new_avg_price: current_avg_price,
            new_qty: current_quantity - quantity
        }

    } catch (e) {
        throw Error(e)
    }
}