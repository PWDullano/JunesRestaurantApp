
// var db = require('pg');
var knex = require ('knex')({
  client:'pg',
  connection: 'postgres://localhost/venues'
});

function Restaurants() {
  return knex('restaurants');
}

function Employees() {
  return knex('employees');
}

function restaurantEmployees(id) {
  return(Restaurants().rightJoin('employees', 'employees.restaurant_id', 'restaurants.id').where('restaurant_id', id));
};

function restaurantDefaults() {
 return (Restaurants().columnInfo().then(function (columns) {
    var restaurantObject = {};
    for (var key in columns) {
      restaurantObject[key] = columns[key].defaultValue;
    }
    return(restaurantObject);
  })
)}

function employeeDefaults() {
 return (Employees().columnInfo().then(function (columns) {
    var employeeObject = {};
    for (var key in columns) {
      employeeObject[key] = columns[key].defaultValue;
    }
    return(employeeObject);
  })
)}

function insertRestaurant(restaurant) {
  return(Restaurants().insert(restaurant));
}

function restaurant(id) {
  return(Restaurants().where('id', id))
}

function updateRestaurant(id, restaurant) {
  return(Restaurants().where('id', id).update(restaurant));
}

function deleteRestaurant(id) {
  return( (Employees().leftJoin('restaurants', 'employees.restaurant_id', 'restaurants.id').where('id', id).del()).then(restaurant(id).del()));
}

function insertEmployee(employee) {
  return(Employees().insert(employee));
}

function employee(id) {
  return(Employees().where('id', id))
}

function updateEmployee(id, employee) {
  return(Employees().where('id', id).update(employee));
}

function deleteEmployee(id) {
  return(Employees().where('id', id).del());
}

function restaurantReviews(id) {
  return (Restaurants().join('reviews', 'restaurants.id', 'reviews.restaurant_id').select('reviews.content', 'reviews.date', 'reviews.rating'));
}

module.exports =
{Restaurants: Restaurants,
restaurantDefaults: restaurantDefaults,
employeeDefaults: employeeDefaults,
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
