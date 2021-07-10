const Portfolio = require('../model/portfolio.model')

exports.getPortfolio = async function (query) {
    try {

        return await Portfolio.find(query);
    } catch (e) {
        throw Error(e)
    }
}


exports.updatePortfolio = async function (query, filter) {
    try {

        if (query.quantity === 0)
            return await Portfolio.deleteOne(filter)

        return await Portfolio.findOneAndUpdate(filter, query);

    } catch (e) {
        throw Error(e)
    }
}


exports.addTradeToPortfolio = async function (query) {
    try {

        console.log(query)
        const portfolio = new Portfolio(query);
        await portfolio.save()
        return Portfolio;
    } catch (e) {
        throw Error(e)
    }
}