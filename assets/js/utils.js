export function getPageNumber() {
  let pageNumber = new URLSearchParams(window.location.search).get("page");
  return pageNumber ? pageNumber : 1;
}

export function getTodoId() {
  return new URLSearchParams(window.location.search).get("id");
}

export function updatePageNumber(page) {
  let params = new URLSearchParams(window.location.search);
  params.set("page", page);
  window.location.search = params.toString();
}

export function getFormData() {
  let title = document.querySelector("#title");
  let description = document.querySelector("#description");
  let dueDate = document.querySelector("#dueDate");

  let obj = {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
  };

  return obj;
}

export function showToast(msg, color) {
  const toast = document.querySelector(".toast");
  toast.style.backgroundColor = color;
  const header = toast.querySelector("h3")
  if(color === "red"){
    header.innerText = "Error"
  } else {
    header.innerText = "Successful"
  }
  const toastMsg = document.querySelector("#toastMsg");
  toastMsg.innerText = msg;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

export function showLoading() {
  const load = document.querySelector(".loading");
  load.style.display = "block";
}

export function hideLoading() {
  const load = document.querySelector(".loading");
  load.style.display = "none";
}