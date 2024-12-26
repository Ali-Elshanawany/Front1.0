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
  _id: item._id,
  name: item.Name,
  product: getProductById(item._id),
  num: item.Quantity,
}));

// check if the cart is empty to redirect
if (cart.length === 0) {
    location.assign("../html/homeMain.html");
}

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
  
    const uindex = customerIndexInUsersList();

    data.Users[uindex].orders.push(orderID); // push to order list
  
    // cart clear of user
    data.Users[uindex].cart = [];
    data.CurrentUser.cart = [];
    user.cart = [];
    saveDataInLocalStorage(); // save the updated user data
    
  
    let flagx = 0; // identicator to loop over cart items
  
    // let sellers = []; // different sellers will be notified with the order id if they sell a product in this order
    let sellers = data.Users.filter(user => user.Role === "Seller").map(seller => seller._id);

    Items.forEach((item) => {
    // loop to update the stock of each product
  
    const index = productIndexInProductsList(item._id); // getting the index of the product
    const sellerIndex = sellerIndexInUsersList(item.SellerID); // getting the index of the seller in users list from product list

    data.Products[index].Stock -= cart[flagx].num; /// update stock from prdlist
    data.Products[index].NumOfSales += cart[flagx].num; /// update sales num


      if (sellers.includes(item.SellerID)) { // validate if the seller is already there in array and if not, push the order id to the seller

        const totalSalesAmount = cart[flagx].num * data.Products[index].Price; // calculate total sales amount for each seller per order
        data.Users[sellerIndex].TotalSales = (data.Users[sellerIndex].TotalSales || 0) + totalSalesAmount;

        // data.Users[sellerIndex].orders.push(orderID); // push to order list of seller
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
        _id: item._id,
        name: item.Name,
        product: getProductById(item._id),
        num: item.Quantity,
    }));



      let outOfStockFlag = false;
      let outOfStockProducts = [];

      let reducedStockFlag = false;
      let reducedStockProducts = [];

      let removedProductsFlag = false;
      let removedProducts = [];

      let total = 0;

      let numOfItems = 0;

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
                       let usercart = getCurrentCart();
                      cart = usercart.map((item) => ({
                          _id: item._id,
                          name: item.Name,
                          product: getProductById(item._id),
                          num: item.Quantity,
                      }));

                      generateCards();
                      if (getCurrentCart().length === 0) {
                          location.assign("../html/homeMain.html");
                      }
                  });
              }

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



    function populateShippingDetails() {
        const user = getCurrentUser();
        document.getElementById('streetAddress').value = user.Street || '';
        document.getElementById('additionalPhoneNumber').value = user.Phone || '';
        document.getElementById('City').value = user.City || '';
    }
    
    populateShippingDetails();



    //////////////////////////////// MAP ///////////////////////////////////



const apiUrl = 'http://ip-api.com/json/';

// fetching data from IP-API and display it on a map
function fetchLocationData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('IP-API Data:', data);
            const { lat, lon, city, regionName } = data;

           
            const map = L.map('map').setView([lat, lon], 13);

            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            
            const marker = L.marker([lat, lon]).addTo(map)
                .bindPopup('قفشتك يا معلم و هجيبك')
                .openPopup();

            // getting values from object from response to input fields
            map.on('click', function() {

                // updateing form fields with data from IP-API
                document.getElementById('City').value = city;
                document.getElementById('Governerate').value = regionName;
                document.getElementById('Zip').value = '33551';

                
            });
        })
        .catch(error => {
            console.error('Erroorrrr !!!');
        });
}

fetchLocationData();
    






    
});