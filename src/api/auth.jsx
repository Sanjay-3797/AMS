import { DOMAIN_URL } from "../api/config";
export async function loginUser(username, password) {
  const response = await fetch(`${DOMAIN_URL}/login/`, {
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
    throw new Error("Invalid credentials");
  }

  return response.json();
}

export async function getAllChats() {
  const response = await fetch(`${DOMAIN_URL}/get_all_chats`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}
