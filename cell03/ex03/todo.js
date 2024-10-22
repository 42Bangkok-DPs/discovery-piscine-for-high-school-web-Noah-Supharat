document.addEventListener("DOMContentLoaded", () => {
    const ftList = document.getElementById("ft_list");
    const newTodoButton = document.getElementById("new_todo");

    loadTodos();

    newTodoButton.addEventListener("click", () => {
        const todoText = prompt("Enter a new TO DO:");
        if (todoText && todoText.trim() !== "") {
            addTodo(todoText);
        }
    });

    function addTodo(text) {
        const todoDiv = document.createElement("div");
        todoDiv.textContent = text;
        todoDiv.className = "todo-item";

        todoDiv.addEventListener("click", () => {
            if (confirm("Do you really want to remove this TO DO?")) {
                ftList.removeChild(todoDiv);
                saveTodos();
            }
        });

        ftList.insertBefore(todoDiv, ftList.firstChild);
        saveTodos();
    }

    function saveTodos() {
        const todos = Array.from(ftList.children).map(item => item.textContent);
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
