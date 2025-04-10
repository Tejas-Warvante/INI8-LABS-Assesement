const API_URL = "http://localhost:5000/api/registration";
const form = document.getElementById("registrationForm");
const userList = document.getElementById("userList");
const userIdField = document.getElementById("userId");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const dobField = document.getElementById("dob");
const submitBtn = document.getElementById("submitBtn");

// Load all users
async function loadUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();

  userList.innerHTML = "";
  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>DOB:</strong> ${user.dob.split("T")[0]}</p>
      <div class="actions">
        <button class="edit-btn" onclick="editUser(${user.id}, '${user.name}', '${user.email}', '${user.dob.split("T")[0]}')">Edit</button>
        <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
      </div>
    `;
    userList.appendChild(card);
  });
}

// Add or Update user
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = userIdField.value;
  const user = {
    name: nameField.value,
    email: emailField.value,
    dob: dobField.value
  };

  if (id) {
    // Update
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    submitBtn.textContent = "Add User";
  } else {
    // Add
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
  }

  form.reset();
  userIdField.value = "";
  loadUsers();
});

// Edit user
function editUser(id, name, email, dob) {
  userIdField.value = id;
  nameField.value = name;
  emailField.value = email;
  dobField.value = dob;
  submitBtn.textContent = "Update User";
}

// Delete user
async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadUsers();
  }
}

// Initial load
loadUsers();
