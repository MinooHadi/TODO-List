import { getTodosListReq, deleteTodoReq, checked } from "./api.js";
import { PAGE_LIMIT, SCROLL_OFFSET } from "./constants.js";
import { getPageNumber, hideLoading, showLoading, showToast, updatePageNumber } from "./utils.js";

// create todos
async function createTodos() {
  try {
    showLoading();
    const { data, statusCode } = await getTodosListReq();
    hideLoading();
    if (statusCode >= 400) {
      return showToast("something went wrong!!!", "red");
    }
    addToDOM(paginator(data));

    const deleteIcons = document.querySelectorAll(".deleteIcon");
    for (let deleteIcon of deleteIcons) {
      deleteIcon.addEventListener("click", showDeleteModal);
    }

    const editIcons = document.querySelectorAll(".editIcon");
    for (let editIcon of editIcons) {
      editIcon.addEventListener("click", editTodo);
    }

    return data;
  } catch {
    hideLoading();
    showToast("something went wrong!!!", "red");
  }
}
createTodos();

// add todos to todos page
function addToDOM(data) {
  const container = document.querySelector(".container");
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
  const deleteTodo = document.querySelector(".deleteTodo");

  const container = document.querySelector(".container");
  container.classList.add("blur");
  deleteTodo.classList.replace("hide", "show");

  const dueDate = document.querySelector("#duedate");
  dueDate.innerText = e.target.getAttribute("data-dueDate");

  const title = document.querySelector("#title");
  title.innerText = e.target.getAttribute("data-title");

  selectedId = e.target.getAttribute("data-id");
}

// hide delete modal
const cancelBtn = document.querySelector(".cancel-btn");
cancelBtn.addEventListener("click", hideDeleteModal);

function hideDeleteModal() {
  const deleteTodo = document.querySelector(".deleteTodo");
  deleteTodo.classList.replace("show", "hide");

  const container = document.querySelector(".container");
  container.classList.remove("blur");

  selectedId = null;
}

// reset todos page
function resetTodo() {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  const footer = document.querySelector("footer");
  footer.firstElementChild.remove();
  footer.lastElementChild.remove();

  const pageDiv = document.querySelector(".pageDiv");
  pageDiv.innerHTML = "";
}

// delete todo
const deleteBtn = document.querySelector(".delete-btn");
deleteBtn.addEventListener("click", deleteTodo);

async function deleteTodo() {
  try {
    if (selectedId) {
      let response = await deleteTodoReq(selectedId);
      if (response.statusCode >= 400) {
        return showToast("something went wrong!!!", "red");
      }
      hideDeleteModal();
      checkPage();
      resetTodo();
      createTodos();
    }
  } catch(e) {
    console.log(e);
    showToast("something went wrong!!!", "red");
  }
}

// check page for change to page-1
function checkPage() {
  const container = document.querySelector(".container");
  if (container.children.length === 1) {
    let page = getPageNumber();
    if (page && page != 1) {
      page -= 1;
      updatePageNumber(page);
    }
  }
}

// create pagination
function paginator(data) {
  const pageCount = Math.ceil(data.length / PAGE_LIMIT);
  let page = getPageNumber();
  const pageDiv = document.querySelector(".pageDiv");
  if (!page) {
    page = 1;
  } else if (page > pageCount) {
    window.location.href = "error.html";
  }

  let previous = document.createElement("i");
  previous.classList.add("fa", "fa-chevron-left", "scrollIcon");
  previous.addEventListener("click", function () {
    pageDiv.scrollLeft -= SCROLL_OFFSET;
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
      updatePageNumber(i);
    });
  }
  pageDiv.scrollLeft += (page - 3) * SCROLL_OFFSET;

  let next = document.createElement("i");
  next.classList.add("fa", "fa-chevron-right", "scrollIcon");
  next.addEventListener("click", function () {
    pageDiv.scrollLeft += SCROLL_OFFSET;
  });
  pageDiv.insertAdjacentElement("afterend", next);
  return data.splice((page - 1) * PAGE_LIMIT, PAGE_LIMIT);
}

// edit todo
function editTodo(e) {
  let id = e.target.getAttribute("data-id");
  window.location.replace(`home.html?id=${id}`);
}
