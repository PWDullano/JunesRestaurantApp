
// var db = require('pg');
var knex = require ('knex')({
  client:'pg',
  connection: 'postgres://localhost/venues' || process.env.DATABASE_URL
});

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

function insertRestaurant(restaurant) {
  return(restaurants().insert(restaurant));
}

function getRestaurant(id) {
  return(restaurants().where('id', id))
}

function updateRestaurant(id, restaurant) {
  return(restaurants().where('id', id).update(restaurant));
}

function deleteRestaurant(id) {
  return( restaurants().where('id', id).del());
}

module.exports =
{restaurants: restaurants,
restaurantDefaults: restaurantDefaults,
insertRestaurant: insertRestaurant,
getRestaurant: getRestaurant,
updateRestaurant: updateRestaurant,
deleteRestaurant: deleteRestaurant}
