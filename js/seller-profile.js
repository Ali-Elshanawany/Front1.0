import { getUsers, saveDataInLocalStorage, loadDataFromLocalStorage, data, isAuthorized, getCurrentUser } from './Data.js';

function encryptPassword(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64); 
}

document.addEventListener("DOMContentLoaded", function () {
    loadDataFromLocalStorage(); 
    loadOverview(); 
    loadSellerProducts();

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

    const showDataButton = document.querySelector("button[data-bs-target='#dataModal']");
    if (showDataButton) {
        showDataButton.addEventListener("click", function () {
            const rows = document.querySelectorAll("#ordersTableBody tr");
            let tableRows = "";
            rows.forEach(row => {
                const columns = row.querySelectorAll("td");
                if (columns.length > 0) {
                    tableRows += `
                        <div>
                            <h5>Product Name: ${columns[2].innerText}</h5>
                            <p>Product ID: ${columns[1].innerText}</p>
                            <p>Stock: ${columns[3].innerText}</p>
                            <p>Price: ${columns[4].innerText}</p>
                        </div>
                        <hr>`;
                }
            });
            document.getElementById("modalBody").innerHTML = tableRows;
        });
    }

    const table = document.querySelector(".table");
    const headers = table.querySelectorAll("th");
    let sortDirection = true; 

    headers.forEach((header, index) => {
        header.addEventListener("click", () => {
            sortTable(index, sortDirection);
            sortDirection = !sortDirection;
        });
    });

    function sortTable(columnIndex, ascending) {
        const rows = Array.from(table.querySelectorAll("tbody tr"));

        rows.sort((rowA, rowB) => {
            const cellA = rowA.children[columnIndex].innerText.trim();
            const cellB = rowB.children[columnIndex].innerText.trim();

            const a = isNaN(cellA) ? cellA : parseFloat(cellA);
            const b = isNaN(cellB) ? cellB : parseFloat(cellB);

            if (a < b) return ascending ? -1 : 1;
            if (a > b) return ascending ? 1 : -1;
            return 0;
        });

        const tbody = table.querySelector("tbody");
        tbody.innerHTML = "";
        rows.forEach(row => tbody.appendChild(row));
    }
});

function loadOverview() {
    const Seller = getCurrentUser();
    if (!Seller) {
        console.error("No Seller user found.");
        return;
    }

    data.CurrentUser = Seller;
    saveDataInLocalStorage("currentUser", data.CurrentUser);

    document.getElementById("fullName").innerText = Seller.Name || "Unknown";
    document.getElementById("mail").innerText = Seller.Email || "Unknown";
    document.getElementById("phone").innerText = Seller.Phone || "Unknown";
    document.getElementById("street").innerText = Seller.Street || "Unknown";
    document.getElementById("city").innerText = Seller.City || "Unknown";

    const profileImage = Seller.ProfileImage || "../assets/profile.png";
    document.getElementById("profileImage").src = profileImage;
}

function loadSellerProducts() {
    const Seller = getCurrentUser();
    if (!Seller || !Seller._id) {
        console.error("Seller not defined or Seller ID missing.");
        return;
    }

    const sellerID = Seller._id;
    const sellerProducts = data.Products.filter(product => product.SellerID === sellerID);

    console.log(sellerProducts);

    const ordersTableBody = document.getElementById("ordersTableBody");
    if (!ordersTableBody) {
        console.error("Orders table body not found.");
        return;
    }

    ordersTableBody.innerHTML = "";

    if (!data.Products || !Array.isArray(data.Products)) {
        console.error("Product data is missing or invalid.");
        ordersTableBody.innerHTML = `<tr><td colspan="5" class="text-center">No Products found.</td></tr>`;
        return;
    }

    if (sellerProducts.length === 0) {
        ordersTableBody.innerHTML = `<tr><td colspan="5" class="text-center">No products found for this seller.</td></tr>`;
    } else {
        sellerProducts.forEach(product => {
            const firstImage = product.Images && product.Images.length > 0 ? product.Images[0] : "../assets/default-image.jpg";

            const row = `
                <tr>
                    <td><img src="${firstImage}" alt="${product.Name}" style="width: 80px; height: 80px; object-fit: cover;"></td>
                    <td>${product._id}</td>
                    <td>${product.Name}</td>
                    <td>${product.Stock}</td>
                    <td>${product.Price}</td>
                </tr>`;
            ordersTableBody.innerHTML += row;
        });
    }
}

function updateAdminProfile(event) {
    event.preventDefault();

    const Seller = getCurrentUser();
    if (!Seller) {
        Swal.fire("Error!", "Current user not found.", "error");
        return;
    }

    const username = document.getElementById("editFullName").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const phone = document.getElementById("editPhone").value.trim();
    const city = document.getElementById("editCity").value.trim();
    const street = document.getElementById("editStreet").value.trim();

    const profileImgElement = document.getElementById("profileImg");
    let profileImagePath = Seller.ProfileImage || "../assets/profile.png";

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
        Name: username || Seller.Name,
        Email: email || Seller.Email,
        Phone: phone || Seller.Phone,
        City: city || Seller.City,
        Street: street || Seller.Street,
        ProfileImage: profileImagePath,
        _id: Seller._id,
    };

    const users = getUsers();
    const SellerIndex = users.findIndex(user => user._id === Seller._id);
    if (SellerIndex !== -1) {
        users[SellerIndex] = { ...users[SellerIndex], ...updatedData };
        saveDataInLocalStorage("users", users);

        data.CurrentUser = users[SellerIndex];
        saveDataInLocalStorage("currentUser", data.CurrentUser);

        document.getElementById("fullName").innerText = updatedData.Name || "Unknown";
        document.getElementById("mail").innerText = updatedData.Email || "Unknown";
        document.getElementById("phone").innerText = updatedData.Phone || "Unknown";
        document.getElementById("street").innerText = updatedData.Street || "Unknown";
        document.getElementById("city").innerText = updatedData.City || "Unknown";
        document.getElementById("profileImage").src = updatedData.ProfileImage || "../assets/profile.png";

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
            text: 'Street must contain letters.',
        });
        return false;
    }

    return true;
}

function updatePassword(event) {
    event.preventDefault();

    const Seller = getCurrentUser();
    if (!Seller) {
        Swal.fire("Error!", "Current user not found.", "error");
        return;
    }

    const oldPassword = document.getElementById("oldPassword").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!oldPassword || !newPassword || !confirmPassword) {
        Swal.fire("Error!", "Please fill in all fields.", "error");
        return;
    }

    if (newPassword !== confirmPassword) {
        Swal.fire("Error!", "New password and confirmation do not match.", "error");
        return;
    }

    if (newPassword.length < 6) {
        Swal.fire("Error!", "New password must be at least 6 characters.", "error");
        return;
    }

    const encryptedOldPassword = encryptPassword(oldPassword);
    if (Seller.Password !== encryptedOldPassword) {
        Swal.fire("Error!", "Old password is incorrect.", "error");
        return;
    }

    const encryptedNewPassword = encryptPassword(newPassword);
    Seller.Password = encryptedNewPassword;

    const users = getUsers();
    const SellerIndex = users.findIndex(user => user._id === Seller._id);
    if (SellerIndex !== -1) {
        users[SellerIndex].Password = encryptedNewPassword;
        saveDataInLocalStorage("users", users);
        Swal.fire("Success!", "Password updated successfully.", "success");
    } else {
        Swal.fire("Error!", "User not found.", "error");
    }
}

function confirmLogout() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout',
        cancelButtonText: 'No, cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            data.CurrentUser = null;
            saveDataInLocalStorage("currentUser", null);
            redirectToHome(); 
            console.log("Logged out");
        }
    });
}

function redirectToHome() {
    window.location.href = "homeMain.html";
}