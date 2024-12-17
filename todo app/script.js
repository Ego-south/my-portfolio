
let todos = []; 

// Eingabefeld und die Liste.
const todoForm = document.querySelector('.todo-form'); //  die Aufgabe hinzufühgen
const todoInput = document.querySelector('.todo-input'); // Das Eingabefeld, wo der Benutzer die Aufgabe eintippt
const todoList = document.querySelector('.todo-list'); // Die Liste, die alle Aufgaben anzeigt 

// Event-Listener für das Absenden des Formulars
todoForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const taskText = todoInput.value.trim(); 

    
    if (taskText === '') {
        return; 
    }

    // Das Erstellen ein neues To-Do-Objekt
    const newTodo = {
        id: Date.now(), 
        text: taskText, 
        completed: false 
    };

    
    todos.push(newTodo);


    todoInput.value = '';
    renderTodos();
});

//Die Aufgaben in der Liste darzustellen
function renderTodos() {
    todoList.innerHTML = ''; 

    todos.forEach(function(todo) {
        //Das Erstellen des Elements  für jede Aufgabe
        const li = document.createElement('li');
        li.classList.add('todo-item');

        //Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', function() {
            
            todo.completed = !todo.completed;
            renderTodos(); // Aktualisierung
        });

        
        const span = document.createElement('span');
        span.textContent = todo.text;
        if (todo.completed) {
            span.style.textDecoration = 'line-through'; 
        }

        // Löschen-Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.addEventListener('click', function() {
            
            todos = todos.filter(function(task) {
                return task.id !== todo.id; 
            });
            renderTodos(); // Aktualisierung nach dem Löschen
        });

        // Füge alle Elemente zur Liste hinzu
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        // Das hinzufügen der Elementen zur Liste
        todoList.appendChild(li);
    });
}

