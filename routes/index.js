var express = require('express');
var router = express.Router();
var db = require('pg');
var knex = require ('knex')({
  client:'pg',
  connection: 'postgres://localhost/venues'
});

function restaurants() {
  return knex('restaurants');
}

function restaurantsDefaults() {
  return knex(information_schema.columns).where({table_schema: 'public'},{table_name: 'restaurants'}).select(column_name, column_default).orderBy(ordinal_position);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  restaurants().then(function(results) {
    res.render('index', {restaurants:results});
  });
});

router.get ('/new', function(req, res, next) {
  restaurants().
//   SELECT column_name, column_default
// FROM information_schema.columns
// WHERE (table_schema, table_name) = ('public', 'mytable')
// ORDER BY ordinal_position;
  var defaultFields = restaurantsDefaults();
  res.render('new', {restaurant:defaultFields
  })
})

router.post ('/new', function(req, res, next) {
  var newObject =
  {name:req.body.name,
  cuisine: req.body.cuisine,
  city: req.body.city,
  state: req.body.state,
  rating: req.body.rating,
  image: req.body.image};
  restaurants().insert(newObject).then(function(results) {
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
    res.render('edit', results[0]);
  })
})

router.get('/:id/delete', function(req, res, next) {
  restaurants().where('id', req.params.id).then(function(results) {
    res.render('delete', results[0]);
  })
})

router.post('/:id', function(req, res, next) {
  restaurants().where('id', req.params.id).update(req.body).then(function() {
    res.redirect('/');
  })
})

router.post('/:id/delete', function(req, res, next) {
  restaurants().where('id', req.params.id).update(req.body).del().then(function() {
    res.redirect('/');
  })
})

module.exports = router;
