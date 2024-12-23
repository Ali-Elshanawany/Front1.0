import { data, getCurrentUser, loadDataFromLocalStorage, saveDataInLocalStorage,SetUserById}
from './Data.js';


// Add to Cart Function 
 export function addToCart(productID) {
    let product = data.Products.find((p) => p._id === productID); 

    if (!product) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Product not found.',
        });
        return;
    }

    // Check if the user is logged in
    let currentUser = (data.CurrentUser && data.CurrentUser._id && data.CurrentUser._id !== '') ? data.CurrentUser : null;

    if (currentUser) {
        // User is logged in: Add to their cart
    
        let userCart = currentUser.cart || []; // If no cart exists, initialize an empty array

        let existingItem = userCart.find(item => item._id === productID);
        if (existingItem) {
            existingItem.Quantity += 1;
        } else {
            userCart.push({ _id: productID, Quantity: 1 });
        }

        currentUser.cart = userCart;

       
        SetUserById(currentUser); 
        saveDataInLocalStorage(); 

        Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `${product.Name} has been added to your cart.`,
        });

    } else {
        // User is NOT logged in: Add to guest cart
       
        let guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];

        let existingItem = guestCart.find(item => item._id === productID);
        if (existingItem) {
            existingItem.Quantity += 1;
        } else {
            guestCart.push({ _id: productID, Quantity: 1 });
        }

        localStorage.setItem('guestCart', JSON.stringify(guestCart));

        Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `${product.Name} has been added to your cart.`,
        });
    }
}




function initializePage() {
    loadDataFromLocalStorage();
    saveDataInLocalStorage();

    // Sticky Navbar
    const firstNavbarHeight = $('.navbar-main').outerHeight();
    $(window).on('scroll', function () {
        const scrollPosition = $(this).scrollTop();
        if (scrollPosition > firstNavbarHeight) {
            $('.sticky-navbar').addClass('show');
        } else {
            $('.sticky-navbar').removeClass('show');
        }
    });




    // Smooth scrolling for sections
    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offset = document.querySelector('.navbar-main').offsetHeight; // Adjust for navbar height
                const position = targetElement.offsetTop - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Function to display products
    function displayProducts(products) {
        let $productSection = $('#products-container');
        $productSection.empty(); 

        if (!products || products.length === 0) {
            $productSection.html("<p class='notAvalible' style='font-weight: bold; font-size: 22px; color: red;'>No products available.</p>");
            return;
        }

        products.forEach(product => {
            if (product.Approved) {
                let productCard = `
                
                    <div class=" ">
                        <div class="card h-100 shadow-sm product-item">
                            <a href="productDetails.html" class="view-details" data-product-id="${product._id}">
                                <img src="${product.Images[0]}" data-product-id="${product._id}" class="card-img-top product-image" alt="${product.Name}">
                            </a>
                            <div class="label-top shadow-sm">${(product.Stock > 0) ? "in stock" : "out stock"}</div>
                            <div class="card-body">
                                <h5 class="card-title">${product.Name}</h5>
                                <p class="card-text">${product.Description}</p>
                                <div class="clearfix mb-3 d-flex justify-content-between">
                                    <span class="float-start badge rounded-pill bg-success">${product.Price.toFixed(2)}€</span>
                                </div>
                                <div class="text-center my-4">
                                    <a href="#" class="btn-addToCart btn btn-warning" data-product-id="${product._id}">Add to Cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                `;
                
                $productSection.append(productCard);
            } else {
                //console.log(`Product "${product.Name}" is not approved and will not be displayed.`);
            }
        });
    }

    // Function to filter products by category 
    function filterByCategory(categoryID) {
        let filteredProducts = data.Products.filter(product => {
            return categoryID === '' || product.CategoryID === categoryID;
        });

        displayProducts(filteredProducts);
    }

  //  Function to filter products by search query 
    function filterBySearch(searchQuery) {
        let filteredProducts = data.Products.filter(product => {
            let title = product.Name.toLowerCase();
            return title.includes(searchQuery.toLowerCase());
        });

        displayProducts(filteredProducts);
    }


    // category filter 
    $('.nav-link').on('click', function (e) {
        e.preventDefault();
        
        $('.nav-link').removeClass('active');
        $(this).addClass('active');

        // Get the selected category ID 
        let categoryID = $(this).data('category') || '';

        filterByCategory(categoryID);

       
        $('#searchInput').val('');
    });

   
    $('#searchInput').on('keyup', function () {
        let searchText = $(this).val().toLowerCase();
        filterBySearch(searchText);
        $('.nav-link').removeClass('active');
    });

  
    displayProducts(data.Products);

   
    $(document).on('click', '.btn-addToCart', function (event) {
        event.preventDefault();
        let productID = $(this).data('product-id'); // Get product ID
        console.log("Add to Cart button clicked for product ID:", productID);

        addToCart(productID);
    });

    // product details link
    $(document).on('click', '.view-details', function (e) {
        e.preventDefault();
        let productID = $(this).data('product-id');
        console.log("Clicked product ID:", productID);
        window.location.href = `productDetails.html?productID=${productID}`;
    });

    //  comment 
    $('#AddTicketButton').on("click", function (e) {
        let comment = $('#textarea').val();
        
        console.log("User comment:", comment);
        if (data.CurrentUser) {
            const ticket = {
                "_id": "ticket" + Date.now(),
                "Email": data.CurrentUser.Email,
                "Comment": comment,
                "CreatedAt": new Date().toISOString()
            };
            data.Tickets.push(ticket);
            saveDataInLocalStorage();
            console.log("User Ticket:", ticket);
        }
    });

    // Create the best-sellers carousel
    let bestSellers = data.Products;
    bestSellers = bestSellers.sort((a, b) => b.NumOfSales - a.NumOfSales).slice(0, 5);

    let bestSellersSection = $('.best-sellers-section');
    let best = `
        <input type="radio" name="position"  />
        <input type="radio" name="position" />
        <input type="radio" name="position" checked />
        <input type="radio" name="position" />
        <input type="radio" name="position" />
        <main id="carousel">
    `;

    bestSellers.forEach((product) => {
        product.Images.forEach((image) => {
            best += `
                <div class="item"><img src="${image}" alt="${product.Name}"></div>
            `;
        });
    });

    best += `</main>`;

    
    bestSellersSection.append(best);


    // login/logout
    let isLogin = !!(data && data.CurrentUser && data.CurrentUser._id);

    function setupLoginButton() {
        const $loginButton = $('#login');
        if (!$loginButton.length) {
            console.error("Login button not found in the DOM.");
            return;
        }
    
        if (isLogin) {
            $loginButton
                .text("Logout")
                .off("click")
                .on("click", confirmLogout);
        } else {
            $loginButton
                .text("Login")
                .off("click")
                .on("click", () => {
                    //alert("Redirecting to login page...");
                    window.location.href = "../html/login.html";
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
        }).then(result => {
            if (result.isConfirmed) {
               
                data.CurrentUser = null;
                saveDataInLocalStorage();
    
                //console.log("User logged out. Current User:", data.CurrentUser);
    
              
                isLogin = false;
    
              
                setupLoginButton();
    
              
                window.location.href = "../html/homeMain.html";
            }
        });
    }
    
  
    
    setupLoginButton() 
    
}
    $(document).ready(function () {
        initializePage();
        console.log("Page initialized.");
        
    });
    




























































































