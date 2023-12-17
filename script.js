// ! Selectors
// ? Değişkenlerimizi seçiyoruz.

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

// ! Alerts

// ? Alert de yazdığımız değişkenleri seçiyoruz.

const alertSuccess = document.querySelector(".alert-success");
const alertWarning = document.querySelector(".alert-warning");

// ! Events
// ? todoButton tıkladığımız zaman todoInput yazdığımızı eklemek için.
todoButton.addEventListener("click", addTodo);
// ? trash butonuna bastığımız zaman todo görevini silsin.
todoList.addEventListener("click", deleteCheck);
// ? filter sekmesi için 
todoFilter.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", function(){
    getTodos();
})

// ! Functions
// ? todoButton tıkladığımız zaman todoInput yazdığımızı eklemek için.(devamı)

function addTodo(e) {
    e.preventDefault();

    // ? input boşken ekle butonuna bastığımızda boş input eklememesi için ve hata mesaj vermek için
    const isEmpty = str => !str.trim().length;

    if (isEmpty(todoInput.value)) {
        alertWarning.style.display = "block";
        setTimeout(() => {
            alertWarning.style.display = "none";
        }, 1500);
    } else {
        alertSuccess.style.display = "block";
        setTimeout(() => {
            alertSuccess.style.display = "none";
        }, 1500);

        saveLocalTodos(todoInput.value);

        // ! Create tod div
    // ? ul içinde div oluşturmak için
    const todoDiv = document.createElement("div");

    // ? oluşturduğumuz div'e class vermek için 
    todoDiv.classList.add("todo");

    // ! check mark button
    // ? li içindeki complete button tanımlıyoruz.
    const completedButton = document.createElement("button");
    // ? completedButton içine icon ekliyoruz.
    completedButton.innerHTML = "<i class='fas fa-check-circle'></i>"
    // ? completedButton class eklemek için
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // ! create todo li 
    // ? yeni li oluşturmak için
    const newTodo = document.createElement("li");
    // ? todoinput yazdıklarımızı newtodo ile ekleyeceğimiz yer burası önemli...
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // ! check trash button
    // ?li içindeki trash button tanımlıyoruz.
    const trashButton = document.createElement("button");
    // ? trashButton içine icon ekliyoruz.
    trashButton.innerHTML = "<i class='fas fa-minus-circle'></i>"
    // ? trashButton class eklemek için
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // ! append to list
    // ? aşağıda yazdırmak için
    todoList.appendChild(todoDiv);

    // ! clear todo input value
    // ? todoinput içinde yazdıklarımız ekledikten sonra içinde yazdıklarımız otomatik silinmesi için
    todoInput.value = "";
    console.log(todoDiv);
    }
    
}

function deleteCheck(e){
    const item = e.target;

    // ! delete todo
    // ? trash butonuna bastığımız zaman todo listi silmek için 
    if(item.classList[0]==="trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalStorage(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    } 

    // ! check mark
    // ? complete butonunda tamamlanan olarak seçmek için
    if(item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    // ? filterelemek için kullanacağız chilNodes ise içindekiler demek
    const todos = todoList.childNodes;
    todos.forEach(function(item){
        switch(e.target.value){
            case "all":
                item.style.display = "flex";
                break;
            case "completed":
                if(item.classList.contains("completed")){
                    item.style.display = "flex";
                }else {
                    item.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!item.classList.contains("completed")){
                    item.style.display = "flex";
                }else {
                    item.style.display = "none";
                }
                break;

        }
    })
}

// ! LocalStorage
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach((todo)=>{
                // ! Create tod div
    // ? ul içinde div oluşturmak için
    const todoDiv = document.createElement("div");

    // ? oluşturduğumuz div'e class vermek için 
    todoDiv.classList.add("todo");

    // ! check mark button
    // ? li içindeki complete button tanımlıyoruz.
    const completedButton = document.createElement("button");
    // ? completedButton içine icon ekliyoruz.
    completedButton.innerHTML = "<i class='fas fa-check-circle'></i>"
    // ? completedButton class eklemek için
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // ! create todo li 
    // ? yeni li oluşturmak için
    const newTodo = document.createElement("li");
    // ? todoinput yazdıklarımızı newtodo ile ekleyeceğimiz yer burası önemli...
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // ! check trash button
    // ?li içindeki trash button tanımlıyoruz.
    const trashButton = document.createElement("button");
    // ? trashButton içine icon ekliyoruz.
    trashButton.innerHTML = "<i class='fas fa-minus-circle'></i>"
    // ? trashButton class eklemek için
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // ! append to list
    // ? aşağıda yazdırmak için
    todoList.appendChild(todoDiv);
    });
}

function removeLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[1].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}

