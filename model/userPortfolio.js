const mongoose = require('mongoose');

const userPortifolioSchema = mongoose.Schema({
    ticker_symbol: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    avg_buy_price: {
        type: Number,
        min: 10,
        unique: true,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
}
)


module.exports = mongoose.model('userPortfolio', userPortifolioSchema);