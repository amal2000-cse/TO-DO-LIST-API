(function (){
    let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

async function fetchTodos(){

    //---------------------------------------------------------

    // //this is a GET request
    
    // fetch('https://jsonplaceholder.typicode.com/todos')
    // //this fetch function will return a promise
    // // if we get a promise then we can use the then method on it
    // //and we can pass a function to the then method
    // .then(function(response){
    //     console.log('response',response);
    //     //first we need to convert the response to json
    //     return response.json();//now this will return another promise
    //   //so from the second then method we can get the data
    //   //.then(function(data){ will give use the actual data
    // }).then(function(data){
    //     tasks=data.slice(0,10); //only the first 10 tasks
    //     renderList();
    //     //this data will have the actual json objects
    //     console.log('data',data);
    //     //we need to assign the data to the tasks array
    //     // tasks=data;
    //     // renderList();
    // })
    // //if some where we get a error we can call catch
    // .catch(function(error){
    //     console.log('error',error);
    // })

    //------------------------------------------------------

    //Instead of using fetch we can use async await
    try{
             //if we are using await the function name should be async
            const response=await fetch('https://jsonplaceholder.typicode.com/todos');
            //now getting data out of it
            const data=await response.json();
            tasks=data.slice(0,10);
            renderList();
        }
        catch(error){
            console.log(error);
        }

}

console.log('Working');

function addTaskToDOM(task){
  const li=document.createElement('li');
  li.innerHTML=`
  <input type="checkbox" id="${task.id}" ${task.completed ? 'checked':''}
  class="custom-checkbox">
  <label for="${task.id}">${task.title}</label>
  <img src="bin.svg" class="delete" data-id="${task.id}" />
  `;
  taskList.append(li);
}

function renderList () {
    //to render the list we need to loop through the tasks array
    taskList.innerHTML = '';
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}
 
function toggleTaskAsComplete (taskId) {
    //to toggle the task as complete we need to filter the tasks array
    //and return the task that we want to toggle
    //so we use the filter method
    //the filter method will return a new array
    //so we need to assign it to a  new variable
   const task=tasks.filter(function(task){
       return task.id === Number(taskId);
   });
   if(task.length>0){
    const currentTask=task[0];
    //to toggle the task we need to change the done property
    //so we use the not operator
    //and we assign it to the done property

    currentTask.completed=!currentTask.completed;

    renderList();
    showNotification('Task updated successfully');
    return;
   }


}

function deleteTask (taskId) {
    //to delete a task we need to filter the tasks array
    //and return all the tasks except the one that we want to delete
    //so we use the filter method
    //the filter method will return a new array
    //so we need to assign it to a new variable
    //and then we need to reassign the tasks array to the new array
    //so that the tasks array will have all the tasks except the one that we want to delete
    //so we use the const keyword
    //and we use the filter method on the tasks array
    //and we pass a function to the filter method
    //and we pass the task as an argument to the function
    //and we return the task id
    //and we check if the task id is not equal to the task id that we want to delete
    //so we use the !== operator
    //and we pass the task id as an argument to the deleteTask function
    //and we assign the tasks array to the newTasks array
    //and we call the renderList function
    
    const newTasks=tasks.filter(function(task){
        return task.id !== Number(taskId);
    });
    tasks=newTasks;
    renderList();
    showNotification('Task deleted successfully');
}

function addTask (task) {
    if(task){
        //now if we also want to POST data
        //  fetch('https://jsonplaceholder.typicode.com/todos',
        //  {
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json',
        //     },
        //     body:JSON.stringify(task),

        // })
   
        // .then(function(response){
        
        //     return response.json();//now this will return another promise
        
        // }).then(function(data){
        //     tasks.push(task);
        //     renderList();
        //     showNotification('Task added successfully');
        //     return;
        // })
        // .catch(function(error){
        //     console.log('error',error);
        // })


        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification('Task cannot be added');
}




function showNotification(text) {
    alert(text);
}

//to take input from the user, the user enters the task and press enter
//we need to listen to the enter key
function handleInputKeypress(e){
    if(e.key == 'Enter'){
        const text=e.target.value;
        //to check if the input is working in the console
        
        console.log('text',text);

    
        //saying that input cannot be empty
        if(!text){
            showNotification('Please enter a task');
            return;
        }
        //if the text is added, we need to add it to the list
        const task={
            // text:text,
            title:text,
            //for each task that is added we need to create a unique id
            //for it so we use the date.now() method, which will give us a time stamp

            id:Date.now(),
            completed:false
        }
        console.log('task',task)
        //so after adding the task the task input field should be empty
        // so we reset the value of the input field to empty
        e.target.value='';
        addTask(task);
    }

}
function handleClickListener(e){
    const target=e.target;
    console.log('target',target);

    if(target.className==='delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className==='custom-checkbox'){
        const taskId=target.id;
        toggleTaskAsComplete(taskId);
        return;
    }
    
}

function initializeApp(){
    fetchTodos();
    // to grab the text whatever the user is typing in the input field
// we need to listen to the keypress event so we use the addEventListener
addTaskInput.addEventListener('keypress', handleInputKeypress);

//attaching a event listener to the whole document 
//instead of adding eventlistener to each button
// we can use the event delegation
//so we can use the event.target to get the target element
//and then we can check if the target element is the delete button or the chekbox
document.addEventListener('click',handleClickListener);
}
initializeApp();

})()