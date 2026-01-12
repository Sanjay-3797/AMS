import { DOMAIN_URL } from "./config";

function showUnauthorizedModal() {
  const modal = document.getElementById("my_modal_3");
  if (modal) modal.showModal();
}

async function handleResponse(response) {
  if (response.status === 401) {
    console.log("Unauthorized");
    showUnauthorizedModal();
    return null; // or throw error if you want
  }

  if (!response.ok) {
    console.log(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function loginUser(username, password) {
  const response = await fetch(`${DOMAIN_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return handleResponse(response);
}

export async function getAllChatIds() {
  const response = await fetch(`${DOMAIN_URL}/get_all_chats`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return handleResponse(response);
}

export async function fetchChatsWithId(chatId) {
  const response = await fetch(`${DOMAIN_URL}/get_chat/${chatId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return handleResponse(response);
}

export async function fetchQuery(text, chatId, selectedFile = null) {
  const body = new FormData();
  body.append("chat_id", chatId);
  body.append("user_question", text);

  if (selectedFile) {
    body.append("file", selectedFile);
  }

  const response = await fetch(`${DOMAIN_URL}/query`, {
    method: "POST",
    credentials: "include",
    body,
  });

  return handleResponse(response);
}


export async function newChatForId() {
  const response = await fetch(`${DOMAIN_URL}/new_chat`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return handleResponse(response);
}
