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
      deleteIcon.addEventListener("click", deleteTodo);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

createTodos();

function addToDOM(data) {
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

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash", "deleteIcon");

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
}

function deleteTodo() {
  let deletTodo = document.createElement("div");
  deletTodo.classList.add("deleteTodo");

  let deleteTop = document.createElement("div");
  deleteTop.classList.add("deleteTop");

  let icon = document.createElement("i");
  icon.classList.add("fa", "fa-exclamation-triangle");
  icon.style.color = "red";

  let deletLabel = document.createElement("h3");
  deletLabel.innerText = "Delete";

  let hr1 = document.createElement("hr");

  let deleteCenter = document.createElement("div");
  deleteCenter.classList.add("deleteCenter");

  let pDelete = document.createElement("p");
  pDelete.innerText = "Do you want to delete this item?";

  let deleteCenter2 = document.createElement("div");
  deleteCenter2.classList.add("deleteCenter2");

  let h3 = document.createElement("h3");
  h3.innerText = "test";

  let h6 = document.createElement("h6");
  h6.innerText = "22.22.2222";

  let hr2 = document.createElement("hr");

  let deleteBottom = document.createElement("div");
  deleteBottom.classList.add("deleteBottom");

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.style.width = "45%";

  let cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancel";
  cancelBtn.style.width = "45%";

  deleteTop.append(icon);
  deleteTop.append(deletLabel);

  deleteCenter2.append(h3);
  deleteCenter2.append(h6);

  deleteCenter.append(pDelete);
  deleteCenter.append(deleteCenter2);

  deleteBottom.append(deleteBtn);
  deleteBottom.append(cancelBtn);

  deletTodo.append(deleteTop, hr1, deleteCenter, hr2, deleteBottom);

  document.body.append(deletTodo);
}

