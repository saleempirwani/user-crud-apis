// Create User (POST)
fetch("http://66.179.208.43/api/v1/user/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "a1B2c3D4e5F6g7H8i9J0kLmNoPqRsTu",
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
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

//  Update User (PATCH)
fetch("http://66.179.208.43/api/v1/user/update/6766e66d7c0a8cd4413fe2ec", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Authorization: "a1B2c3D4e5F6g7H8i9J0kLmNoPqRsTu",
  },
  body: JSON.stringify({
    firstName: "John",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

//   Delete User (DELETE)
fetch("http://66.179.208.43/api/v1/user/delete/67670154fb724d2739455cbf", {
  method: "DELETE",
  headers: {
    Authorization: "a1B2c3D4e5F6g7H8i9J0kLmNoPqRsTu",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Get User Details
fetch("http://66.179.208.43/api/v1/user/details/6766e66d7c0a8cd4413fe2ec", {
  method: "GET",
  headers: {
    Authorization: "a1B2c3D4e5F6g7H8i9J0kLmNoPqRsTu",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Get All Users
fetch("http://66.179.208.43/api/v1/user/all", {
  method: "GET",
  headers: {
    Authorization: "a1B2c3D4e5F6g7H8i9J0kLmNoPqRsTu",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Get All Users By Role
fetch("http://66.179.208.43/api/v1/user/all?role=business", {
  method: "GET",
  headers: {
    Authorization: "a1B2c3D4e5F6g7H8i9J0kLmNoPqRsTu",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Get All Users By Username
fetch("http://66.179.208.43/api/v1/user/all?username=elladavis05", {
  method: "GET",
  headers: {
    Authorization: "a1B2c3D4e5F6g7H8i9J0kLmNoPqRsTu",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Get All Users By Email
fetch("http://66.179.208.43/api/v1/user/all?email=johndenis23@gmail.com", {
  method: "GET",
  headers: {
    Authorization: "a1B2c3D4e5F6g7H8i9J0kLmNoPqRsTu",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
