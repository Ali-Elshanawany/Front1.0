import { getCurrentUser, getUsers,saveDataInLocalStorage, loadDataFromLocalStorage, data, isAuthorized } from './Data.js';

let admin;

document.addEventListener("DOMContentLoaded", function () {
    loadDataFromLocalStorage();  
    populateUserSellerTable();

    loadOverview();
    function populateUserSellerTable() {
        const tableBody = document.getElementById("ordersTableBody");
    
        if (!data.Users || data.Users.length === 0) {
            console.error("No users found.");
            return;
        }
    
        const users = data.Users.filter(user => user.Role === 'User');
        const sellers = data.Users.filter(user => user.Role === 'Seller');
    
        let tableRows = '';
    
        const maxLength = Math.max(users.length, sellers.length);
    
        for (let i = 0; i < maxLength; i++) {
            const user = users[i] || {}; 
            const seller = sellers[i] || {}; 
    
            tableRows += `
                <tr>
                    <td>${user.Name || ""}</td>
                    <td>${user.Email || ""}</td>
                    <td>${seller.Name || ""}</td>
                    <td>${seller.Email || ""}</td>
                </tr>
            `;
        }
    
        tableBody.innerHTML = tableRows;
    }
});
const editProfileForm = document.getElementById("editProfileForm");
if (editProfileForm) {
    editProfileForm.addEventListener("submit", updateAdminProfile);
}

const changePasswordForm = document.getElementById("changePasswordForm");
if (changePasswordForm) {
    changePasswordForm.addEventListener("submit", updatePassword);
}

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", confirmLogout);
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
            saveDataInLocalStorage("admin", null);
            saveDataInLocalStorage("currentUser", null);  
            redirectToHome();
        }
    });
}


function redirectToHome() {
    window.location.href = "homeMain.html";
}function loadOverview() {
    admin = getCurrentUser();
    if (!admin) {
        console.error("No admin user found.");
        return;
    }

    data.CurrentUser = admin; 
    saveDataInLocalStorage("currentUser", data.CurrentUser); 

    document.getElementById("fullName").innerText = admin.Name || "Unknown";
    document.getElementById("mail").innerText = admin.Email || "Unknown";
    document.getElementById("phone").innerText = admin.Phone || "Unknown";
    document.getElementById("street").innerText = admin.Street || "Unknown";
    document.getElementById("city").innerText = admin.City || "Unknown";

    const profileImage = admin.ProfileImage || "../assets/profile.png";
    document.getElementById("profileImage").src = profileImage;
}



function updateAdminProfile(event) {
    event.preventDefault();
    if (!admin) {
        Swal.fire("Error!", "Current user not found.", "error");
        return;
    }
    const username = document.getElementById("editFullName").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const phone = document.getElementById("editPhone").value.trim();
    const city = document.getElementById("editCity").value.trim();
    const street = document.getElementById("editStreet").value.trim();

    const profileImgElement = document.getElementById("profileImg");
    let profileImagePath = admin.ProfileImage || "../assets/profile.png";

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
        Name: username || admin.Name,
        Email: email || admin.Email,
        Phone: phone || admin.Phone,
        City: city || admin.City,
        Street: street || admin.Street,
        ProfileImage: profileImagePath,
        _id: admin._id,
    };

    const users = getCurrentUser();
    const adminIndex = users.findIndex(user => user._id === admin._id);
    if (adminIndex !== -1) {
        users[adminIndex] = { ...users[adminIndex], ...updatedData };
        data.admin = users[adminIndex];
        saveDataInLocalStorage("users", users);
        saveDataInLocalStorage("Admin", data.admin);
        saveDataInLocalStorage("currentUser", data.admin);  

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
  
async function updatePassword(event) {
    event.preventDefault();
    const admin = getCurrentUser();

    if (!admin) {
        Swal.fire("Error!", "Current user not found.", "error");
        return;
    }
    const currentPassword = document.getElementById("currentPassword").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const renewPassword = document.getElementById("renewPassword").value.trim();
  
    const encryptedCurrentPassword = encryptPassword(currentPassword);
    console.log("Encrypted Current Password:", encryptedCurrentPassword);
    console.log("Stored Password:", admin.Password);
  
    if (encryptedCurrentPassword !== admin.Password) {
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
    const adminIndex = users.findIndex(user => user._id === admin._id);
    if (adminIndex !== -1) {
        users[adminIndex].Password = encryptedPassword;
        data.CurrentUser.Password = encryptedPassword;

        saveDataInLocalStorage("users", users);
        saveDataInLocalStorage("currentUser", data.CurrentUser);

        loadOverview();
        Swal.fire("Success!", "Password updated successfully.", "success");
    } else {
        Swal.fire("Error!", "User not found in the users list.", "error");
    }
}
