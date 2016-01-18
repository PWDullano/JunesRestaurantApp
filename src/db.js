
// var db = require('pg');
var knex = require ('knex')({
  client:'pg',
  connection: process.env.DATABASE_URL || 'postgres://localhost/venues'
});

function Restaurants() {
  return knex('restaurants');
}

function Employees() {
  return knex('employees');
}

function Reviews() {
  return knex('reviews');
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
    var Object = {};
    for (var key in columns) {
      Object[key] = columns[key].defaultValue;
    }
    return(Object);
  })
)}

function reviewDefaults() {
  return (Reviews().columnInfo().then(function (columns) {
    var reviewObject = {};
    for (var key in columns) {
      reviewObject[key] = columns[key].defaultValue;
    }
    return(reviewObject);
  })
)}

function insertRestaurant(restaurant) {
  return(Restaurants().insert(restaurant));
}

function restaurant(id) {
  console.log("in restaurant retrieve: ", id);
  return(Restaurants().where('id', id))
}

function updateRestaurant(id, restaurant) {
  return(Restaurants().where('id', id).update(restaurant));
}

function deleteRestaurant(id) {
  console.log('in delete restaurant');
  return(Employees().leftJoin('restaurants', 'restaurants.id', 's.restaurant_id').where('restaurant_id', id).del().then (function () {
    console.log('about to delete restaurant of ', id)
     restaurant(id).del();
  })
)}

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

function insertReview(review) {
  console.log('insertReview with ', review);
  console.log();
  return(Reviews().insert(review));
}

function review(id) {
  return(Reviews().where('id', id))
}

function updateReview(id, review) {
  return(Reviews().where('id', id).update(review));
}

function deleteReview(id) {
  return(Reviews().where('id', id).del());
}

function restaurantReviews(id) {
  return (Restaurants().join('reviews', 'restaurants.id', 'reviews.restaurant_id').select('reviews.content', 'reviews.date', 'reviews.rating'));
}

module.exports =
{Restaurants: Restaurants,
restaurantDefaults: restaurantDefaults,
employeeDefaults: employeeDefaults,
reviewDefaults: reviewDefaults,
restaurantEmployees: restaurantEmployees,
restaurantReviews: restaurantReviews,
insertRestaurant: insertRestaurant,
restaurant: restaurant,
updateRestaurant: updateRestaurant,
deleteRestaurant: deleteRestaurant,
insertEmployee: insertEmployee,
employee: employee,
updateEmployee: updateEmployee,
deleteEmployee: deleteEmployee,
insertReview: insertReview,
review: review,
updateReview: updateReview,
deleteReview: deleteReview,
restaurantReviews: restaurantReviews
}
