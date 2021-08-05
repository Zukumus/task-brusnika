const inputNewTask = document.getElementById('input-new-task');
const buttonNewTask = document.getElementById('button-new-task');
const fillListTask = document.getElementById('list__task-wrapper-JS');
// array Task
let listTask;
// array status 
let todoItemsElemsStatus = [];

// check localStorage
!localStorage.tasks ? listTask = [] : listTask = JSON.parse(localStorage.getItem('tasks'));
// add new task
buttonNewTask.addEventListener('click', addTaskLocalStorage);
inputNewTask.addEventListener('keydown', inputTaskEnter)
//


function Task(description) {
   this.description = description;
   this.completed = false;
};


const createTemplate = (task, index) => {
   return `
           
   <div class="list__task-wrapper-JS ${task.completed ? 'checked' : ''}">
      <div class="list__desription-task-JS">${task.description}</div>
      <div class="list__buttons-tasks-JS"></div>
      <input onclick="completeTask(${index})"class="list__button-task-complete-JS" type="checkbox" ${task.completed ? 'checked' : ''}>
      <button onclick="deleteTask(${index})" class="list__button-task-JS">Удалить</button>
   </div>

   `
};

function addFillHtmlTaskList() {
   fillListTask.innerHTML = '';
   if (listTask) {
      filterTask();
      listTask.forEach((item, index) => {
         fillListTask.innerHTML += createTemplate(item, index);
      });
      todoItemsElemsStatus = document.querySelectorAll('.list__task-wrapper-JS');
   };
};
//check list task
addFillHtmlTaskList();
//
function filterTask() {
   const activeTask = listTask.length && listTask.filter(item => item.completed == false);
   const completedTask = listTask.length && listTask.filter(item => item.completed == true);
   listTask = [...activeTask, ...completedTask];
}

// 


//completeTask
function completeTask(index) {
   listTask[index].completed = !listTask[index].completed;
   if (listTask[index].completed) {

      console.log(todoItemsElemsStatus)
      todoItemsElemsStatus[index].classList.add('checked');
      // todoItemsElemsStatus[index].style = 'animation: opacity 1.5s ease-in-out'
   } else {
      console.log(todoItemsElemsStatus)
      // todoItemsElemsStatus[index].style = 'animation: opacity 1.5s ease-in-out'
      todoItemsElemsStatus[index].classList.remove('checked');
   }
   updateLocalStorage();
   setTimeout((index) => { addFillHtmlTaskList() }, 1000)

};

//DELETE TASK
function deleteTask(index) {
   todoItemsElemsStatus[index].classList.add('delete-task')
   setTimeout(() => {
      listTask.splice(index, 1);
      updateLocalStorage();
      addFillHtmlTaskList();
   }, 1000);
};

// work add and update Local
function updateLocalStorage() {
   localStorage.setItem('tasks', JSON.stringify(listTask));
};

function addTaskLocalStorage() {
   listTask.push(new Task(inputNewTask.value));
   updateLocalStorage();
   addFillHtmlTaskList();
   inputNewTask.value = '';
};

function inputTaskEnter(event) {
   if (event.keyCode === 13) {
      addTaskLocalStorage();
   }
}