//Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
const buttonDelete = document.getElementById("buttonDelete");
document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    buttonDelete.addEventListener("click", deleteTickTasks);
    displayTasks();
});

function addTask() {
    console.log("Running add task")

    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({
            text: newTask,
            disabled: false,

        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();

    }
}

function deleteAllTasks() {
    console.log("test");
    todo = [];
    saveToLocalStorage();
    displayTasks();
}
function deleteTickTasks() {
    console.log("delete");
    todo = todo.filter(task => !task.disabled);
    saveToLocalStorage();
    displayTasks();
}

function displayTasks() {
    console.log("display task function is running")
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
        <div class="todo-container">
        <input type="checkbox" class="todo-checkbox"
        id="input-${index}" ${item.disabled ? "checked" : ""
            }>
        <p id="todo-${index}" class="${item.disabled ? "disabled" : ""
            }" onclick="editTask(${index})">${item.text}</p>
        </div>
        `;
        console.log(p)
        console.log(p.innerHTML)
        p.querySelector(".todo-checkbox").addEventListener("change", () =>
            toggleTask(index)
        );
        todoList.appendChild(p);
    });
    todoCount.textContent = todo.length;

}
function editTask(index) {
    console.log("index", index)
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");
    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();
    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    })
}
function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage() {
    console.log("saved running function")
    localStorage.setItem("tpdo", JSON.stringify(todo));
}











