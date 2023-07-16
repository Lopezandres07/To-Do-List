const taskInput = document.getElementById("newTask");
const btnTask = document.getElementById("addTask");
const btnSearch = document.getElementById("searchTask");
const totalTask = document.getElementById("totalTask");
const DoneTask = document.getElementById("finishedTask");
const taskList = document.getElementById("tasks");

const tasks = [
    {id: 1, nombre: "Hacer el desafio", completado: false},
    {id: 2, nombre: "Revisar mi correo", completado: false},
    {id: 3, nombre: "Ayudar en la casa", completado: false},
];

function renderTask(tasks) {
    let html = "";
    let finishedTask = []

    tasks.forEach((task) => {
        check = task.completado ?
        `<input onclick="changeStatus(${task.id})" type="checkbox" checked>
        `
        :
        `<input onclick="changeStatus(${task.id})" type="checkbox">
        `
        html += `
        <tr>
        <td>${task.id}</td>
        <td class="list">${task.nombre}</td>
        <td class="btn">${check}<p><i class="fa-solid fa-trash" onclick="clean(${task.id})"></i></p></td>
        <tr>
        `
        
        if (task.completado === true) {
            finishedTask.push(task);
        } 
    });

    taskList.innerHTML = html;
    totalTask.innerHTML = tasks.length;
    DoneTask.innerHTML = finishedTask.length
};

btnTask.addEventListener("click", () => {
    const taskAdded = taskInput.value;
    if (!taskAdded) {
        alert("Please whrite a task");
        return false;
    };

    const lastTask = tasks[tasks.length-1]

    const newTask = {
        id: lastTask? lastTask.id +1 : 1,
        nombre: taskAdded,
        completado: false
    };

    tasks.push(newTask);
    taskInput.value = "";

    renderTask(tasks);
});

btnSearch.addEventListener("click", () => {
    const taskRequired = taskInput.value;
    const filteredTask = tasks.filter((task) => task.nombre.includes(taskRequired));
    taskInput.value = "";


    renderTask(filteredTask);
});

function clean(id){
    const index = tasks.findIndex((ele) => ele.id == id)
    tasks.splice(index, 1);
        
    renderTask(tasks);
};

function changeStatus(id) {
    const index = tasks.findIndex((ele) => ele.id == id)

    if (tasks[index].completado === false) {
        const newStatus = {
            id: tasks[index].id,
            nombre: tasks[index].nombre,
            completado: true
        }
    
        tasks.splice(index, 1, newStatus);
    } else {
        const newStatus = {
            id: tasks[index].id,
            nombre: tasks[index].nombre,
            completado: false
        }

        tasks.splice(index, 1, newStatus);
    }

    renderTask(tasks);
};

