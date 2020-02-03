const KEY = 'todos'
var gTodos = _createTodos();
var gFilterBy = 'All';
var gSortBy = 'Importance';


function getTodosForDisplay() {
    if (gFilterBy === 'All') return sortTodos(gTodos);
    var todosForDisplay = gTodos.filter(function (todo) {
        return (gFilterBy === 'Done' && todo.isDone) ||
            (gFilterBy === 'Active' && !todo.isDone)
    })

    return sortTodos(todosForDisplay);
}

function sortTodos(todos) {
    if (gSortBy === 'Importance') {
        return todos.sort((a, b) => parseFloat(b.importance) - parseFloat(a.importance));
    } else if (gSortBy === 'Created') {
        return todos.sort((a, b) => parseFloat(b.time) - parseFloat(a.time));
    }
    return todos.sort((a, b) => ('' + a.txt).localeCompare(b.txt));
}


function getTodoCount() {
    return gTodos.length
}
function getActiveTodoCount() {
    var count = gTodos.reduce(function (acc, todo) {
        return acc + ((todo.isDone) ? 0 : 1);
    }, 0);
    return count;
}
function getTodoFilter(){
    return gFilterBy;
}


function removeTodo(todoId) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    saveToStorage(KEY, gTodos);
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    saveToStorage(KEY, gTodos);

}

function addTodo(txt, importance) {
    var todo = _createTodo(txt, null, null, importance);
    gTodos.unshift(todo);
    saveToStorage(KEY, gTodos);
}


function setTodoFilter(filterBy) {
    gFilterBy = filterBy;
}

function setTodoSorter(sortBy) {
    gSortBy = sortBy;
}


// Private functions:
function _createTodos() {
    var todos = loadFromStorage(KEY);
    if (todos) return todos;

    var todos = ['Learn HTML', 'Master CSS', 'Enjoy Javascript', 'eat']
        .map(_createTodo);

    return todos;
}

function _createTodo(txt, idx, arr, importance = 1) {
    return {
        id: parseInt(Math.random() * 1000),
        txt: txt,
        isDone: false,
        time: Date.now(),
        importance: +importance
    }
}