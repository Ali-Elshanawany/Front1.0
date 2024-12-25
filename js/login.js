import { data, getUserByEmail, loadDataFromLocalStorage, saveDataInLocalStorage, SetUserById ,getCurrentCart} from './Data.js';

loadDataFromLocalStorage();

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const passwordErrorMessage = document.getElementById('passwordError');
passwordErrorMessage.style.color = 'red'; 

data.CurrentUser = null;
let failedAttempts = 0;
let loginBlocked = false;
let blockTimer;
let countdownTimer; 

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    this.classList.toggle('ri-eye-line');
    this.classList.toggle('ri-eye-off-line');
});

function validateInputs(email, password) {
    let isValid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(email)) {
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
        });
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordPattern.test(password)) {
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'Invalid Password',
            text: 'Password must contain at least 6 characters, including an uppercase letter, a lowercase letter, and a special character.',
        });
    }

    return isValid;
}

function setCurrentUser(user) {
    if (user && typeof user === "object") {
        data.CurrentUser = user;
        const userIndex = data.Users.findIndex((u) => u._id === user._id);
        if (userIndex !== -1) {
            data.Users[userIndex] = user;
            saveDataInLocalStorage();
        } else {
            console.error("User not found in Users array.");
        }
        console.log("Current user has been set successfully:", user);
    } else {
        console.error("Invalid user data provided to setCurrentUser.");
    }
}

function encryptPassword(password) {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64); // استخدم نفس التنسيق دائمًا
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    if (loginBlocked) {
        Swal.fire({
            icon: 'warning',
            title: 'Please wait...',
            text: `You have been blocked from logging in. Please try again after ${30 - failedAttempts}s.`,
            showConfirmButton: false,
            timer: 30000 // 30 seconds
        });
        return;
    }

    const email = document.getElementById('email').value.trim().toLowerCase(); 
    const password = document.getElementById('password').value.trim();


    if (!validateInputs(email, password)) {
        return;
    }
    const user = data.Users.find(user => user.Email.toLowerCase() === email);
    if (user) {
        if (encryptPassword(password) === user.Password) {
            setCurrentUser(user);
            transferGuestCartToUserCart();
            getCurrentCart();
            
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: `Welcome back, ${user.Name}!`,
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                if (user.Role == "Seller") {
                    window.location.assign("../html/SellerHome.html");
                } else if (user.Role == "Admin") {
                    window.location.assign("../html/AdminHome.html");
                } else {
                    window.location.href = 'homeMain.html';
                }
            });
    
            failedAttempts = 0;
            passwordErrorMessage.textContent = '';
        } else {

            failedAttempts++;
            console.log("Password does not match.");
    
            if (failedAttempts >= 3) {
                loginBlocked = true;
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: `Incorrect password. You are blocked for 30 seconds.`,
                    showConfirmButton: false,
                    timer: 30000
                }).then(() => {
                    startBlockTimer();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Password',
                    text: `Incorrect password. Try again. Remaining attempts: ${3 - failedAttempts}`,
                });
            }
        }
    } else {

        console.log("Email not registered.");
        Swal.fire({
            icon: 'error',
            title: 'Email Not Registered',
            text: 'The email you entered is not registered. Please sign up first.',
        });
    }

    loadDataFromLocalStorage();
});

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

function transferGuestCartToUserCart() {
    const guestCart = data.guestCart || [];
    if (guestCart.length > 0) {
        const currentUser = data.CurrentUser;
        if (!currentUser) {
            console.error("No user is logged in to transfer the cart.");
            return;
        }

        if (currentUser.Role !== "User") {
            console.log("Current user is not a User. Cart transfer skipped.");
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

function startBlockTimer() {
    let countdown = 30; 

    countdownTimer = setInterval(() => {
        if (countdown > 0) {
            passwordErrorMessage.textContent = `You are blocked for 30 seconds. Please wait... (${countdown--}s)`;
        } else {
            clearInterval(countdownTimer);
            loginBlocked = false
            passwordErrorMessage.textContent = ''; 
        }
    }, 1000); 
}