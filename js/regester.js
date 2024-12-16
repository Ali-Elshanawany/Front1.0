import { addUser, saveDataInLocalStorage, loadDataFromLocalStorage,isAuthorized } from './Data.js';

loadDataFromLocalStorage();
//isAuthorized();
function isEmailRegistered(email) {
   const users = JSON.parse(localStorage.getItem("Users")) || [];
   return users.some(user => user.Email === email);
}
function encryptPassword(password) {
   return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64); // SHA-256 hash and convert to Base64
}

document.getElementById('registerForm').addEventListener('submit', function (event) {
   event.preventDefault(); 

   const username = document.getElementById('username').value.trim();
   const email = document.getElementById('email').value.trim();
   const phone = document.getElementById('phone').value.trim();
   const city = document.getElementById('city').value;
   const street = document.getElementById('street').value.trim();
   const password = document.getElementById('password').value.trim();
   const userTypeElement = document.querySelector('input[name="user_type"]:checked');
   const userType = userTypeElement ? userTypeElement.value : null;

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

   if (!userType) {
      Swal.fire({
         icon: 'error',
         title: 'User Type Not Selected',
         text: 'Please select a user type (Seller or User).',
      });
      return;
   }

   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
   if (!passwordPattern.test(password)) {
      Swal.fire({
         icon: 'error',
         title: 'Invalid Password',
         text: 'Password must contain at least 6 characters, including an uppercase letter, a lowercase letter, and a special character.',
      });
      return;
   }
   

   if (isEmailRegistered(email)) {
      Swal.fire({
         icon: 'error',
         title: 'Email Already Registered',
         text: 'This email is already registered. Please use a different one.',
      });
      return;
   }
   
   

  const encryptedPassword = encryptPassword(password);

  const newUser = {
     _id: `user${Date.now()}`,
     Name: username,
     Email: email,
     Phone: phone,
     City: city,
     Street: street,
     Password: encryptedPassword, // Store encrypted password
     Role: userType, 
     CreatedAt: new Date().toISOString(),
     TotalSales: userType == "Seller" ? 0 : undefined,
     cart: userType == "User" ? [] : undefined
  };

   addUser(newUser);
   saveDataInLocalStorage();
   console.log("User added successfully!");
   console.log(newUser);

   Swal.fire('Success', 'User registered successfully!', 'success').then(() => {
      window.location.href = 'login.html';
   });
});

const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

togglePassword.addEventListener('click', function () {
   const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
   passwordField.setAttribute('type', type);
   this.classList.toggle('bi-eye');
   this.classList.toggle('bi-eye-slash');
});
