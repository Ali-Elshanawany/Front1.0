import { addUser, saveDataInLocalStorage, loadDataFromLocalStorage, isAuthorized, data, SetUserById, getCurrentUser } from './Data.js';

function load() {
    loadDataFromLocalStorage();
    const currentUser = data.CurrentUser;

    if (currentUser) {
        console.log(currentUser);
        switch (currentUser.Role) {
            case "Admin":
                window.location.assign("../html/AdminHome.html");
                break;
            case "Seller":
                window.location.assign("../html/SellerProductDashboard.html");
                break;
            case "User":
                window.location.assign("../html/homeMain.html");
                break;
            default:
                console.error("Invalid role detected for the current user.");
        }
    }
}
const govAndCities = {
  cairo: ["Nasr City", "Heliopolis", "Maadi", "Zamalek", "Shubra"],
  alexandria: ["Smouha", "Stanley", "Miami", "Raml Station", "Gleem"],
  giza: ["Dokki", "Mohandessin", "6th of October", "Haram", "Sheikh Zayed"],
  aswan: ["Aswan City", "Edfu", "Kom Ombo", "Abu Simbel"],
  luxor: ["Luxor City", "Armant", "Esna", "Karnak"],
  "red sea": ["Hurghada", "Safaga", "El Quseir", "Marsa Alam"],
  sohag: ["Sohag City", "Akhmim", "Tahta", "Girga"],
  qena: ["Qena City", "Nag Hammadi", "Dishna", "Qus"],
  assiut: ["Assiut City", "Manfalut", "Dayrout", "Abnub"],
  menia: ["Minya City", "Mallawi", "Beni Mazar", "Maghagha"],
  beni_suef: ["Beni Suef City", "Nasser", "El Wasta", "Fashn"],
  fayoum: ["Fayoum City", "Ibshaway", "Sinnuris", "Tamiyah"],
  damietta: ["Damietta City", "New Damietta", "Faraskur", "Ezbet Al-Borg"],
  ismailia: ["Ismailia City", "Fayed", "El Qantara", "Abu Sultan"],
  port_said: ["Port Said City", "Port Fouad"],
  suez: ["Suez City", "Ain Sokhna"],
  dakahlia: ["Mansoura", "Talkha", "Mit Ghamr", "Sherbin", "Belqas"],
  sharqia: ["Zagazig", "10th of Ramadan", "Belbeis", "Abu Kabir"],
  gharbia: ["Tanta", "Mahalla", "Kafr El Zayat", "Zefta"],
  monufia: ["Shebin El Kom", "Menouf", "Sadat City", "Ashmoun"],
  kafr_el_sheikh: ["Kafr El Sheikh City", "Baltim", "Desouk", "Fuwwah"],
  beheira: ["Damanhour", "Kafr El Dawwar", "Rashid", "Edku"],
  matrouh: ["Marsa Matrouh", "Sidi Barrani", "El Alamein", "Siwa Oasis"],
  north_sinai: ["Arish", "Sheikh Zuweid", "Rafah", "Bir El Abd"],
  south_sinai: ["Sharm El Sheikh", "Dahab", "Nuweiba", "Taba"],
  new_valley: ["Kharga", "Dakhla", "Farafra", "Baris"],
};

document.addEventListener("DOMContentLoaded", () => {
  const govSelect = document.getElementById("Gov");
  const citySelect = document.getElementById("City");

  govSelect.addEventListener("change", () => {
    const selectedGov = govSelect.value;

    citySelect.innerHTML = '<option value="">Select City</option>';

    if (selectedGov && govAndCities[selectedGov]) {
      govAndCities[selectedGov].forEach(city => {
        const option = document.createElement("option");
        option.value = city.toLowerCase(); 
        option.textContent = city; 
        citySelect.appendChild(option);
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', load);

data.CurrentUser = null;

if (data.CurrentUser) {
  //  window.location.href = "homeMain.html"; 
}

//isAuthorized();
function isEmailRegistered(email) {
  console.log("data");
  const users = Array.isArray(data.Users) ? data.Users : [];
  return users.some(user => user.Email.toLowerCase() === email.toLowerCase());
}

function encryptPassword(password) {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64); 
}

document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase(); 
  const phone = document.getElementById('phone').value.trim();
  const city = document.getElementById('City').value;
  const gov = document.getElementById('Gov').value;
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
  if (isEmailRegistered(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Email Already Registered',
      text: 'This email is already registered. Please use a different one.',
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

  if (gov === "") {
    Swal.fire({
      icon: 'error',
      title: 'Governrate Not Selected',
      text: 'Please select a city.',
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
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  if (!passwordPattern.test(password)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Password',
      text: 'Password must contain at least 6 characters, including an uppercase letter, a lowercase letter, and a special character.',
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

  const encryptedPassword = encryptPassword(password);

  const newUser = {
    _id: `user${Date.now()}`,
    Name: username,
    Email: email,
    Phone: phone,
    City: city,
    Street: street,
    Password: encryptedPassword,
    Role: userType,
    CreatedAt: new Date().toISOString(),
    TotalSales: userType == "Seller" ? 0 : undefined,
    cart: userType == "User" ? [] : undefined,
    orders: userType == "User" ? [] : undefined
  };

  function setCurrentUser(user) {
    if (user && typeof user === "object") {
      data.CurrentUser = user;
      const userIndex = data.Users.findIndex((u) => u._id === user._id);
      if (userIndex !== -1) {
        data.Users[userIndex] = user;
      } else {
        console.error("User not found in Users array.");
      }
      saveDataInLocalStorage();
      console.log("Current user has been set successfully:", user);
    } else {
      console.error("Invalid user data provided to setCurrentUser.");
    }
  }

  addUser(newUser);

   setCurrentUser(newUser);
   transferGuestCartToUserCart()
   //saveDataInLocalStorage();
   console.log("User added successfully!");
   console.log(newUser);

  Swal.fire('Success', 'User registered successfully!', 'success').then(() => {
    console.log('Redirecting to login page...');

    const currentUser = getCurrentUser();
    console.log('Current User:', currentUser);

    if (currentUser.Role === "Seller") {
        window.location.href = "/html/SellerHome.html";
    } else if (currentUser.Role === "User") {
        window.location.href = 'homeMain.html';
    }
  });
});


function transferGuestCartToUserCart() {
   const guestCart = data.guestCart || [];
   if (guestCart.length > 0) {
       const currentUser = data.CurrentUser;
       if (!currentUser) {
           console.error("No user is logged in to transfer the cart.");
           return;
       }

       const userCart = currentUser.cart || [];
       guestCart.forEach(item => {
           const existingItem = userCart.find(uItem => uItem._id === item._id);
           if (existingItem) {
               existingItem.Quantity += item.Quantity;
           } else {
               userCart.push(item);
           }
       });

       currentUser.cart = userCart;
       data.guestCart = [];

       SetUserById(currentUser);
       saveDataInLocalStorage();

       console.log("Guest cart transferred to user cart successfully.");
   } else {
       console.log("Guest cart is empty. No items to transfer.");
   }
}

const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

togglePassword.addEventListener('click', function () {
  const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordField.setAttribute('type', type);
  this.classList.toggle('bi-eye');
  this.classList.toggle('bi-eye-slash');
});