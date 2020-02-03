'use strict';

function onInit() {
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();
    var elHeader = document.querySelector('.no-todos');
    if (todos.length === 0){
        switch (getTodoFilter()) {
            case 'All':
                elHeader.innerText = 'No Todos';
                break;
            case 'Done':
                elHeader.innerText = 'No Done Todos';
                break;
            case 'Active':
                elHeader.innerText = 'No Active Todos';
                break;
        }   
    } else {
        elHeader.innerText = '';
    }
    var strHTMLs = todos.map(function (todo) {
        var className = (todo.isDone)? 'done' : '';
        return `
        <li onclick="onTodoToggle(${todo.id})" class="${className}">
            ${todo.txt}
            <button onclick="onRemoveTodo(event, ${todo.id})">x</button>
        </li>`
    })
    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTMLs.join('');
    renderStats();
}


function renderStats() {
    document.querySelector('.todo-count').innerText = getTodoCount();
    document.querySelector('.active-count').innerText = getActiveTodoCount();
}

function onRemoveTodo(event, todoId) {
    event.stopPropagation();
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeTodo(todoId);
        renderTodos();
    }
}
function onAddTodo() {
    console.log('onAddTodo');
    var elTxt = document.querySelector('.todo-text');
    var elImportance = document.querySelector('.todo-importance');
    var importanceNum = elImportance.value;
    var txt = elTxt.value;
    if (importanceNum < 1 || importanceNum > 3 || !txt) return;
    addTodo(txt, importanceNum)
    elTxt.value = '';
    elImportance.value = '';
    renderTodos();
}

function onTodoToggle(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onFilterChanged(filterBy) {
    setTodoFilter(filterBy);
    renderTodos();
}

function onSorterChanged(sortBy) {
    setTodoSorter(sortBy);
    renderTodos();
}