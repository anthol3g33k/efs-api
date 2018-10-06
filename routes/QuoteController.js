var express = require('express')
var router = express.Router()
var config = require('config')
var Quote = require('../models/QuoteModel')
var ObjectId = require('mongoose').Types.ObjectId;

/* GET quotes list. */
router.get('/', function(req, res, next) {
  Quote.find().exec(function(err, quotes) {
    if (err) return res.status(500).send({'error': err})
    else return res.send(quotes)
  })
})

/* GET quote by id. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id
  Quote.findOne({_id: new ObjectId(id)}).exec(function(err, quote) {
    if (err) return res.status(500).send({'error': err})
    else if (quote === null) return res.status(404).send({'error': 'quote not found for id=' + id})
    else return res.send(quote)
  })
})

/* POST quote. */
router.post('/', function(req, res, next) {
  let quote = new Quote(req.body)
  quote._id = new ObjectId();
  quote.validate(function(err) { if (err) logger.error(err) })
  quote.save()
    .then(quoteSaved => { return res.send(quoteSaved) })
    .catch(err => { return res.status(500).send({'error': err}) })
})

/* PUT quote by id */
router.put('/:id', function(req, res, next) {
  var id = req.params.id
  let quote = new Quote(req.body)
  Quote.findOneAndUpdate({_id: new ObjectId(id)}, quote, { new: true }).exec(function(err, quote) {
    if (err) return es.status(500).send({'error': err.errmsg})
    else if (quote == null) return res.status(404).send({'error': 'quote not found for id=' + id})
    else return res.send(quote)
  })
})

module.exports = router
