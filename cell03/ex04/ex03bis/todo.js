$(document).ready(function() {
    const $ftList = $('#ft_list');
    const $newTodoButton = $('#new_todo');

    loadTodos();

    $newTodoButton.on('click', function() {
        const todoText = prompt("Enter a new TO DO:");
        if (todoText && $.trim(todoText) !== "") {
            addTodo(todoText);
        }
    });

    function addTodo(text) {
        const $todoDiv = $('<div></div>').text(text).addClass('todo-item');

        $todoDiv.on('click', function() {
            if (confirm("Do you really want to remove this TO DO?")) {
                $todoDiv.remove();
                saveTodos();
            }
        });

        $ftList.prepend($todoDiv);
        saveTodos();
    }

    function saveTodos() {
        const todos = $ftList.children().map(function() {
            return $(this).text();
        }).get();
        
        document.cookie = `todos=${JSON.stringify(todos)}; path=/; max-age=31536000`;
    }

    function loadTodos() {
        const cookies = document.cookie.split("; ");
        const todoCookie = cookies.find(cookie => cookie.startsWith("todos="));

        if (todoCookie) {
            const todos = JSON.parse(todoCookie.split("=")[1]);
            todos.forEach(todo => addTodo(todo));
        }
    }
});
