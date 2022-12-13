// let data = localStorage.getItem("todoList");
// data = JSON.parse(data);
const BASE_URL = "https://60b77f8f17d1dc0017b8a2c4.mockapi.io";

async function createTodos() {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    addToDOM(data);

    let deleteIcons = document.getElementsByClassName("deleteIcon");
    for (let deleteIcon of deleteIcons) {
      deleteIcon.addEventListener("click", showDeleteModal);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

createTodos();

function addToDOM(data) {
    let container = document.querySelector(".container");
    console.log(container);
  for (let item of data) {
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
    editDelete.classList.add("edit-delete");

    let editIcon = document.createElement("i");
    editIcon.classList.add("fa", "fa-pencil", "editIcon");
    editIcon.setAttribute("data-id", item.id);
    editIcon.setAttribute("data-title", item.title);
    editIcon.setAttribute("data-dueDate", item.dueDate);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash", "deleteIcon");
    deleteIcon.setAttribute("data-id", item.id);
    deleteIcon.setAttribute("data-title", item.title);
    deleteIcon.setAttribute("data-dueDate", item.dueDate);

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

    container.append(todoDiv);
  }
}

let selectedId;

function showDeleteModal(e) {
  let deleteTodo = document.getElementsByClassName("deleteTodo")[0];
  deleteTodo.classList.replace("hide", "show");

  let dueDate = document.getElementById("duedate");
  dueDate.innerText = e.target.getAttribute("data-dueDate");

  let title = document.getElementById("title");
  title.innerText = e.target.getAttribute("data-title");

  selectedId = e.target.getAttribute("data-id");
}

function hideDeleteModal() {
  let deleteTodo = document.getElementsByClassName("deleteTodo")[0];
  deleteTodo.classList.replace("show", "hide");

  selectedId = null;
}

function resetTodo() {
    let container = document.querySelector(".container");
    container.innerHTML = "";
}

async function deleteTodo() {
  try {
    if (selectedId) {
      const response = await fetch(`${BASE_URL}/todos/${selectedId}`, {
        method: "DELETE",
      });
      hideDeleteModal();
      resetTodo();
      createTodos();
    }
  } catch (error) {
    console.log(error);
  }
}

