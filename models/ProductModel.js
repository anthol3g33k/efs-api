var mongoose = require('mongoose')

var Schema = mongoose.Schema

var ProdcSchema = new Schema({
    _id: String,
    id: { type: Number, required: true },
    type: { type: String },
    title: { type: String },
    price: { type: String },
    items: [{ type: String }],
    formules: [{
      id: Number,
      title: String,
      description:
      String,
      price: String
    }]
})

module.exports = mongoose.model('Product', ProdcSchema )
