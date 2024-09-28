const todoTitle = document.getElementById('title');
const todoDesc = document.getElementById('desc');
const createTodoBtn = document.getElementById('createTodoBtn');
const Todos = document.getElementById('todoContainer');
const searchInput = document.getElementById('searchInput');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let id = todos.length ? Math.max(todos.map(todo => todo.id)) + 1 : 0;

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function displayTodos(todosToDisplay = todos) {
    Todos.innerHTML = '';
    todosToDisplay.forEach((todo) => {
        const todoElement = document.createElement('div');
        todoElement.innerHTML = `
            <div class="form-check todo">
                <input
                    class="form-check-input check-input"
                    type="checkbox"
                    id="todo-${todo.id}"
                    ${todo.completed ? 'checked' : ''}
                />
                <p class="todoText" id="todotext-${todo.id}" style="text-decoration: ${todo.completed ? 'line-through' : 'none'}; color: ${todo.completed ? '#ccc' : 'white'};">${todo.title}</p>
            </div>
            <hr />
        `;

        const checkbox = todoElement.querySelector(`input[type="checkbox"]`);
        checkbox.addEventListener('change', () => {
            todo.completed = checkbox.checked;
            saveTodos(); // Save the updated todos
            displayTodos();
        });

        Todos.appendChild(todoElement);
    });
}

createTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = todoTitle.value.trim();
    const desc = todoDesc.value.trim();

    if (title && desc) {
        const newTodo = {
            id: id++,
            title,
            desc,
            completed: false
        };

        todos.push(newTodo);
        console.log('New todo Created', todos);
        saveTodos(); // Save the new todo to local storage
        displayTodos();
        todoTitle.value = '';
        todoDesc.value = '';
    } else {
        alert('Please fill in all fields');
    }
});

// Load todos from local storage when the page is loaded
displayTodos();

searchInput.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredTodos = todos.filter(todo => 
        todo.title.toLowerCase().includes(searchValue) || 
        todo.desc.toLowerCase().includes(searchValue)
    );
    console.log(filteredTodos)
    displayTodos(filteredTodos);
})
searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
        displayTodos();
    }
});
