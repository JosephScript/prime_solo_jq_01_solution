$(document).ready(function() {

  // get a jQuery reference to the form
  var $form = $('#EmployeeInfo');

  // get a reference to the list
  var $Employees = $('#Employees');

  // run an event when the form submits
  $form.on('submit', function(e) {
    try {
      // get data from array
      var formArray = $(this).serializeArray();

      // turn the array into an object
      var data = {};
      $(formArray).each(function(index, obj) {
        data[obj.name] = obj.value;
      });

      // feed this into the Employee constructor
      var employee = new Employee(data.firstName,
        data.lastName,
        data.empNum,
        data.title,
        data.score,
        data.salary);

      // append it to the employee list
      appendEmployee(employee);
    } catch (ex) {
      console.log(ex);
    } finally {
      e.preventDefault();
    }
  });

  // constructor for employee
  var Employee = function(firstName, lastName, empNum, title, score, salary) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.empNum = empNum;
      this.title = title;
      this.score = score;
      this.salary = salary;
    };

  // function to append employees
  function appendEmployee(emp) {
      var $li = $('<li>');

      // bootstrap class
      // colors per score: handled by class
      $li.attr('class', 'list-group-item');

      // delete button
      var $button = $('<button>');
      $button.text('Delete');
      $button.attr('class', 'btn btn-danger js-delete');

      $li.append($button);

      var $p = $('<p>');
      $p.text(
        emp.firstName + ' ' +
        emp.lastName + ', ' +
        emp.empNum + ', ' +
        emp.title + ', ' +
        emp.salary
      );
      $li.append($p);

      // create a badge, with color equal to their score
      var $badge = $('<span>');
      $badge.text(emp.score);
      $badge.attr('class', 'badge score' + emp.score);
      $li.append($badge);

      $Employees.append($li);
    }

  // function to delete employees
  $Employees.on('click', '.js-delete', function(e) {
      e.preventDefault();
      $(this).parent().remove();
    });
});
