const textInput = document.querySelector("#todoInput");
const inputForm = document.querySelector(".inputForm");
const todoList = document.querySelector(".todoList__main");
const todoTask = document.querySelector(".todoList__foot__task");
todoTask.innerHTML = `You have ${todoList.childElementCount} pending tasks`;

const addBtn = document.querySelector(".input__btn");
const clearAllBtn = document.querySelector(".todoList__foot__clearBtn");

inputForm.addEventListener("submit", handleSubmit);
clearAllBtn.addEventListener("click", clickClearAll);

let todoArr = [];
const storageItems = JSON.parse(localStorage.getItem("todoItems"));

if (storageItems) {
  storageItems.forEach((e) => {
    addToDo(e);
    todoArr.push(e);
  });
}

function addToDo(newTodoItem) {
  const todoItem = document.createElement("div");
  todoItem.setAttribute("class", "todoList__main__item");
  todoItem.setAttribute("id", `${newTodoItem.id}`);

  const item = document.createElement("p");
  item.setAttribute("class", "todoList__main__item--text");
  item.innerText = `${newTodoItem.text}`;

  const button = document.createElement("button");
  button.setAttribute("class", "trash deleteBtn fa-solid fa-trash-can");
  button.addEventListener("click", (e) => {
    deleteHandler(todoItem, e);
  });

  todoItem.append(item);
  todoItem.append(button);
  todoList.append(todoItem);
}

function ChangeTaskNum() {
  todoTask.innerHTML = `You have ${todoList.childElementCount} pending tasks`;
}

function handleSubmit(e) {
  e.preventDefault();
  console.log(textInput.value);
  if (textInput.value == "") {
    return false;
  }
  const newTodoItem = {
    id: Date.now(),
    text: textInput.value,
  };
  todoArr.push(newTodoItem);
  localStorage.setItem("todoItems", JSON.stringify(todoArr));

  addToDo(newTodoItem);

  ChangeTaskNum();
  textInput.value = " ";
}

function deleteHandler(todoItem, e) {
  let targetId = e.target.parentElement.id;
  todoList.removeChild(todoItem);
  console.log(typeof targetId);

  todoArr = todoArr.filter((todo) => todo.id !== parseInt(targetId));
  console.log(todoArr);
  localStorage.setItem("todoItems", JSON.stringify(todoArr));
}

function clickClearAll() {
  while (todoList.hasChildNodes()) {
    todoList.removeChild(todoList.firstChild);
  }
  ChangeTaskNum();
}
