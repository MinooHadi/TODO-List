import { getTodoReq, postTodoReq, putTodoReq } from "./api.js";
import { getTodoId, getFormData, showToast, showLoading, hideLoading } from "./utils.js";

// create new todo with submit button
const form = document.querySelector("form");
form.addEventListener("submit", createNewTodo);

export async function createNewTodo() {
  event.preventDefault();
  const { title, description, dueDate } = getFormData();
  let timestamp = Date.now();

  let newTodo = {
    title: title,
    description: description,
    dueDate: dueDate,
    createdAt: timestamp,
    updatedAt: timestamp,
    checked: false,
  };
  try {
    let response = await postTodoReq(newTodo);
    if (response.statusCode >= 400) {
      showToast("something went wrong!!!", "red");
    } else if (response.statusCode === 201) {
      document.querySelector("form").reset();

      showToast("The todo successfuly submited", "green");
    }
  } catch {
    showToast("something went wrong!!!", "red");
  }
}

// close button for create tost
const close = document.querySelector("#create");
const toast = document.querySelector(".toast");
close.addEventListener("click", function () {
  toast.style.display = "none";
});

// edit todo
async function edit() {
  let todoId = getTodoId();

  event.preventDefault();

  const { title, description, dueDate } = getFormData();
  let timestamp = Date.now();

  let newTodo = {
    title: title,
    description: description,
    dueDate: dueDate,
    updatedAt: timestamp,
  };
  try {
    showLoading();
    let response = await putTodoReq(todoId, newTodo);
    hideLoading();
    if (response.statusCode === 404) {
      window.location.href = "error.html";
    } else if (response.statusCode === 200) {
      document.querySelector("form").reset();

      showToast("The todo successfuly edited", "green");

      setTimeout(() => {
        window.location.href = "home.html";
      }, 2000);
    } else {
      showToast("something went wrong!!!", "red");
    }
  } catch (e) {
    showToast("something went wrong!!!", "red");
    console.log(e);
  }
}

// get form data for edit
function fetchById() {
  let todoId = getTodoId();

  getTodoReq(todoId)
    .then((response) => {
      const { data, statusCode } = response;
      if (statusCode >= 400) {
        return showToast("something went wrong!!!", "red");
      }
      const title = document.querySelector("#title");
      const description = document.querySelector("#description");
      const dueDate = document.querySelector("#dueDate");

      title.value = data.title;
      description.value = data.description;
      dueDate.value = data.dueDate;
    })
    .catch(() => showToast("something went wrong!!!", "red"));
}

// create save button
function createSaveButton() {
  let todoId = getTodoId();

  if (todoId) {
    const submit = document.querySelector("#btn");
    submit.style.display = "none";

    let save = document.createElement("button");
    save.innerText = "Save";
    save.classList.add("save");
    save.addEventListener("click", edit);
    const form = document.querySelector("form");
    form.append(save);
    fetchById();
  }
}
createSaveButton();
