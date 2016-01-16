
// var db = require('pg');
var knex = require ('knex')({
  client:'pg',
  connection: 'postgres://localhost/venues'
});

function restaurants() {
  return knex('restaurants');
}

function restaurantEmployees() {
  return(knex('employees').join('restaurants', 'employees.restaurant_id', 'restaurants.id'));
};
//   return (knex.select('employees.first_name', 'employees.last_name', 'restaurants.name', 'restaurants.id').from('restaurants').join('employees', 'restaurants.id', 'employees.restaurantID'));
// };

function restaurantDefaults() {
 return (knex('restaurants').columnInfo().then(function (columns) {
   console.log('columninfo = ', columns)
    var restaurantObject = {};
    for (var key in columns) {
      restaurantObject[key] = columns[key].defaultValue;
      console.log(restaurantObject);
    }
    return(restaurantObject);
  })
)}

function insertRestaurant(restaurant) {
  return(restaurants().insert(restaurant));
}

function restaurant(id) {
  return(restaurants().where('id', id))
}

function updateRestaurant(id, restaurant) {
  return(restaurants().where('id', id).update(restaurant));
}

function deleteRestaurant(id) {
  return( restaurants().where('id', id).del());
}

function insertEmployee(employee) {
  return(employees().insert(employee));
}

function employee(id) {
  return(employees().where('id', id))
}

function updateEmployee(id, employee) {
  return(employees().where('id', id).update(employee));
}

function deleteEmployee(id) {
  return( employees().where('id', id).del());
}

function restaurantReviews(id) {
  return ( knex('restaurants').join('reviews', 'restaurants.id', 'reviews.restaurant_id').select('reviews.content', 'reviews.date', 'reviews.rating'));
}

module.exports =
{restaurants: restaurants,
restaurantDefaults: restaurantDefaults,
restaurantEmployees: restaurantEmployees,
restaurantReviews: restaurantReviews,
insertRestaurant: insertRestaurant,
restaurant: restaurant,
updateRestaurant: updateRestaurant,
deleteRestaurant: deleteRestaurant,
insertEmployee: insertEmployee,
employee: employee,
updateEmployee: updateEmployee,
deleteEmployee: deleteEmployee}
