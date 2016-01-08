var express = require('express');
var router = express.Router();
var db = require('pg')
var knex = require ('knex')({
  client:'pg',
  connection: 'postgres://localhost/venues'
});

function restaurants() {
  return knex('restaurants');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  restaurants().then(function(results) {
    console.log(results);
    res.render('index', {restaurants:results);
  });
});

module.exports = router;
