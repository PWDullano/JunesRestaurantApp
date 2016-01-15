
// var db = require('pg');
var knex = require ('knex')({
  client:'pg',
  connection: 'postgres://localhost/venues'
});

function restaurants() {
  return knex('restaurants');
}

function restaurantEmployees() {
  return (knex.select('employees.first_name', 'employees.last_name', 'restaurants.name', 'restaurants.id').from('restaurants').join('employees', 'restaurants.id', 'employees.restaurantID'));
};

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
restaurantEmployees: restaurantEmployees,
insertRestaurant: insertRestaurant,
getRestaurant: getRestaurant,
updateRestaurant: updateRestaurant,
deleteRestaurant: deleteRestaurant}
