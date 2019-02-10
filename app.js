const form = document.querySelector('#task-form')
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
let checkCounter = 0;


const loadEventListeners = () => {
   document.addEventListener('DOMContentLoaded', getTasks);
   form.addEventListener('submit', addTask);
   taskList.addEventListener('click', removeTask);
   taskList.addEventListener('click', checkTask);
   filter.addEventListener('keyup', filterTask);
   clearBtn.addEventListener('click', clearTask);
}
const getTasks = () => {
   let tasks;

   if(localStorage.getItem('tasks') === null){
      tasks = [];
   }
   else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(task => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(task));
      li.className = 'collection-item';
   
      const checkLink = document.createElement('a');
      checkLink.className = 'check-item secondary-content';
      
      const delLink = document.createElement('a');
      delLink.className = 'delete-item secondary-content';
   
      const checkIcon = document.createElement('i');
      checkIcon.className = 'far fa-check-square';
      const delIcon = document.createElement('i');
      delIcon.className = 'far fa-trash-alt';
   
      checkLink.appendChild(checkIcon);
      delLink.appendChild(delIcon);
   
      li.appendChild(delLink);
      li.appendChild(checkLink);
   
      taskList.appendChild(li);
   })
}


const addTask = (e) => {
   if(taskInput === ''){
      alert('Please enter task!');
   }
   else{
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(taskInput.value));
      li.className = 'collection-item';

      const checkLink = document.createElement('a');
      checkLink.className = 'check-item secondary-content';
      
      const delLink = document.createElement('a');
      delLink.className = 'delete-item secondary-content';

      const checkIcon = document.createElement('i');
      checkIcon.className = 'far fa-check-square';
      const delIcon = document.createElement('i');
      delIcon.className = 'far fa-trash-alt';

      checkLink.appendChild(checkIcon);
      delLink.appendChild(delIcon);

      li.appendChild(delLink);
      li.appendChild(checkLink);

      taskList.appendChild(li);

      storeToLocalStorage();

      taskInput.value = '';
   }
   
   e.preventDefault();
}

const storeToLocalStorage = () => {
   let tasks;

   if(localStorage.getItem('tasks') === null){
      tasks = [];
   }
   else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.push(taskInput.value);

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

const checkTask = (e) => {
   if(e.target.parentElement.classList.contains('check-item')){
      checkCounter++;
      if(checkCounter % 2 !== 0){
         e.target.parentElement.parentElement.style.textDecoration = 'line-through';
      }
      else{
         e.target.parentElement.parentElement.style.textDecoration = 'initial';
      }
   }
}

const removeTask = (e) => {
   if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('Are you sure?')){
         e.target.parentElement.parentElement.remove();
         removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
   }
}

const removeTaskFromLocalStorage = (task) => {
   let tasks;

   if(localStorage.getItem('tasks') === null){
      tasks = [];
   }
   else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach((item, index) => {
      if(task.textContent === item){
         tasks.splice(index, 1);
      }
   })

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

const filterTask = (e) => {
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach(task => {
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) !== -1){
         task.style.display = 'block';
      }
      else{
         task.style.display = 'none';
      }
   })
}

const clearTask = () => {
   while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
   }
   clearTaskFromLocalStorage();
}

const clearTaskFromLocalStorage = () => {
   localStorage.clear();
}


loadEventListeners();


