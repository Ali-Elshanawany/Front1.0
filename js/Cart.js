import {
    data,
    getProductById,
    getCurrentUser,
    getUserById,
    getCurrentCart,
    changeCartItemCount,
    DeleteFromCart,
    isAuthorized,
    loadDataFromLocalStorage,
} from "./Data.js";
import { updateCartCounter } from "./home.js";
// Load data from local storage
loadDataFromLocalStorage();

isAuthorized();

let usercart = getCurrentCart();
let cart = usercart.map((item) => ({
    _id: item._id,
    name: item.Name,
    product: getProductById(item._id),
    num: item.Quantity,
}));

window.addEventListener("load", function () {
    let cards = this.document.getElementById("items");
    generateCards();

    function generateCards() {
        let flag = 0;
        cards.innerHTML = "";

        if (cart.length == 0) {
            cards.innerHTML = `
            <div class="row">
                <div class="col-lg-12 text-center emptyCart">
                    <span class="fs-1 fw-bold">Your Cart Is Empty</span>
                </div>
            </div>`;
            document.getElementById("CheckOut").style.display = "none";
            return;
        }

        let outOfStockFlag = false;
        let outOfStockProducts = [];

        let reducedStockFlag = false;
        let reducedStockProducts = [];

        let removedProductsFlag = false;
        let removedProducts = [];
        let total = 0;

        cart.forEach((item) => {
            if (!item.product) {
                DeleteFromCart(item._id);
                removedProductsFlag = true;
                removedProducts.push(item.name);
                console.error(`Product with ID ${item._id} not found !!!!!!!!!!!`);
                return;
            }

            if (item.product.Stock === 0) {
                DeleteFromCart(item.product._id);
                outOfStockFlag = true;
                outOfStockProducts.push(item.product.Name);
            } else {
                if (item.num > item.product.Stock) {
                    item.num = item.product.Stock;
                    changeCartItemCount(item.product._id, item.product.Stock);
                    reducedStockFlag = true;
                    reducedStockProducts.push(item.product.Name);
                }

                total += item.product.Price * item.num;

                cards.innerHTML += `<div id="${flag}" class="card m-1 luxurious-card">
                <div class="row g-0">
                    <div class="col-lg-2">
                        <img src="${item.product.Images[0]}" class="img-fluid rounded" alt="${item.product.Name}">
                    </div>
                    <div class="col-md-10 ">  
                        <div class="card-body d-flex flex-column flex-lg-row gap-3">
                            <!-- Information -->
                            <div class="col-lg-7 col-sm-12 flex-grow-1">
                                <h5 class="card-title" style="font-size: 1.4rem;font-family: 'Raleway', sans-serif;">${item.product.Name}</h5>
                                <p class="card-text card-text1" style="font-size: 1.1rem;font-family: 'Raleway', sans-serif;">${item.product.Description}</p>
                                <p class="card-text" style="font-size: 1rem;">
                                    <small class="text-body-secondary">
                                        <span class="badge bg-dark bg-gradient" style="font-size: 0.75rem;">Seller: ${getUserById(item.product.SellerID)?.Name || 'Bob Alice'}</span>
                                        <br>
                                        <span class="badge bg-warning text-dark" style="font-size: 0.75rem;">Only ${item.product.Stock - item.num} left in stock</span>
                                    </small>
                                </p>
                            </div>
                            <!-- End of information -->
                            <!-- Controls -->
                            <div class=" pt-4 text-center col-lg-4 col-sm-12">
                                <button id="close" class="float-end btn btn-lg btn-close rounded-circle" data-id="${item.product._id}"> </button>
                                <h3 class="price mt-2 mb-3" style="font-size: 1.5rem;">${item.product.Price}$</h3>
                                <div class="btn-group numOfItems">
                                    <button style="background: #f5f5dc; color: #8b4513; border: 1px solid #8b4513; font-size: 1.5rem;" id="${flag}" class="btn fs-4">-</button>
                                    <span class="fs-2 mx-3" style="font-size: 1.5rem;">${item.num}</span>
                                    <button style="background: #f5f5dc; color: #8b4513; border: 1px solid #8b4513; font-size: 1.5rem;" id="${flag}" class="btn">+</button>
                                </div>
                            </div>
                            <!-- End of controls -->
                        </div>
                        <!-- End of Control and information -->
                    </div>
                </div>
                </div>`;

                flag++; // increase the flag to get the next item
            }
        });

        if (outOfStockFlag || reducedStockFlag || removedProductsFlag) {
            let message = '';
            if (outOfStockFlag) {
                message += `The Following Items Became Out Of Stock And Were Removed From Your Cart: ${outOfStockProducts.join(', ')}.<br><br>`;
            }
            if (reducedStockFlag) {
                message += `The Stock For The Following Items Were Reduced And Your Cart Quantities Were Adjusted: ${reducedStockProducts.join(', ')}.<br><br>`;
            }
            if (removedProductsFlag) {
                message += `The Following Items Were Removed From The Website And Were Removed From Your Cart: ${removedProducts.join(', ')}.<br>`;
            }
            let title = '';
            if (outOfStockFlag && reducedStockFlag && removedProductsFlag) {
                title = "Cart Adjusted";
            } else if (outOfStockFlag) {
                title = "Out of Stock";
            } else if (reducedStockFlag) {
                title = "Stock Reduced";
            } else if (removedProductsFlag) {
                title = "Removed from Website";
            }

            Swal.fire({
                icon: outOfStockFlag ? "error" : "warning",
                title: title,
                html: message.trim(),
            }).then(() => {
                usercart = getCurrentCart();
                cart = usercart.map((item) => ({
                    _id: item._id,
                    name: item.Name,
                    product: getProductById(item._id),
                    num: item.Quantity,
                }));

                generateCards();
                
            });
        }

        document.getElementById("Total").innerText = total.toFixed(2) + "$";
    }

    cards.addEventListener("click", function (e) {
        if (e.target.innerText == "+") {
            let cardID = +e.target.id;

            if (cart[cardID].num == cart[cardID].product.Stock) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Sorry, there is no more of this item in the seller's stock",
                });
                return;
            }

            changeCartItemCount(cart[cardID].product._id, cart[cardID].num + 1);
            cart[cardID].num += 1;
            generateCards();
            updateCartCounter()
        }

        if (e.target.innerText == "-") {
            let cardID = +e.target.id;

            if (cart[cardID].num - 1 == 0) {
                return;
            }

            changeCartItemCount(cart[cardID].product._id, cart[cardID].num - 1);
            cart[cardID].num -= 1;
            generateCards();
            updateCartCounter()
        }

        if (e.target.dataset.id) {
            const itemId = e.target.dataset.id;
            DeleteFromCart(itemId);
            cart = cart.filter(item => item.product._id !== itemId);
            generateCards();
            updateCartCounter()
        }
    });

    let CheckOut = document.getElementById("proceed");

    CheckOut.addEventListener("click", function (e) {
        if (data.CurrentUser) {
            if (data.CurrentUser.Role === "User") {
                location.assign("../html/Checkout.html");
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to sign in in order to make an order",
            }).then(() => {
                location.assign("../html/Login.html");
            });
        }
    });



    document.addEventListener('DOMContentLoaded', function() {
        const homeNav = document.querySelector('.homeNav');
        const productNav = document.querySelector('.productNav');
        const contactNav = document.querySelector('.contactNav');
        const aboutNav = document.querySelector('.aboutNav');
        const logoutButton = document.getElementById("logoutButton");
    
        if (homeNav) {
            homeNav.addEventListener('click', function() {
                window.location.href = "homeMain.html";
            });
        }
    
        if (productNav) {
            productNav.addEventListener('click', function() {
                window.location.href = "homeMain.html#product";
            });
        }
    
        if (contactNav) {
            contactNav.addEventListener('click', function() {
                window.location.href = "homeMain.html#contact";
            });
        }
    
        if (aboutNav) {
            aboutNav.addEventListener('click', function() {
                window.location.href = "homeMain.html#about";
            });
        }
    
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
            }).then((result) => {
                if (result.isConfirmed) {
                    data.CurrentUser = null;
                    saveDataInLocalStorage("currentUser", null);
                    redirectToHome();
                }
            });
        }
    
        function redirectToHome() {
            window.location.href = "login.html";
        }
    
    });
    
});