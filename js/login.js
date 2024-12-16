import { data,getUserByEmail, loadDataFromLocalStorage, getCurrentCart } from './Data.js';

loadDataFromLocalStorage();
if(data.CurrentUser != null){
    window.open("homeMain.html", "_blank");

}

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

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
        localStorage.setItem('CurrentUser', JSON.stringify(user));
        console.log("Current user has been set successfully:", user);
    } else {
        console.error("Invalid user data provided to setCurrentUser.");
    }
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!validateInputs(email, password)) {
        return;
    }

    const user = getUserByEmail(email);

    if (user) {
        console.log("Matching user:", user);
        if (user.Password === password) {
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
                window.location.href = 'homeMain.html';
            });
        } else {
            console.log("Password does not match.");
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Incorrect password. Please try again.',
            });
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

const currentUser = data.CurrentUser; // أو استرجع CurrentUser من localStorage إذا لزم الأمر

if (currentUser) {
    console.log(currentUser)
    if (currentUser.Role === "Seller") {
        window.location.assign("../html/SellerProductDashboard.html")
    } if(currentUser.Role === "Admin"){
        window.location.assign("../html/AccountsDataTable.html")
    }
    if(currentUser.Role === "User"){
        window.location.assign("../html/homeMain.html")
    }

    // } else{
    //     window.location.href = "homeMain.html";
    // }
}

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
            const existingItem = userCart.find(uItem => uItem.ProductID === item.ProductID);
            if (existingItem) {
                existingItem.Quantity += item.Quantity;
            } else {
                userCart.push(item);
            }
        });

        currentUser.cart = userCart;
        data.guestCart = [];

        const users = getUsers();
        const userIndex = users.findIndex(user => user._id === currentUser._id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            saveDataInLocalStorage();
        } else {
            console.error("Current user not found in users array.");
        }

        console.log("Guest cart transferred to user cart successfully.");
    } else {
        console.log("Guest cart is empty. No items to transfer.");
    }
}

