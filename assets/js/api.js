import { TODOS_REQUEST } from "./constants.js";

export async function getTodosListReq() {
  const response = await fetch(TODOS_REQUEST, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return {data: await response.json(), statusCode: response.status}
}

export async function getTodoReq(todoId) {
  let response = await fetch(`${TODOS_REQUEST}/${todoId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return {data: await response.json(), statusCode: response.status}
}

export async function deleteTodoReq(selectedId) {
  let response = await fetch(`${TODOS_REQUEST}/${selectedId}`, {
    method: "DELETE",
  });
  return {data: await response.json(), statusCode: response.status}
}

export async function postTodoReq(newTodo) {
  const response = await fetch(TODOS_REQUEST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  return {data: await response.json(), statusCode: response.status}

}

export async function putTodoReq(todoId, newTodo) {
  const response = await fetch(`${TODOS_REQUEST}/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  return {data: await response.json(), statusCode: response.status}
}

// checked todo's checkbox
export function checked(id, value) {
  fetch(`${TODOS_REQUEST}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ checked: value, updatedAt: Date.now() }),
  });
  console.log(value);
}
