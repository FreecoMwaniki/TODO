const userInput = document.querySelector("#todo-input");
const todosWrapper = document.querySelector(".todos");
const addButton = document.getElementById("add-button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodo() {
  const userValue = userInput.value.trim();
  if (userValue) {
    todos.push(userValue);
    localStorage.setItem("todos", JSON.stringify(todos));
    userInput.value = "";
    renderTodos();
  }
}

function renderTodos() {
  todosWrapper.innerHTML = todos.length
    ? todos
        .map((item, index) => (
          `<li>
            ${item}
            <button onclick="removeTodo(${index})">del</button>
          </li>`
        ))
        .join("")
    : "<li>No items to show</li>";
}

function removeTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

addButton.addEventListener("click", addTodo);
userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

renderTodos(); // Initial render