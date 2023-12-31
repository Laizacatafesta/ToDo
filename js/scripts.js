// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputvalue;

// Funções
const saveTodo = (text) => {

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {

    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        console.log(todoTitle, text);

        if (todoTitle.innerText === oldInputvalue) {
            todoTitle.innerText = text;
        }
    })
}

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
       saveTodo(inputValue);
        //save todo
    }
})

document.addEventListener("click", (e) => {
    const targeEl = e.target;
    const parentEl = targeEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targeEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    if (targeEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if (targeEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputvalue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

// evento para submeter o formulário

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms();
})