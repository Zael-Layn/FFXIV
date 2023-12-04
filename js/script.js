// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Get the form element
  var form = document.querySelector('.add-task');

  // Get the task container element
  var taskContainer = document.querySelector('.task-detail');

  // Add a submit event listener to the form
  form.addEventListener('submit', function (event) {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    // Get the input values from the form
    var titleInput = document.querySelector('#title');
    var descriptionInput = document.querySelector('#description');
    var titleValue = titleInput.value;
    var descriptionValue = descriptionInput.value;

    // Create the task card element
    var taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    // Create the delete button
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

    // Create the task title element
    var taskTitle = document.createElement('h4');
    taskTitle.textContent = titleValue;

    // Create the task description element
    var taskDescription = document.createElement('p');
    taskDescription.textContent = descriptionValue;

    // Add a click event listener to the delete button
    deleteButton.addEventListener('click', function () {
      taskCard.remove();
    });

    // Append the task content and delete button to the task card
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(deleteButton);

    // Append the task card to the task container
    taskContainer.appendChild(taskCard);

    // Clear the input values
    titleInput.value = '';
    descriptionInput.value = '';
  });
});