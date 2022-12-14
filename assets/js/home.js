const BASE_URL = "https://60b77f8f17d1dc0017b8a2c4.mockapi.io";

// create new todo with submit button
async function createNewTodo() {
  event.preventDefault();
  let title = document.querySelector("#title");
  let description = document.querySelector("#description");
  let dueDate = document.querySelector("#dueDate");

  let timestamp = Date.now();

  let newTodo = {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    createdAt: timestamp,
    updatedAt: timestamp,
    checked: false,
  };
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    if (response.status === 201) {
      const createTodo = await response.json();

      document.querySelector("form").reset();

      let toast = document.querySelector(".toast-create");
      toast.style.display = "block";

      let close = document.querySelector("#create");
      close.addEventListener("click", function () {
        toast.style.display = "none";
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// create save button
function createSaveButton() {
  let todoId = new URLSearchParams(window.location.search).get("id");

  if (todoId) {
    let submit = document.querySelector("#btn");
    submit.style.display = "none";

    let save = document.createElement("button");
    save.innerText = "Save";
    save.classList.add("save");
    save.addEventListener("click", edit);
    let form = document.querySelector("form");
    form.append(save);
    getDataForEdit();
  }
}
createSaveButton();

// get data from form for edit
function getDataForEdit() {
  let todoId = new URLSearchParams(window.location.search).get("id");

  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let title = document.querySelector("#title");
      let description = document.querySelector("#description");
      let dueDate = document.querySelector("#dueDate");

      title.value = data.title;
      description.value = data.description;
      dueDate.value = data.dueDate;
    })
    .catch((err) => console.log(err));
}

// edit todo
async function edit() {
  let todoId = new URLSearchParams(window.location.search).get("id");

  event.preventDefault();
  let title = document.querySelector("#title");
  let description = document.querySelector("#description");
  let dueDate = document.querySelector("#dueDate");

  let timestamp = Date.now();
  let newTodo = {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    updatedAt: timestamp,
  };
  try {
    const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    if (response.status === 404) {
      window.location.href = "error.html";
    } else if (response.status === 200) {
      const editTodo = await response.json();

      document.querySelector("form").reset();

      let toast = document.querySelector(".toast-edit");
      toast.style.display = "block";

      let close = document.querySelector("#edit");
      close.addEventListener("click", function () {
        toast.style.display = "none";
      });

      setTimeout(() => {
        window.location.href = "home.html";
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
}
