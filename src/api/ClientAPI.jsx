import { DOMAIN_URL } from "./config";
export async function loginUser(username, password) {
  const response = await fetch(`${DOMAIN_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    console.log("Invalid credentials");
  }

  return response.json();
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

  if (!response.ok) {
    console.log("Invalid credentials");
  }

  return response.json();
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

  if (!response.ok) {
    console.log(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchQuery(query, chatId) {
  const response = await fetch(`${DOMAIN_URL}/query`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      user_question: query,
      chat_id: chatId,
    }),
  });

  if (!response.ok) {
    console.log(`Request failed with status ${response.status}`);
  }

  return response.json();
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

  if (!response.ok) {
    console.log(`Request failed with status ${response.status}`);
  }

  return response.json();
}
