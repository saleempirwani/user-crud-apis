// 1. Create User (POST)
fetch("http://66.179.208.43:8080/api/v1/user/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    firstName: "John",
    lastName: "Denis",
    username: "johndenis23",
    email: "johndenis23@gmail.com",
    state: "Arizona",
    role: "patron",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("User created:", data))
  .catch((error) => console.error("Error:", error));

//   2. Update User (PATCH)
fetch("http://66.179.208.43:8080/api/v1/user/update/676559390f61f32ea2a45094", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    firstName: "John",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("User updated:", data))
  .catch((error) => console.error("Error:", error));

//   3. Delete User (DELETE)
fetch("http://66.179.208.43:8080/api/v1/user/delete/676559390f61f32ea2a45094", {
  method: "DELETE",
})
  .then((response) => {
    if (response.ok) {
      console.log("User deleted successfully");
    } else {
      console.error("Failed to delete user");
    }
  })
  .catch((error) => console.error("Error:", error));

// 4. Get All Users with Role (GET)
fetch("http://66.179.208.43:8080/api/v1/user/all/business", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => console.log("Users with role 'business':", data))
  .catch((error) => console.error("Error:", error));
