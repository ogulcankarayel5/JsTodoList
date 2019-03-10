//elements
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

addEvent(); // tüm eventler oluşur

function addEvent(){ // tüm eventler
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadlAllTodosToUI);
    secondCardBody.addEventListener("click",removeTodo);
    filter.addEventListener("keyup",searchTodo);
    clearButton.addEventListener("click",deleteAllTodos);
}


function deleteAllTodos(e){
    if(confirm("Emin misiniz ?")){
        //todoList.innerHTML="";  //yavaş
        while(todoList.firstElementChild!=null){
            todoList.removeChild(todoList.firstElementChild);
        }

        localStorage.removeItem("todos");
        showAlert("success","Succesfuly deleted");
    }
}

function searchTodo(e){

    const filterText=e.target.value.toLowerCase(); // filtera yazılan değer
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const textValue=listItem.textContent.toLowerCase(); //li'nin text contentinin içinde filtertext ten bir harf bile varsa -1 dönmez.
        if(textValue.indexOf(filterText)===-1){
            listItem.setAttribute("style","display:none !important"); // filtera yazdığımız değer uyuşmuyorsa display none olup ekranda gözükmücek.bootsrapta d-flex display:none ı gölgelediği için !important yazıyoruz css koduna.

        }
        else{
            listItem.setAttribute("style","display:block");
        }
        

    });



}

function removeTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","It was successfully");
    }

}

function deleteTodoFromStorage(deletetodo){

    let todos=getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1); // arrrayden değeri silme
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));



}


function loadlAllTodosToUI(){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo){

        addToDoUI(todo);
    })

    
}
function control(newTodo){
    const todos=getTodosFromStorage();
    for(let key of todos){
        if(key===newTodo){
            return false;
        }
    }
}

function addTodo(e){

    const value=todoInput.value.trim(); // trim boşlukları siler
    
    if(value===""){
        showAlert("danger","Enter a todo");
    }
    else if (control(value)==false) {
        showAlert("danger","same todo");
        
    }
    else{
        addToDoUI(value);
        addStorage(value);
        showAlert("success","Todo add completed successfully");
    }
    
        
   
 

    e.preventDefault();

}

function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function addStorage(newTodo){
    let todos=getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}

function showAlert(type,message){

    const alert=document.createElement("div");

    alert.className=`alert alert-${type}`;
    alert.appendChild(document.createTextNode(message));

    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1000);

}

function addToDoUI(value){ // inputa girilen stringi list item olarak arayüze ekler

    

    const listItem=document.createElement("li"); //list-item olusturma
    const link=document.createElement("a"); // link olusturma

    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";

    listItem.className="list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(value)); // text node ekleme
    listItem.appendChild(link); // li ye a yı ekleme

    todoList.appendChild(listItem); //ul ye li yi ekleme
    todoInput.value="";

}