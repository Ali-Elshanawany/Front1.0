import { getCurrentUser, getUsers, saveDataInLocalStorage, loadDataFromLocalStorage, data ,isAuthorized} from './Data.js';


document.addEventListener("DOMContentLoaded", function () {

  //saveDataInLocalStorage();
  loadDataFromLocalStorage(); 
  console.log("looog")
  console.log(data.CurrentUser);
  if(data.CurrentUser==null){
    console.log("looog")
    location.assign("../html/homeMain.html")
  }
 // isAuthorized();
  loadOverview(); 
  loadOrders(); 

  const editProfileForm = document.getElementById("editProfileForm");
  if (editProfileForm) {
    editProfileForm.addEventListener("submit", updateCurrentUserProfile);
  }
  const changePasswordForm = document.getElementById("changePasswordForm");
  if (changePasswordForm) {
    changePasswordForm.addEventListener("submit", updatePassword);
  }

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", confirmLogout);
  }
});

function loadOverview() {
  /*  const currentUser = {
        "_id": "User1", 
        "Name": "User1",
        "Email": "User1@User.com",
        "Phone": "01211145011",
        "City": "red_sea",
        "Street": "main street",
        "Password": "asdASD123!@3",
        "Role": "User",
        "cart": [],
        "Img": ""
    };*/
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

  const profileImage = "../assets/profile.png";
  document.getElementById("profileImage").src = profileImage;

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
  const img=document.getElementById("profileImg").value;

  if (username === "" || username.length < 3) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Username',
      text: 'Username must contain at least 3 characters and not be empty.',
    });
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
    });
    return;
  }

  const phonePattern = /^(011|012|010|015)\d{8}$/;
  if (!phonePattern.test(phone)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Phone Number',
      text: 'Phone number must start with 011, 012, 010, or 015 and contain 11 digits.',
    });
    return;
  }

  if (city === "") {
    Swal.fire({
      icon: 'error',
      title: 'City Not Selected',
      text: 'Please select a city.',
    });
    return;
  }

  const streetPattern = /[a-zA-Z]/;
  if (!streetPattern.test(street)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Street',
      text: 'Street must contain at least one letter.',
    });
    return;
  }
  const profileImagePath = CreatePath(profileImg.value)|| "../assets/profile.png";

  
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

function CreatePath(imgPath) {
  if (!imgPath) return "assets/img/profile.png"; 
  const fileName = imgPath.split("\\").pop(); 
  return `assets/img/${fileName}`; 
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

  if (currentPassword !== currentUser.Password) {
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

  const users = getUsers();
  const userIndex = users.findIndex(user => user._id === currentUser._id);
  if (userIndex !== -1) {
    users[userIndex].Password = newPassword;
    data.CurrentUser.Password = newPassword;

    saveDataInLocalStorage("users", users);
    saveDataInLocalStorage("currentUser", data.CurrentUser);

    loadOverview();

    const overviewTab = document.querySelector("[data-bs-target='#profile-overview']");
    if (overviewTab) {
      overviewTab.click();
    }

    Swal.fire("Success!", "Password updated successfully.", "success");
  } else {
    Swal.fire("Error!", "User not found in the users list.", "error");
  }
}


function loadOrders() {
  const currentUser = getCurrentUser(); 
  console.log(currentUser);
  if (!currentUser) {
      console.error("No current user found.");
      return;
  }

  const ordersTableBody = document.getElementById("ordersTableBody");
  if (!ordersTableBody) return;

  ordersTableBody.innerHTML = "";

  if (!data.Orders || !Array.isArray(data.Orders)) {
      console.error("Orders data is missing or invalid.");
      return;
  }

  const userOrders = data.Orders.filter(order => order.UserID === currentUser._id);
  console.log(userOrders);
  console.log(data.Orders)

  if (userOrders.length === 0) {
      ordersTableBody.innerHTML = `<tr><td colspan="3" class="text-center">No orders found.</td></tr>`;
  } else {
      userOrders.forEach(order => {
          order.Items.forEach(item => {
              const product = data.Products.find(p => p._id === item.ProductID);
              const productName = product ? product.Name : "Unknown Product";

              const row = `
                <tr>
                   <td>${order._id}</td>
                  <td>${productName}</td>
                  <td>${item.Quantity}</td>
                  <td>${order.Status || "Unknown Status"}</td>
                </tr>`;
              ordersTableBody.innerHTML += row;
          });

      });
  }
}

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
