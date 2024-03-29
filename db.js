var mongoose = require('mongoose')
var config = require('config')

//Set up default mongoose connection
mongoose.connect(config.mongodb.uri, { useNewUrlParser: true })
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise
//Get the default connection
var db = mongoose.connection
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
