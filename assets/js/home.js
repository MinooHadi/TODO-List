const BASE_URL = "https://60b77f8f17d1dc0017b8a2c4.mockapi.io";

// let todoList = localStorage.getItem("todoList");
// if (todoList) {
//   todoList = JSON.parse(todoList);
// } else {
//   todoList = [];
// }

// create
async function createNewTodo() {
  event.preventDefault();
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let dueDate = document.getElementById("dueDate").value;

  let ts = Date.now();
  let newTodo = {
    title: title,
    description: description,
    dueDate: dueDate,
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

      //localstorage
      // console.log(todoList);
      // todoList.push(createTodo);
      // localStorage.setItem("todoList", JSON.stringify(todoList));

      document.getElementsByTagName("form")[0].reset();

      let toast = document.getElementsByClassName("toast")[0];
      toast.style.display = "block";

      let close = document.getElementsByTagName("i")[0];
      close.addEventListener("click", function () {
        toast.style.display = "none";
      });
    }
  } catch (error) {
    console.log(error);
  }
}
