import {
    getProductById,
    data,
    getCurrentUser,
    getUserById,
    changeCartItemCount,
    DeleteFromCart,
    getCurrentCart,
    saveDataInLocalStorage,
    generateRandomId,
    isAuthorized,
    loadDataFromLocalStorage
  } from "./Data.js";

loadDataFromLocalStorage();

const user = getCurrentUser();
isAuthorized();

let ucart = user.cart;
let cart = ucart.map((item) => ({ // mapping the cart to get the product and the quantity of each product
  product: getProductById(item._id),
  num: item.Quantity,
}));



const forms = document.querySelectorAll(".needs-validation");
const form = document.querySelector("#checkoutForm");
// adding the checkout form


form.addEventListener("submit", (e) => e.preventDefault());

Array.from(forms).forEach((form) => {
    (function () {
        document.getElementById("placing").addEventListener("click", (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add("was-validated");
            } else {

                let enough = true; // flag to check stock availability
                let index;
                let x;
                cart.forEach((item) => {
                    index = data.Products.findIndex(
                        (product) => product._id === item.product._id
                    ); // getting index of each product

                    if (data.Products[index].Stock < item.num) {
                        enough = false; // if there is more than in the stock
                        x = item;
                    }
                });
                if (enough) {
                    newOrder(); // if there is enough stock , create a new order
                    Swal.fire({
                        title: "Congratulations!",
                        text: "Your order has been submitted successfully",
                        icon: "success",
                    }).then(() => {
                        location.assign("../html/homeMain.html");
                    });
                } else {
                    const uindex = data.Users.findIndex(
                        (user) => user._id === data.CurrentUser._id
                    );
                    data.Users[uindex].cart = [];
                    saveDataInLocalStorage();
                    Swal.fire({
                        title: "Sorry!",
                        text: `Your order can't be submitted because there is no more of ${x.product.title} in the seller's stock`,
                        icon: "error",
                    });
                }
            }
            form.classList.add("was-validated");
        });
    })();
});

  function newOrder() {
    let orderID = generateRandomId();
    let customerID = getCurrentUser()._id;
    let Items = []; // making an array of products to be put in the order details
    cart.forEach((item) => {
      item.product["Quantity"] = item.num;
      Items.push(item.product);
    });
    let totalAm =  getTotalAmount()

    const formData = new FormData(document.getElementById("checkoutForm"));

    
    let formDataObject = {}; // Create an object to store form data

    formData.forEach(function (value, key) { // Loop through the formData object and add the data to the formDataObject
      formDataObject[key] = value;
    });

    function getTotalAmount() {
        return cart.reduce((total, item) => total + item.product.Price * item.num, 0);
    }

    const newOrder = {
      _id: orderID,
      UserID: customerID,
      Items: Items,
      TotalAmount: totalAm,
      Status: "Pending",
      CreatedAt: new Date(),
      customerDetails: formDataObject,
    };
    data.Orders.push(newOrder); //pushing the order in the list of orders
  
    const uindex = customerIndexInUsersList(getCurrentUser()._id);
    data.Users[uindex].orders.push(orderID); 
    // push to order list
  
    data.Users[uindex].cart = []; // cart clear
  
    let flagx = 0; // identicator to loop over cart items
  
    let sellers = []; // different sellers will be notified with the order id if they sell a product in this order
  
    Items.forEach((item) => {
      // loop to update the stock of each product
  
      const index = productIndexInProductsList(item._id); // getting the index of the product
      const sellerIndex = sellerIndexInUsersList(item.SellerID); // getting the index of the seller in users list from product list
  
      data.Products[index].Stock -= cart[flagx].num; /// update stock from prdlist
      data.Products[index].NumOfSales += cart[flagx].num; /// update sales num

      if (!sellers.includes(item.SellerID)) { // validate if the seller is already there in array and if not, push the order id to the seller
        sellers.push(item.SellerID);
        data.Users[sellerIndex].orders.push(orderID); // push to order list of seller
      }

      flagx++; // to next item

    });

    saveDataInLocalStorage();

}


function productIndexInProductsList(id) {
    return data.Products.findIndex((product) => product._id === id); // for each product in the list of products, it will return the index of the product by comparing the id of the product with the id parameter given to the function
}
  
function sellerIndexInUsersList(id) {
    return data.Users.findIndex((seller) => seller._id === id); // same for seller
}
  
function customerIndexInUsersList() {
    return data.Users.findIndex((user) => user._id === data.CurrentUser._id) // this function gets the index of the customer in the list of users by comparing the id of the customer with the id of the current user
}


window.addEventListener("load", function () {

    let cards = this.document.getElementById("items");

    generateCards();

    function generateCards() {

    let flag = 0;
    cards.innerHTML = "";

    cart = getCurrentCart().map((item) => ({
        product: getProductById(item._id),
        num: item.Quantity,
    }));

      

      if (cart.length == 0) {
        content.innerHTML = 
        `
            <div class="row">
                <div class="col-lg-12 text-center emptyCart">
                    <span class="fs-1 fw-bold">Your Cart Is Empty</span>
                </div>       
            </div>
        `;
      }

      let total = 0;
      let numOfItems = 0;
      cart.forEach((item) => {

        numOfItems += item.num;
        total += item.product.Price * item.num;
        cards.innerHTML += `<div id="${flag}" class="card m-1 luxurious-card ">
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
                                        <span class="badge bg-dark bg-gradient" style="font-size: 0.75rem;">Seller: ${getUserById(item.product.SellerID).Name}</span>
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

        flag++;

      });

      // change checkout form

      try {

        document.getElementById("numOfItems").innerText = `Items: (${numOfItems})`;
        document.getElementById("SubTotal").innerText = total.toFixed(2) + "$";
        document.getElementById("beforeTax").innerText = (25 + total).toFixed(2) + "$";
        document.getElementById("Tax").innerText = (total * 0.14).toFixed(2) + "$";
        document.getElementById("AfterTax").innerText =
        (total + 25 + total * 0.14).toFixed(2)  + "$";
      } 
      
      catch (error) {}

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
            }
    
            if (e.target.innerText == "-") {
                let cardID = +e.target.id;
    
                if (cart[cardID].num - 1 == 0) {
                    return;
                }
    
                changeCartItemCount(cart[cardID].product._id, cart[cardID].num - 1);
                cart[cardID].num -= 1;
                generateCards();
            }
    
            if (e.target.dataset.id) {
                const itemId = e.target.dataset.id;
                DeleteFromCart(itemId);
                cart = cart.filter(item => item.product._id !== itemId);
                generateCards();
            }
    });

    
  });