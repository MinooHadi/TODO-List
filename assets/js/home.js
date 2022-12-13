const BASE_URL = "https://60b77f8f17d1dc0017b8a2c4.mockapi.io";

// create
let todoId = new URLSearchParams(window.location.search).get("id");

async function createNewTodo() {
  event.preventDefault();
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let dueDate = document.getElementById("dueDate");

  let ts = Date.now();
  let newTodo = {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    createdAt: ts,
    updatedAt: ts,
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
      console.log(createTodo);

      document.getElementsByTagName("form")[0].reset();

      let toast = document.getElementsByClassName("toast-create")[0];
      toast.style.display = "block";

      let close = document.getElementById("create");
      close.addEventListener("click", function () {
        toast.style.display = "none";
      });
    }
  } catch (error) {
    console.log(error);
  }
}

if (todoId) {
  let submit = document.getElementById("btn");
  submit.style.display = "none";

  let save = document.createElement("button");
  save.innerText = "Save";
  save.classList.add("save");
  save.addEventListener("click", edit);
  let form = document.getElementsByTagName("form")[0];
  form.append(save);
  getDataForEdit();
}

function getDataForEdit() {
  console.log("hi");
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
      let title = document.getElementById("title");
      let description = document.getElementById("description");
      let dueDate = document.getElementById("dueDate");

      title.value = data.title;
      description.value = data.description;
      dueDate.value = data.dueDate;
    })
    .catch((err) => console.log(err));
}

async function edit() {
  event.preventDefault();
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let dueDate = document.getElementById("dueDate");

  let ts = Date.now();
  let newTodo = {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    createdAt: ts,
    updatedAt: ts,
    checked: false,
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
    if (response.status === 200) {
      const createTodo = await response.json();
      console.log(createTodo);

      document.getElementsByTagName("form")[0].reset();

      let toast = document.getElementsByClassName("toast-edit")[0];
      toast.style.display = "block";

      let close = document.getElementById("edit");
      close.addEventListener("click", function () {
        toast.style.display = "none";
        window.location.href = "home.html";
      });

      setTimeout(() => {
        window.location.href = "home.html";
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
}
