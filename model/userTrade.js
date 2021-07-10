const mongoose = require('mongoose');

const userTradeSchema = mongoose.Schema({
    trade_id: {
        type: Number,
        defafult: 0
    },
    ticker_symbol: {
        type: String,
        uppercase: true,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        min: 10,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    side: {
        type: String,
        require: true,
        uppercase: true,
        trim: true,
        enum: ["BUY", "SELL"]
    },
    created: {
        type: Date,
        default: Date.now
    }
})

userTradeSchema.static('increment')


module.exports = mongoose.model('userTrade', userTradeSchema);