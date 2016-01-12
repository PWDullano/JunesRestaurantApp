var express = require('express');
var router = express.Router();
var db = require('pg');
var knex = require ('knex')({
  client:'pg',
  connection: 'postgres://localhost/venues'
});
var states = require("./states.js");
var cuisines = require("./cuisines.js");
var ratings = require("./ratings.js");

function restaurants() {
  return knex('restaurants');
}

function restaurantDefaults() {
 return (knex('restaurants').columnInfo().then(function (columns) {
    var restaurantObject = {};
    for (var key in columns) {
      restaurantObject[key] = columns[key].defaultValue;
    }
    return restaurantObject;
  })
)}

/* GET home page. */
router.get('/', function(req, res, next) {
  restaurants().then(function(results) {
    res.render('index', {restaurants:results});
  });
});

router.get ('/new', function(req, res, next) {
  restaurantDefaults().then(function(results) {
      res.render('new', {route:req.originalUrl, restaurant:results, states:states, cuisines:cuisines, ratings:ratings});
  });
});

router.post ('/new', function(req, res, next) {
  restaurants().insert(req.body).then(function(results) {
    res.redirect('/');
  })
})

router.get('/:id', function(req, res, next) {
  restaurants().where('id', req.params.id).then(function(results) {
    res.render('show', {restaurant:results[0]});
  })
})

router.get('/:id/edit', function(req, res, next) {
  restaurants().where('id', req.params.id).then(function(results) {
    res.render('edit', {route:req.originalUrl, restaurant:results[0], states:states, cuisines:cuisines, ratings:ratings});
  })
})

router.get('/:id/delete', function(req, res, next) {
  restaurants().where('id', req.params.id).del().then(function(results) {
    res.redirect('/');
  })
})

router.post('/:id/edit', function(req, res, next) {
  restaurants().where('id', req.params.id).update(req.body).then(function() {
    res.redirect('/');
  })
})

router.post('/:id/delete', function(req, res, next) {
  restaurants().where('id', req.params.id).del().then(function() {
    res.redirect('/');
  })
})

module.exports = router;
