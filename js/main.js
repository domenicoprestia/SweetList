const formEl = document.getElementById('form')
const todoInputEl = document.getElementById('todo_input')
const todoListContainer = document.getElementById('todo_list') //querySelector gets the first element with a given ID
var checker;
var checkFirst = false;
var alertText;
var counter = 0;

formEl.addEventListener('submit',(element) => {
    element.preventDefault() 
    const inputTodo = todoInputEl.value;  //gets the value of a given element
    if(!inputTodo && !checker){
        displayError();
    }
    else
    {
        storeToLocalStorage(inputTodo)
        displayNewTask(inputTodo)
    }
    todoInputEl.value = ""
})

todoInputEl.addEventListener('input', (element) => {
    document.getElementById('alert').textContent = "Powered by Sweet notes 📝"
})

todoListContainer.addEventListener('click', (e) => {
    optionClicked(e.target)
})

document.addEventListener('DOMContentLoaded', displayFormLocalStorage)
document.addEventListener('DOMContentLoaded', updateTimeData)

function updateTimeData()
{
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    months = ['January', 'Februaray', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var day = new Date()
    document.getElementById('todaysDay').textContent = days[day.getDay()]
    document.getElementById('todaysDate').textContent = `${months[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()}`

}

function optionClicked(item)
{
    const todoLiEl = item.closest("li")
    if(item.classList.contains('fa-trash') || item.id === 'trash')
    {
        todoLiEl.classList.remove('bounceIn')
        todoLiEl.classList.add('bounceOutRight')
        setTimeout(() => {
            todoLiEl.remove()
        }, 1000);
        deleteDataFromLocalStorage(todoLiEl)
    }
    if(item.classList.contains('fa-edit') || item.id === 'edit')
    {
        todoInputEl.value = todoLiEl.textContent.trim();
        todoLiEl.classList.add('bounceOutUp')
        editItemFromLocalStorage(todoLiEl);
        setTimeout(() => {
            todoLiEl.remove();
        }, 1000);   
    }
    if(item.classList.contains('fa-check') || item.id === 'check')
    {
        todoLiEl.classList.add('bounceOutDown')
        todoLiEl.firstElementChild.classList.add('completed')
        deleteDataFromLocalStorage(todoLiEl)
        setTimeout(() => {
            todoLiEl.remove()
        }, 1000);
    }
}

//Local Storage usation
function storeToLocalStorage(toDo){
    let todoArr;
    if(localStorage.getItem('todos') === null){
        todoArr = [];
    }
    else
    {
        todoArr = JSON.parse(localStorage.getItem('todos'))
    }
    todoArr.push(toDo)
    localStorage.setItem('todos', JSON.stringify(todoArr));
}

function displayFormLocalStorage(toDo){
    console.log('Display content...')
    const todoArr = JSON.parse(localStorage.getItem('todos'))
    for(const todo of todoArr){
        displayNewTask(todo)
    }
}

function deleteDataFromLocalStorage(item){
    const todoArr = JSON.parse(localStorage.getItem('todos'))
    const todoItems = todoArr.filter((todo) => item.textContent.trim() !== todo)
    console.log(todoItems)
    localStorage.setItem('todos', JSON.stringify(todoItems))
}

function editItemFromLocalStorage(item){
    deleteDataFromLocalStorage(item);
}

//display 
function displayError(){
    alertText = document.getElementById('alert')
    alertText.textContent = "Be sure to insert something to do :)"
    checker = true;
}

function displayNewTask(toDo){
    const liEl = document.createElement('li')
    liEl.classList.add('bounceIn')
    liEl.innerHTML = `<span id="text" class="text">${toDo}</span>
    <div class="options">
    <span id="check"><i class="fa fa-check"></i></span>
    <span id="edit"><i class="fa fa-edit"></i></span>
    <span id="trash"><i class="fa fa-trash"></i></span>
    </div>`;
    document.getElementById('todo_list').appendChild(liEl)
}

