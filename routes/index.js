var express = require('express');
var router = express.Router();

var db = require('../src/db.js');
var states = require("./states.js");
var cuisines = require("./cuisines.js");
var ratings = require("./ratings.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Restaurants().then(function(results) {
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
    db.Restaurants().then(function(restaurants) {
      res.render('admin/index', {restaurants:restaurants});
    })
  });

router.get('/:id', function(req, res, next) {
  db.restaurant(req.params.id).then(function(restaurants) {
    db.restaurantReviews(req.params.id).then(function(reviews) {
      res.render('show', {restaurant:restaurants[0], reviews:reviews});
    })
  })
})

router.get('/:id/edit', function(req, res, next) {  console.log('get id/edit');
db.restaurant(req.params.id).then(function(results) {
  res.render('edit', {route:req.originalUrl, restaurant:results[0], states:states, cuisines:cuisines, ratings:ratings});
})
})

router.post('/:id/edit', function(req, res, next) {
  db.updateRestaurant(req.params.id, req.body).then(function() {
    res.redirect('/');
  })
})

router.get('/:id/delete', function(req, res, next) {
  db.deleteRestaurant(req.params.id).then(function(results) {
    res.redirect('/');
  })
})

router.post('/:id/delete', function(req, res, next) {
  db.deleteRestaurant(req.params.id).then(function() {
    res.redirect('/');
  })
})

router.get('/:id/admin/edit', function(req, res, next) {
  db.restaurant(req.params.id).then(function(restaurants) {
    db.restaurantEmployees(req.params.id).then(function(employees) {
    res.render('admin/edit',
    {route: req.originalUrl,
    restaurant: restaurants[0],
    employees: employees,
    states: states,
    cuisines: cuisines,
    ratings: ratings});
    })
  })
})

router.post('/:id/admin/edit', function(req, res, next) {
  db.updateRestaurant(req.params.id, req.body).then(function() {
    res.redirect('/admin');
  })
})

router.get('/:id/admin/delete', function(req, res, next) {
  db.deleteRestaurant(req.params.id).then(function(results) {
    res.redirect('/admin');
  })
})

router.post('/:id/admin/delete', function(req, res, next) {
  db.deleteEmployee(req.params.id).then(function() {
    res.redirect('/admin');
  })
})

router.get ('/:id/admin/edit/newEmployee', function(req, res, next) {
  db.employeeDefaults().then(function(results) {
    res.render('admin/newEmployee', {route:req.originalUrl, employee:results, restaurant_id:req.params.id});
  });
});

router.post('/:id/admin/edit/newEmployee', function(req, res, next) {
  db.insertEmployee(req.body).then(function(results) {
    res.redirect('/admin');
  })
})

router.get ('/:id/admin/edit/employee', function(req, res, next) {
  db.employee(req.params.id).then(function(employees) {
    res.render('admin/employee', {route:req.originalUrl, employee:employees[0], restaurant_id:req.params.id});
  });
});

router.post('/:id/admin/edit/employee', function(req, res, next) {
  db.updateEmployee(req.params.id, req.body).then(function(results) {
    res.redirect('/admin');
  })
})


module.exports = router;
