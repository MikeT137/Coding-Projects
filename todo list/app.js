//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addToDo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterToDo)
//Functions
function addToDo(event) {
    //Prevent form from submitting
    event.preventDefault();
    //Todo Div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo");
    //Create Li
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Add todo local storage
    saveLocalTodos(todoInput.value);
    //Checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash button
    const trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //Delete todo
    if(item.classList[0] === "trash-btn"){
        //Animation
        item.parentElement.classList.add("fall");
        removeLocalTodos(item.parentElement)
        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove();
        })

    }
    //Checkmark
    if(item.classList[0] === "complete-btn"){
        item.parentElement.classList.toggle('completed');
    }
}

function filterToDo(e) {
    todoList.childNodes.forEach(function(todo) {
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
            break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
            break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
            break;
        }
    })
}

function saveLocalTodos(todo){
    //Checking if there already is local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //Checking if there already is local storage
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo");
        //Create Li
        const newTodo = document.createElement("li")
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //Checkmark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class= "fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement("button")
        trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //Checking if there already is local storage
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}