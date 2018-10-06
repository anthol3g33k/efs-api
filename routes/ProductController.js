var express = require('express')
var router = express.Router()
var config = require('config')
var Product = require('../models/ProductModel')

/* GET products list. */
router.get('/', function(req, res, next) {
  Product.find().exec(function(err, products) {
    if (err) return res.status(500).send({'error': err})
    else return res.send(products)
  })
})

/* GET product by id. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id
  Product.findOne({_id: id}).exec(function(err, product) {
    if (err) return res.status(500).send({'error': err})
    else if (product === null) return res.status(404).send({'error': 'product not found for id=' + id})
    else return res.send(product)
  })
})

/* POST product. */
router.post('/', function(req, res, next) {
  let product = new Product(req.body)
  product.validate(function(err) { if (err) logger.error(err) })
  product.save()
    .then(productSaved => { return res.send(productSaved) })
    .catch(err => { return res.status(500).send({'error': err}) })
})

/* PUT product by id */
router.put('/:id', function(req, res, next) {
  var id = req.params.id
  let product = new Product(req.body)
  Product.findOneAndUpdate({_id: id}, product, { new: true }).exec(function(err, product) {
    if (err) return es.status(500).send({'error': err.errmsg})
    else if (product == null) return res.status(404).send({'error': 'product not found for id=' + id})
    else return res.send(product)
  })
})

module.exports = router
