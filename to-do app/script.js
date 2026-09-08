const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const displayTodos = () => {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${todo}</span>
            <button class="delete" onclick="deleteTodo(${index})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const task = input.value.trim();

    if (task === "") {
        return;
    }

    todos.push(task);

    saveTodos();
    displayTodos();

    input.value = "";
});

const deleteTodo = (index) => {
    todos.splice(index, 1);

    saveTodos();
    displayTodos();
};

displayTodos();
