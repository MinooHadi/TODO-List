const BASE_URL = "https://60b77f8f17d1dc0017b8a2c4.mockapi.io";

// create todos
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
    
    addToDOM(paginator(data));

    let deleteIcons = document.querySelectorAll(".deleteIcon");
    for (let deleteIcon of deleteIcons) {
      deleteIcon.addEventListener("click", showDeleteModal);
    }

    let editIcons = document.querySelectorAll(".editIcon");
    for (let editIcon of editIcons) {
      editIcon.addEventListener("click", editTodo);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}
createTodos();

// add todos to todos page
function addToDOM(data) {
  let container = document.querySelector(".container");
  for (let item of data) {
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");

    let todoTop = document.createElement("div");
    todoTop.classList.add("todoTop");

    let checkTodo = document.createElement("div");
    checkTodo.classList.add("checkTodo");

    let input = document.createElement("input");
    input.type = "checkbox";
    input.checked = item.checked;
    input.addEventListener("click", function () {
      checked(item.id, this.checked);
    });

    let label = document.createElement("label");
    label.innerText = item.title;

    let pDate = document.createElement("p");
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

// show delete modal
function showDeleteModal(e) {
  let deleteTodo = document.querySelector(".deleteTodo");

  let container = document.querySelector(".container");
  container.classList.add("blur");
  deleteTodo.classList.replace("hide", "show");

  let dueDate = document.querySelector("#duedate");
  dueDate.innerText = e.target.getAttribute("data-dueDate");

  let title = document.querySelector("#title");
  title.innerText = e.target.getAttribute("data-title");

  selectedId = e.target.getAttribute("data-id");
}

// hide delete modal
function hideDeleteModal() {
  let deleteTodo = document.querySelector(".deleteTodo");
  deleteTodo.classList.replace("show", "hide");

  let container = document.querySelector(".container");
  container.classList.remove("blur");

  selectedId = null;
}

// reset todos page
function resetTodo() {
  let container = document.querySelector(".container");
  container.innerHTML = "";

  let footer = document.querySelector("footer");
  footer.firstElementChild.remove();
  footer.lastElementChild.remove();

  let pageDiv = document.querySelector(".pageDiv");
  pageDiv.innerHTML = "";
}

// delete todo
async function deleteTodo() {
  try {
    if (selectedId) {
      await fetch(`${BASE_URL}/todos/${selectedId}`, {
        method: "DELETE",
      });
      hideDeleteModal();
      checkPage();
      resetTodo();
      createTodos();
    }
  } catch (error) {
    console.log(error);
  }
}

// check page for change to page-1
function checkPage() {
  let container = document.querySelector(".container");
  if (container.children.length === 1) {
    let params = new URLSearchParams(window.location.search);
    let page = params.get("page");
    if (page && page != 1) {
      page -= 1;
      params.set("page", page);
      window.location.search = params.toString();
    }
  }
}

// create pagination
function paginator(data) {
  const pageCount = Math.ceil(data.length / 5);
  const params = new URLSearchParams(window.location.search);
  let page = params.get("page");
  let pageDiv = document.querySelector(".pageDiv");
  if (!page) {
    page = 1;
  } else if (page > pageCount) {
    window.location.href = "error.html";
  }

  let previous = document.createElement("i");
  previous.classList.add("fa", "fa-chevron-left", "scrollIcon");
  previous.addEventListener("click", function () {
    pageDiv.scrollLeft -= 45;
  });
  pageDiv.insertAdjacentElement("beforebegin", previous);

  for (let i = 1; i <= pageCount; i++) {
    let pageNumber = document.createElement("div");
    pageNumber.innerText = i;
    pageNumber.classList.add("pageNumber");

    if (page == i) {
      pageNumber.style.backgroundColor = "rgb(183, 103, 103)";
      pageNumber.style.color = "white";
    }

    pageDiv.append(pageNumber);

    pageNumber.addEventListener("click", function () {
      params.set("page", i);
      window.location.search = params.toString();
    });
  }
  let next = document.createElement("i");
  next.classList.add("fa", "fa-chevron-right", "scrollIcon");
  next.addEventListener("click", function () {
    pageDiv.scrollLeft += 45;
  });
  pageDiv.insertAdjacentElement("afterend", next);

  return data.splice((page - 1) * 5, 5);
}

// edit todo
function editTodo(e) {
  let id = e.target.getAttribute("data-id");
  window.location.replace(`home.html?id=${id}`);
}

// checked todo's checkbox
function checked(id, value) {
  fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ checked: value, updatedAt: Date.now() }),
  });
  console.log(value);
}
