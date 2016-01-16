<form class="restaurantEmployees" action="<% '/' + restaurant.id + '/admin/employees' %>" method="post">
  <fieldset>
    <legend>New Employee</legend>
    <label for="name">Name</label><br>
    <input type="text" name="name" id="name"
    value = "<%= restaurant.name %>"> <br><br>
    <label for="city">Location</label><br>
    <input type="text" name="city" id="city"
  </fieldset>
</form>
