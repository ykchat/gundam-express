var assert = require('assert')
var ObjectId = require('mongodb').ObjectID

var col

module.exports.use = function(db) {

    db.collection('mobilesuits', function(err, _col) {
        col = _col
    })

}

module.exports.index = function(req, res) {

    col.find().toArray(function(err, items) {
        assert.equal(null, err)
        res.send(items)
    })

}

module.exports.create = function(req, res) {

    var mobilesuit = req.body

    col.insert(mobilesuit, {safe:true}, function(err, result) {
        assert.equal(null, err)
        res.send({_id: mobilesuit._id})
    })

}

module.exports.show = function(req, res) {

    var id = req.params.id

    col.findOne({_id:ObjectId(id)}, function(err, mobilesuit) {
        assert.equal(null, err)
        res.send(mobilesuit)
    })

}

module.exports.update = function(req, res) {

    var id = req.params.id
    var mobilesuit = req.body

    col.update({_id: ObjectId(id)}, {$set: mobilesuit}, {safe:true}, function(err, result) {
        assert.equal(null, err)
        res.send({_id: id})
    });

}

module.exports.destroy = function(req, res) {

    var id = req.params.id

    col.remove({_id: ObjectId(id)}, {safe:true}, function(err, result) {
        assert.equal(null, err)
        res.send({_id: id})
    })

}
