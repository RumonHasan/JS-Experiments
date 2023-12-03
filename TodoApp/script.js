// selectors
const todoContainer = document.querySelector('.todo-container');
const input = document.querySelector('input');
const submitButtonElement = document.querySelector('button');
const description = document.querySelector('textarea');

// variables
let todos = [];

// making new todos
class Todo {
  constructor(todoText, todoDescription) {
    this.todoText = todoText;
    this.todoDescription = todoDescription;
    this.todoId = this.generateRandomId();
    this.todoState = false;
  }
  generateRandomId() {
    return Math.floor(Math.random() * 1000000);
  }
}

// function to create new todo element; and returns dom element
function createNewTodoElement(todoObject) {
  const element = document.createElement('div');
  element.textContent = todoObject.todoText;
  const description = document.createElement('p');
  description.textContent = todoObject.todoDescription;
  element.appendChild(description);
  element.setAttribute('id', `${todoObject.todoId}-todo`);
  element.classList.add('todo');

  // delete button
  const deleteElement = document.createElement('button');
  deleteElement.innerText = 'delete';
  deleteElement.addEventListener('click', () => {
    removeTodoFromDom(todoObject.todoId);
  });
  element.appendChild(deleteElement);
  return element;
}

// add to dom
function addTodo(todo) {
  const todoElement = createNewTodoElement(todo);
  return todoContainer.appendChild(todoElement);
}

// removing that particular dom element
function removeTodoFromDom(removeId) {
  const getDeleteDom = document.getElementById(`${removeId}-todo`);
  removeFromArray(removeId);
  console.log(todos);
  return todoContainer.removeChild(getDeleteDom);
}

// remove from array
function removeFromArray(removeId) {
  return (todos = todos.filter((todo) => todo.todoId !== removeId));
}

// event listeners
submitButtonElement.addEventListener('click', () => {
  if (input && description) {
    const newTodo = new Todo(input.value, description.value);
    todos.push(newTodo);
    console.log(todos);
    addTodo(newTodo);
  }
});
