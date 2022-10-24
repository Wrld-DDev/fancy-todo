let tasks = [
  
];

function getTasksFromStorage(){
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))
  tasks = retrievedTasks ?? []
  
}
getTasksFromStorage()

function fillTasks() {
  document.getElementById("sub-container").innerHTML = "";
  let index = 0;
  for (task of tasks) {
    let content = `
                    <div class="task ${task.isDone ? 'done' : ''}">
                        <div id="task-info">
                            <h3 style="display: inline; ">${task.title}</h3>
                              <div id="dates">
                                <span class="material-symbols-outlined">
                                    calendar_month
                                </span>
                                    <span id="date" >
                                      ${task.date} 
                                    </span>
                              </div>
                        </div>
                            <div id="task-btn">
                              ${task.isDone ? 
                                  ``
                                  
                                  : 

                                  `<button onclick="editTask(${index})" id="edit-btn" class="unit">
                                    <span class="material-symbols-outlined">
                                      edit
                                    </span>
                                  </button>
                                  `
                                }
                              
                              ${task.isDone ? 
                              
                                `
                                <button onclick="toggleTaskCompletion(${index})" id="check-btn" class="unit" style="background-color: #b73239; color: white;   box-shadow: none;">
                                    <span class="material-symbols-outlined">
                                      cancel
                                    </span>
                                </button>
                              `
                              
                              :
                              
                              ` <button onclick="toggleTaskCompletion(${index})"
                                  id="check-btn" class="unit">
                                    <span class="material-symbols-outlined">
                                      check
                                    </span>
                                </button>`}
                              
                              ${task.isDone ? 
                                ``
                              
                              :

                              `<button onclick="deleteTask(${index})" id="delete-btn"  class="unit">
                                <span class="material-symbols-outlined">
                                  delete
                                </span></button>`}
                              
                            </div>
                    </div>
            `;

    document.getElementById("sub-container").innerHTML += content;
    index++;
  }
}
fillTasks();

document.getElementById("add-task").addEventListener("click", function () {
  let now = new Date();
  let date =
    now.getDate() +
    "/" +
    (now.getMonth() + 1) +
    "/" +
    now.getFullYear() +
    " | " +
    now.getHours() +
    ":" +
    now.getMinutes();
  let taskName = prompt("Please enter the task title :");
  if (taskName == null){
    return taskName
  }else{

    let taskObj = {
      title: taskName,
      date: date,
      isDone: false,
    };
    tasks.push(taskObj);
    storeTasks();
    fillTasks();
  }
});

function deleteTask(index) {
  let task = tasks[index];
  let isConfirmed = confirm(`Do you want to delete this task : ${task.title}`);
  if (isConfirmed) {
    tasks.splice(index, 1);
    storeTasks()
    fillTasks();
  }
}

function editTask(index){
  let task = tasks[index];
  let newTaskTitle = prompt("Please enter the new task title :", task.title);
  if (newTaskTitle.value == task){
    return task
  }else{
    task.title = newTaskTitle
    storeTasks()
    fillTasks()

  }
}

function toggleTaskCompletion(index){
  let task = tasks[index]
  task.isDone = !task.isDone
  storeTasks()
  fillTasks()
}


function storeTasks(){
  let tasksToString = JSON.stringify(tasks)
  localStorage.setItem("tasks",tasksToString)
}