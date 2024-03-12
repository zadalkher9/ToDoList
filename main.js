let input = document.querySelector('.input');
let btn = document.querySelector('.add');
let tasksDiv = document.querySelector('.tasks')

let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

// Add Task
btn.onclick = function(){
if(input.value !== ''){
    addTasksToArray(input.value);
    input.value = '';
}
}

tasksDiv.addEventListener('click' , (e) => {
    // Delete Button
    if(e.target.classList.contains('del')){
        // Remove Element From Page
        e.target.parentElement.remove();
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Toggle Done Class
        e.target.classList.toggle("done");
  }

})

function addTasksToArray(taskName){
    //Add task
    const task = {
        id: Date.now(),
        title: taskName,
        completed: false,
    }
    // Push task to Array of Tasks
    arrayOfTasks.push(task); 
    // Add Tasks To Page
    addElementsToPage(arrayOfTasks);
    // Add tasks to local storage
    addDataToLocalStorage(arrayOfTasks);


}

function addElementsToPage(arrayOfTasks){
    // Empty tasks div
    tasksDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
    // Create Main Div
      let div = document.createElement("div");
      div.className = "task";
    // Check If Task is Done
      if (task.completed) {
        div.className = "task done";
      }
      div.setAttribute("data-id", task.id);
      div.appendChild(document.createTextNode(task.title));
      
    // Create Delete Button
      let span =document.createElement('span');
      span.className = 'del';
      span.appendChild(document.createTextNode('Delete'));
    // Append Button To Main Div
      div.appendChild(span);
    // Add Task Div To Tasks Container
      tasksDiv.appendChild(div)

    });
}

function addDataToLocalStorage(arrayOfTasks){
    window.localStorage.setItem('tasks' , JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if (data) {
      let tasks = JSON.parse(data);
      addElementsToPage(tasks);
    }
}
function  deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorage(arrayOfTasks);

}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == taskId) {
        arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
      }
    }
    addDataToLocalStorage(arrayOfTasks);
  }