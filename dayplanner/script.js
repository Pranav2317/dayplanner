document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let time = document.getElementById("task-time").value;
    let taskText = document.getElementById("task-input").value;

    if (time === "" || taskText === "") {
        alert("Please enter both time and task!");
        return;
    }

    let task = { time, taskText, completed: false };
    saveTask(task);
    renderTask(task);
    document.getElementById("task-input").value = "";
}

function renderTask(task) {
    let ul = document.getElementById("task-list");

    let li = document.createElement("li");
    li.innerHTML = `<span>${task.time} - ${task.taskText}</span> 
                    <button class="complete-btn">✔</button> 
                    <button class="delete-btn">✖</button>`;

    if (task.completed) li.classList.add("completed");

    li.querySelector(".complete-btn").addEventListener("click", function () {
        task.completed = !task.completed;
        updateTasks();
        li.classList.toggle("completed");
    });

    li.querySelector(".delete-btn").addEventListener("click", function () {
        deleteTask(task);
        li.remove();
    });

    ul.appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(renderTask);
}

function updateTasks() {
    let tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
        let [time, taskText] = li.querySelector("span").innerText.split(" - ");
        let completed = li.classList.contains("completed");
        tasks.push({ time, taskText, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.time !== taskToDelete.time || task.taskText !== taskToDelete.taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
