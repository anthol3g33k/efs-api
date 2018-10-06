var mongoose = require('mongoose')
var ObjectId = require('mongoose').Types.ObjectId;
var Schema = mongoose.Schema

var QuoteSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    email: String,
    phone: String,
    product: {
      id: Number,
      type: { type: String },
      title: String,
      price:  String
    },
    formule: {
      id: Number,
      title: String,
      description: String,
      price: String
    },
    validated: Boolean
})

module.exports = mongoose.model('Quote', QuoteSchema)
