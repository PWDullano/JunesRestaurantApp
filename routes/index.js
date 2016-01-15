var express = require('express');
var router = express.Router();

var db = require('../src/db.js');
var states = require("./states.js");
var cuisines = require("./cuisines.js");
var ratings = require("./ratings.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.restaurants().then(function(results) {
    res.render('index', {restaurants:results});
  });
});

router.get ('/new', function(req, res, next) {
  db.restaurantDefaults().then(function(results) {
      res.render('new', {route:req.originalUrl, restaurant:results, states:states, cuisines:cuisines, ratings:ratings});
  });
});

router.post ('/new', function(req, res, next) {
  db.insertRestaurant(req.body).then(function(results) {
    res.redirect('/');
  })
})

router.get ('/admin', function(req, res, next) {
  console.log('in admin page');
    db.restaurantEmployees().then(function(results) {
      console.log('index.js rest/emp results = ', results);
      res.render('admin', {restaurantEmployees:results});
    })
  });

router.post ('/admin', function(req, res, next) {
    res.redirect('/');
  });

router.get('/:id', function(req, res, next) {
  console.log('***reqParamId = ', req.params.id);
  db.getRestaurant(req.params.id).then(function(results) {
    res.render('show', {restaurant:results[0]});
  })
})

router.get('/:id/edit', function(req, res, next) {  console.log('get id/edit');
  db.getRestaurant(req.params.id).then(function(results) {
    res.render('edit', {route:req.originalUrl, restaurant:results[0], states:states, cuisines:cuisines, ratings:ratings});
  })
})

router.get('/:id/delete', function(req, res, next) {
  db.deleteRestaurant(req.params.id).then(function(results) {
    res.redirect('/');
  })
})

router.post('/:id/edit', function(req, res, next) {
  db.updateRestaurant(req.params.id, req.body).then(function() {
    res.redirect('/');
  })
})

router.post('/:id/delete', function(req, res, next) {
  db.deleteRestaurant(req.params.id).then(function() {
    res.redirect('/');
  })
})

module.exports = router;
