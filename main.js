var tasks = [
    {
        "title":"قراءة الكتاب" , 
        "date":  "10/4/2010",
        "isCompleted": false

    },
    {
        "title":"انهاء المشروع النهائي" , 
        "date":  "10/4/2010",
        "isCompleted": true
    },
    
]

getTasksFromStorage()


function getCurrentDate() {

let currentDate = new Date();

let day = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();

let dateString = day + "/" + month + "/" + year;

return dateString;
}

function displayTasks(){
let myTasks = document.getElementById('tasks');
myTasks.innerHTML = ''
var index = 0;
for(task of tasks){
    let content = ` <div class="task ${task.isCompleted? 'done':''}">
                    <div class="taskInfo">
                        <h2>${task.title}</h2>
                        <div id="date">
                            <i class="fa-solid fa-calendar-days"></i>
                            <span>${task.date}</span>
                        </div>
                    </div>
                    <div class="taskAction">
                        <button class="deleteBtn circular" onclick='deleteTask(${index})'>
                            <i class="fa-solid fa-trash-can"></i>
                        </button>

                        ${task.isCompleted? `<button class="incompleteBtn circular" onclick="incompleteTask(${index})" >
                            <i class="fa-solid fa-xmark"></i>
                        </button>` : `<button class="completeBtn circular" onclick="isCompletedTask(${index})">
                            <i class="fa-solid fa-check"></i>
                        </button>`}

                        

                        <button class="updateBtn circular" onclick='UpdateTask(${index})'>
                            <i class="fa-solid fa-pencil"></i>
                        </button>

                    </div>
                </div>
`
    myTasks.innerHTML += content
    index++
}

}
displayTasks()

function addTask(){
let addButton = document.querySelector('.addBtn') 
addButton.addEventListener('click' , function(){
let addedTask = window.prompt('الرجاء ادخال المهمة')
var task = {
'title':addedTask ,
'date':  getCurrentDate() , 
"isCompleted": false   
}
tasks.push(task)

storageTasks()
displayTasks()
})
}
addTask()

function deleteTask(index){
let task = tasks[index]
var isConfirmed =  window.confirm("هل انت متاكد من حذف مهمة : " + task.title)
if(isConfirmed === true){
tasks.splice(index , 1)
storageTasks()
displayTasks()
}
}


function UpdateTask(index){
let task = tasks[index]
let newTaskTitle = window.prompt('الرجاء ادخال عنوان المهمة الجديد' , task.title)
task.title = newTaskTitle
storageTasks()
displayTasks()
}

function isCompletedTask(index){
let task = tasks[index];
task.isCompleted = true;
storageTasks()
displayTasks()

}

function incompleteTask(index){
let task = tasks[index];
task.isCompleted = false;
storageTasks()
displayTasks()
}

function storageTasks(){
let taskToString = JSON.stringify(tasks)
localStorage.setItem('myTasks' , taskToString)
}

function getTasksFromStorage(){
let retrievedTasks = JSON.parse(localStorage.getItem('myTasks'))
tasks = retrievedTasks ?? [] 
}
