export async function loginUser(username, password) {
  const response = await fetch(
    "https://ams-test.cfapps.ap10.hana.ondemand.com/login/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        credentials: "include",
      },
      body: JSON.stringify({
        username: "Kalai",
        password: "Kalai@143",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}
