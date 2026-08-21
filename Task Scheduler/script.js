function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate");
    let taskTime = document.getElementById("taskTime");
    let priority = document.getElementById("priority");

    if (taskInput.value == "") {
        alert("Please enter a task");
        return;
    }

    let taskList = document.getElementById("taskList");

    let task = document.createElement("div");

    task.className = "task";

    task.innerHTML = `
        <div class="task-left">

            <input type="checkbox" onclick="completeTask(this)">

            <div class="task-info">

                <h3>${taskInput.value}</h3>

                <p>
                    📅 ${taskDate.value || "No date"}
                    &nbsp;
                    ⏰ ${taskTime.value || "No time"}

                    <span class="priority ${priority.value.toLowerCase()}">
                        ${priority.value}
                    </span>
                </p>

            </div>

        </div>

        <button class="delete-btn" onclick="deleteTask(this)">
            Delete
        </button>
    `;

    taskList.appendChild(task);

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
}


function deleteTask(button) {

    button.parentElement.remove();

}


function completeTask(checkbox) {

    let task = checkbox.parentElement.parentElement;

    if (checkbox.checked) {
        task.classList.add("completed");
    } else {
        task.classList.remove("completed");
    }

}