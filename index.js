const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();



document.querySelector('.js-filter-button').addEventListener('click', () => {
  const nameFilter = document.querySelector('.js-filter-name-input').value.toLowerCase();
  const dateFilter = document.querySelector('.js-filter-date-input').value;

  const filteredTodos = todoList.filter(todo => {
    const nameMatch = todo.name.toLowerCase().includes(nameFilter);
    const dateMatch = todo.dueDate.includes(dateFilter); // Assuming dueDate is always present

    return nameMatch && dateMatch;
  });
    
  renderFilterList(filteredTodos);
});

// Render summary
/*function renderSummary(filteredTodos) {
  const totalTodos = filteredTodos.length;
  document.querySelector('.js-total-todos').textContent = totalTodos;
}*/

function renderFilterList(filteredTodos = todoList) {
  // Render filteredTodos instead of todoList
  const filterListHTML = filteredTodos.map((todoObject, index) => {
    const { name, dueDate, description, imageUrl, quantity } = todoObject;
    return `
      <div>${name}</div> 
      <div>${dueDate}</div>
      <div class="description-display">${description}</div>
      <div>${imageUrl ? `<img src="${imageUrl}" alt="Todo Image">` : 'No Image'}</div>
      <input type="number" class="js-quantity-input quantity-input" value="${quantity}" placeholder="Quantity">
      <input type="number" class="js-quantity-input quantity-input" placeholder="Quantity">
      <button class="delete-todo-button js-filter-delete-todo-button">Delete</button>`;
  }).join('');

  document.querySelector('.js-filter-todo').innerHTML = filterListHTML;

  // Render summary
 // renderSummary();

  // Attach event listeners for delete and edit buttons
  document.querySelectorAll('.js-filter-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      deleteTodo(index);
    });
  });

}

// Function to delete a todo
function deleteTodo(index) {
  todoList.splice(index, 1);
  //localStorage.setItem('todoList', JSON.stringify(todoList));
  renderFilterList();
}



function renderSummary(todoList) {
  const totalTodos = todoList.length;
  document.querySelector('.js-total-todos').textContent = totalTodos;
  function renderSummary(todoList) {
    const totalTodos = todoList.length;
    document.querySelector('.js-total-todos').textContent = totalTodos;
  
    const earliestTodo = findEarliestDueTodo(todoList);
    if (earliestTodo) {
      document.querySelector('.js-earliest-todo').textContent = `Earliest Expiry: ${earliestTodo.name}, Due on: ${earliestTodo.dueDate}`;
    } else {
      document.querySelector('.js-earliest-todo').textContent = "No medicines found.";
    }
  }
  
  function findEarliestDueTodo(todoList) {
    if (todoList.length === 0) {
      return null;
    }
  
    return todoList.reduce((earliest, currentTodo) => {
      const earliestDueDate = new Date(earliest.dueDate);
      const currentDueDate = new Date(currentTodo.dueDate);
      return earliestDueDate < currentDueDate ? earliest : currentTodo;
    });
  }
  
  // Call renderSummary function in your code
  renderSummary(todoList);
}


function renderTodoList() {
  const todoListHTML = todoList.map((todoObject, index) => {
    const { name, dueDate, description, imageUrl, quantity  } = todoObject;
    return `
      <div>${name}</div> 
      <div >${dueDate}</div>
      <div class="description-display">${description}</div>
      <div>${imageUrl ? `<img src="${imageUrl}" alt="Todo Image">` : 'No Image'}</div>
      <div class="quantity-display">${quantity} quantity</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
      <button class="edit-todo-button js-edit-todo-button">Edit</button>`;
  }).join(''); 

  document.querySelector('.js-todo-list')
  .innerHTML = todoListHTML;

  renderSummary(todoList);

  //all will give us all the elements on the page that have class delete-button
  document.querySelectorAll('.js-delete-todo-button')
   .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      localStorage.setItem('todoList', JSON.stringify(todoList))
      renderTodoList();
    });
   });

   document.querySelectorAll('.js-edit-todo-button').forEach((editButton, index) => {
    editButton.addEventListener('click', () => {
      const todoToEdit = todoList[index];
      populateInputFields(todoToEdit);
      todoList.splice(index, 1);
      renderTodoList();
    });
  });
  
  
  function populateInputFields(todo) {
  const inputElement = document.querySelector('.js-name-input');
  inputElement.value = todo.name;
  
  const dateInputElement = document.querySelector('.js-due-date-input');
  dateInputElement.value = todo.dueDate;
  
  const descriptionInputElement = document.querySelector('.js-description-input');
  descriptionInputElement.value = todo.description;

  const quantityInputElement = document.querySelector('.js-quantity-input');
  quantityInputElement.value = todo.quantity;
  }

}



document.querySelector('.js-add-todo-button')
 .addEventListener('click', () => {
    addTodo();
 });


function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');

  const dueDate = dateInputElement.value;

  const descriptionInputElement = document.querySelector('.js-description-input');
  
  const description = descriptionInputElement.value;


  const imageFile = document.querySelector('.js-todo-image-input').files[0];

  const quantityInputElement = document.querySelector('.js-quantity-input');
  const quantity = quantityInputElement.value;

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageUrl = e.target.result;
      todoList.push({ name, dueDate, description, imageUrl, quantity });
      localStorage.setItem('todoList', JSON.stringify(todoList));
      inputElement.value = '';
      descriptionInputElement.value = '';
      dateInputElement.value = '';
      document.querySelector('.js-todo-image-input').value = '';
      quantityInputElement.value = '';

      renderTodoList();
    };
    reader.readAsDataURL(imageFile);
  } else {
    todoList.push({ name, dueDate, description, imageUrl: '', quantity });
    localStorage.setItem('todoList', JSON.stringify(todoList));
    inputElement.value = '';
    descriptionInputElement.value = '';
    dateInputElement.value = '';
    document.querySelector('.js-todo-image-input').value = '';
    quantityInputElement.value = '';
    renderTodoList();
  }
}



