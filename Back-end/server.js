const express = require('express'),
	  app = express(),
	  cors = require('cors'),
	  bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
var db;

app.get('/restaurants/:id', function (req, res) {
	db.collection('restaurants').findOne({_id: ObjectID(req.params.id)},function(err, restaurant) {
		if(err){
			return res.sendStatus(500);
		}
		res.send(restaurant);
	})
})

app.get('/restaurants', function (req, res) {
	db.collection('restaurants').find().toArray(function(err, restaurants) {
		if(err){
			return res.sendStatus(500);
		}
		res.send(restaurants);
	})
})

app.put('/restaurants/:id', function (req, res) {
	db.collection('restaurants').updateOne({_id: ObjectID(req.params.id)},{$set:{feedbacks: req.body.feedbacks, ratings: req.body.ratings}},{upsert: true},function(err, restaurant) {
		if(err){
			return res.sendStatus(500);
		}
		res.send(restaurant);
	})
})
MongoClient.connect('mongodb://localhost:27017', function(err, database) {
	if(err){
		return console.log(err);
	}
	db = database.db('myapi');
	app.listen(8000, function () {
		console.log('API Started');
	})
})