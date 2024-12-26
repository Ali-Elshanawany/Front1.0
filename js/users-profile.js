
import { getUsers, saveDataInLocalStorage, loadDataFromLocalStorage, data, isAuthorized, getCurrentUser } from './Data.js';

document.addEventListener("DOMContentLoaded", function () {
  isAuthorized()
  loadDataFromLocalStorage();
  loadOverview(); 
  loadOrders(); 
  document.querySelectorAll(".review-details-btn").forEach(button => {
    button.addEventListener("click", function () {
      const orderId = this.getAttribute("data-order-id");
      const order = data.Orders?.find(o => o._id === orderId); 
  
      if (order) {
        let itemsDetails = "";
        order.Items.forEach(item => {
          itemsDetails += `
            <strong>Product Name:</strong> ${item.Name}<br>
            <strong>Description:</strong> ${item.Description}<br>
            <strong>Quantity:</strong> ${item.Quantity}<br>
            <strong>Price:</strong> ${item.Price}<br>
            <img src="${item.Images[0]}" alt="${item.Name}" style="width: 100px; height:100px; margin:0 auto"><br>
            <hr>
          `;
        });
  
        const orderDetails = `
          <strong>Order Number:</strong> ${order._id}<br>
          <hr>
          <strong>Date:</strong> ${new Date(order.CreatedAt).toLocaleString()}<br>
          <hr>
          <strong>Status:</strong> ${order.Status}<br>
          <hr>
          <strong>Items:</strong><br>${itemsDetails}
        `;
  
        document.getElementById("modalOrderDetails").innerHTML = orderDetails;
  
        const modal = new bootstrap.Modal(document.getElementById("orderDetailsModal"));
        modal.show();
      } else {
        alert("Order not found!");
      }
    });
  });

  const editProfileForm = document.getElementById("editProfileForm");
  if (editProfileForm) {
    editProfileForm.addEventListener("submit", updateCurrentUserProfile);
  }

  const changePasswordForm = document.getElementById("changePasswordForm");
  if (changePasswordForm) {
    changePasswordForm.addEventListener("submit", updatePassword);
  }
  loadDataFromLocalStorage();
  const table = document.querySelector(".table");
  const headers = table.querySelectorAll("th");
  let currentSortColumn = null;
  let sortDirection = true; // true for ascending, false for descending

  // Sorting headers
  headers.forEach((header, index) => {
    header.addEventListener("click", () => {
      sortDirection = currentSortColumn === index ? !sortDirection : true;
      currentSortColumn = index;
      sortTable(index, sortDirection);
    });
  });

  // Logout 
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", confirmLogout);
  }
});

// Sort Table Function
function sortTable(columnIndex, ascending) {
  const table = document.querySelector(".table");
  const rows = Array.from(table.querySelectorAll("tbody tr"));

  rows.sort((rowA, rowB) => {
    const cellA = rowA.children[columnIndex]?.innerText.trim() || "";
    const cellB = rowB.children[columnIndex]?.innerText.trim() || "";

    const a = isNaN(cellA) ? cellA : parseFloat(cellA);
    const b = isNaN(cellB) ? cellB : parseFloat(cellB);

    if (a < b) return ascending ? -1 : 1;
    if (a > b) return ascending ? 1 : -1;
    return 0;
  });

  // Append sorted rows 
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";
  rows.forEach(row => tbody.appendChild(row));
}
loadOverview();
loadOrders();

// Confirm logout
function confirmLogout() {
  Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
  }).then(result => {
      if (result.isConfirmed) {
          data.CurrentUser = null;
          saveDataInLocalStorage("currentUser", null);
          redirectToHome();
      }
  });
}

function redirectToHome() {
  window.location.href = "homeMain.html";
}

// Load user overview
function loadOverview() {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    console.error("No current user found.");
    return;
  }

  document.getElementById("fullName").innerText = currentUser.Name || "Unknown";
  document.getElementById("mail").innerText = currentUser.Email || "Unknown";
  document.getElementById("phone").innerText = currentUser.Phone || "Unknown";
  document.getElementById("street").innerText = currentUser.Street || "Unknown";
  document.getElementById("city").innerText = currentUser.City || "Unknown";

  const profileImage = currentUser.ProfileImage || "../assets/profile.png";
  document.getElementById("profileImage").src = profileImage;
  document.getElementById("editFullName").value = currentUser.Name || "";
  document.getElementById("editEmail").value = currentUser.Email || "";
  document.getElementById("editPhone").value = currentUser.Phone || "";
  document.getElementById("editCity").value = currentUser.City || "";
  document.getElementById("editStreet").value = currentUser.Street || "";

}

function updateCurrentUserProfile(event) {
  event.preventDefault();

  const currentUser = getCurrentUser();
  if (!currentUser) {
    Swal.fire("Error!", "Current user not found.", "error");
    return;
  }

  const username = document.getElementById("editFullName").value.trim();
  const email = document.getElementById("editEmail").value.trim();
  const phone = document.getElementById("editPhone").value.trim();
  const city = document.getElementById("editCity").value.trim();
  const street = document.getElementById("editStreet").value.trim();

  const profileImgElement = document.getElementById("profileImg");
  let profileImagePath = currentUser.ProfileImage || "../assets/profile.png";

  if (profileImgElement.files.length > 0) {
    const file = profileImgElement.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImagePath = e.target.result;
      document.getElementById("profileImage").src = profileImagePath;
    };
    reader.readAsDataURL(file);
  }

  if (!validateProfileFields(username, email, phone, city, street)) {
    return;
  }

  const updatedData = {
    Name: username || currentUser.Name,
    Email: email || currentUser.Email,
    Phone: phone || currentUser.Phone,
    City: city || currentUser.City,
    Street: street || currentUser.Street,
    ProfileImage: profileImagePath,
    _id: currentUser._id,
  };

  const users = getUsers();
  const userIndex = users.findIndex(user => user._id === currentUser._id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedData };
    data.CurrentUser = users[userIndex];
    saveDataInLocalStorage("users", users);
    saveDataInLocalStorage("currentUser", data.CurrentUser);

    loadOverview();
    Swal.fire("Success!", "Profile updated successfully.", "success");
  } else {
    Swal.fire("Error!", "User not found in the users list.", "error");
  }
}

function validateProfileFields(username, email, phone, city, street) {
  if (username === "" || username.length < 3) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Username',
      text: 'Username must contain at least 3 characters.',
    });
    return false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
    });
    return false;
  }

  const phonePattern = /^(011|012|010|015)\d{8}$/;
  if (!phonePattern.test(phone)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Phone Number',
      text: 'Phone number must start with 011, 012, 010, or 015 and contain 11 digits.',
    });
    return false;
  }

  if (city === "") {
    Swal.fire({
      icon: 'error',
      title: 'City Not Selected',
      text: 'Please select a city.',
    });
    return false;
  }

  const streetPattern = /[a-zA-Z]/;
  if (!streetPattern.test(street)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Street',
      text: 'Street must contain at least one letter.',
    });
    return false;
  }

  return true;
}

function encryptPassword(password) {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64); 
}

function updatePassword(event) {
  event.preventDefault();

  const currentUser = getCurrentUser();
  if (!currentUser) {
    Swal.fire("Error!", "Current user not found.", "error");
    return;
  }

  const currentPassword = document.getElementById("currentPassword").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const renewPassword = document.getElementById("renewPassword").value.trim();

  const encryptedCurrentPassword = encryptPassword(currentPassword);

  if (encryptedCurrentPassword !== currentUser.Password) {
    Swal.fire({
      icon: 'error',
      title: 'Incorrect Password',
      text: 'The current password you entered is incorrect.',
    });
    return;
  }

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  if (!passwordPattern.test(newPassword)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Password',
      text: 'Password must contain at least 6 characters, including an uppercase letter, a lowercase letter, and a special character.',
    });
    return;
  }

  if (newPassword !== renewPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Password Mismatch',
      text: 'The new password and confirmation password do not match.',
    });
    return;
  }

  const encryptedPassword = encryptPassword(newPassword);

  const users = getUsers();
  const userIndex = users.findIndex(user => user._id === currentUser._id);
  if (userIndex !== -1) {

    users[userIndex].Password = encryptedPassword;
    data.CurrentUser = { ...users[userIndex], Password: encryptedPassword };

    saveDataInLocalStorage("users", users);
    saveDataInLocalStorage("currentUser", data.CurrentUser);

    Swal.fire("Success!", "Password updated successfully.", "success");
  } else {
    Swal.fire("Error!", "User not found in the users list.", "error");
  }
}

// Load orders
function loadOrders() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    console.error("No current user found.");
    return;
  }

  const ordersTableBody = document.getElementById("ordersTableBody");
  if (!ordersTableBody) {
    console.error("Orders table body not found.");
    return;
  }

  ordersTableBody.innerHTML = "";

  if (!data.Orders || !Array.isArray(data.Orders)) {
    ordersTableBody.innerHTML = `<tr><td colspan="5" class="text-center">No orders found.</td></tr>`;
    return;
  }

  const userOrders = data.Orders.filter(order => order.UserID === currentUser._id);

  if (userOrders.length === 0) {
    ordersTableBody.innerHTML = `<tr><td colspan="5" class="text-center">No orders found.</td></tr>`;
  } else {
    userOrders.forEach(order => {
      const row = `
        <tr>
          <td>${order._id}</td>
          <td>${order.Status}</td>
          <td>${order.TotalAmount}</td>
          <td><button class="btn btn-info review-details-btn" data-order-id="${order._id}">Review Details</button></td>
        </tr>`;
      ordersTableBody.innerHTML += row;
    });
  }
}