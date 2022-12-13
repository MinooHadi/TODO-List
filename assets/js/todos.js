let data = localStorage.getItem("todoList");
data = JSON.parse(data);
for(let item of data){
    // console.log(item);
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");

    let todoTop = document.createElement("div");
    todoTop.classList.add("todoTop");

    let checkTodo = document.createElement("div");
    checkTodo.classList.add("checkTodo");

    let input = document.createElement("input");
    input.type = "checkbox";

    let label = document.createElement("label");
    label.style.fontSize = "20px";
    label.innerText = item.title;

    let pDate = document.createElement("p");
    pDate.style.fontSize = "13px";
    pDate.style.color = "grey";
    pDate.innerText = item.dueDate;

    let editDelete = document.createElement("div");
    editDelete.classList.add("edit-delete")

    let editIcon = document.createElement("i");
    editIcon.classList.add("fa", "fa-pencil");

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash");

    let pDescription = document.createElement("p");
    pDescription.style.fontSize = "13px";
    pDescription.innerText = item.description;


    checkTodo.append(input);
    checkTodo.append(label);
    checkTodo.append(pDate);

    editDelete.append(editIcon);
    editDelete.append(deleteIcon);

    todoTop.append(checkTodo);
    todoTop.append(editDelete);
    
    todoDiv.append(todoTop);
    todoDiv.append(pDescription);

    document.body.append(todoDiv);
}