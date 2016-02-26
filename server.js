var express = require('express')
var yaml = require('js-yaml')
var fs = require('fs')
var corser = require("corser")
var logger = require('morgan')
var assert = require('assert')
var bodyParser = require('body-parser')
var mobilesuit = require('./routes/v1/mobilesuit')

var app = express()

app.use(corser.create())

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/ping', function(req, res) {
    res.send({hello: 'gundam'})
})

var config = yaml.safeLoad(fs.readFileSync('./config/server.yml', 'utf8')).server

var port = config.port

var url = 'mongodb://' +　config.mongodb.host + '/gundam_express'

var MongoClient = require('mongodb').MongoClient

var db
MongoClient.connect(url, function(err, db) {

    assert.equal(null, err)

    mobilesuit.use(db)

    app.get('/api/v1/mobilesuits', mobilesuit.index)
    app.post('/api/v1/mobilesuits', mobilesuit.create)
    app.get('/api/v1/mobilesuits/:id', mobilesuit.show)
    app.put('/api/v1/mobilesuits/:id', mobilesuit.update)
    app.delete('/api/v1/mobilesuits/:id', mobilesuit.destroy)

})

var server = app.listen(port, function(){
    console.log('Listening on port %s...', server.address().port)
})
