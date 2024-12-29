import { data, loadDataFromLocalStorage, saveDataInLocalStorage, SetUserById ,getCurrentUser, getUsers}
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

    // Check if the product is in stock
    if (product.Stock <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Out of Stock',
            text: 'This product is currently out of stock.',
        });
        return;
    }
    let isNewProduct = false;
    // Check if the user is logged in
    
   

    let currentUser = (data.CurrentUser && data.CurrentUser._id) ? data.CurrentUser : null;

    if (currentUser) {
        // User is logged in: Add to their cart
        
          
        let userCart = currentUser.cart || []; // If no cart exists, initialize an empty array

        let existingItem = userCart.find(item => item._id === productID);
        if (existingItem) {
            if (existingItem.Quantity >= product.Stock) {
                Swal.fire({
                    icon: 'error',
                    title: 'Not Enough Stock',
                    text: 'There is not enough stock to add more of this product to your cart.',
                });
                return;
            }
            existingItem.Quantity += 1;
        } else {
            // New product added
            userCart.push({ _id: productID, Quantity: 1 , Name: product.Name });
            isNewProduct=true;
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
            if (existingItem.Quantity >= product.Stock) {
                Swal.fire({
                    icon: 'error',
                    title: 'Not Enough Stock',
                    text: 'There is not enough stock to add more of this product to your cart.',
                });
                return;
            }
            existingItem.Quantity += 1;
        } else {
            // New product added
            guestCart.push({ _id: productID, Quantity: 1 , Name: product.Name });
            isNewProduct=true;
        }

        localStorage.setItem('guestCart', JSON.stringify(guestCart));
        updateCartCounter()
        Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `${product.Name} has been added to your cart.`,
        });
        
    }
    if(isNewProduct){
updateCartCounter();
    }
}




export function updateCartCounter(){
    let cartAmount =0;
    
    if(data.CurrentUser && data.CurrentUser.cart){
     cartAmount = data.CurrentUser.cart.length
       
    
    }else {
        // If the user is a guest,
        let guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
       cartAmount = guestCart.length;
    }
    let cartCounterElement = document.querySelector(".cartAmount");
    console.log(cartCounterElement)
    if (cartCounterElement) {
        cartCounterElement.innerText = cartAmount;
    } 
    
    }


function initializePage() {
    loadDataFromLocalStorage();
    saveDataInLocalStorage();
 if (data.CurrentUser !==null){
    let welcomMessage = document.querySelector('.Username');
        let the_name  = data.CurrentUser.Name
        console.log(the_name)
        welcomMessage.innerText=`Welcome ${the_name}`
 }
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

// smooth navbar

    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href').slice(1); 
            const targetElement = document.getElementById(targetId);
    
            if (targetElement) {
                const offset = document.querySelector('.navbar').offsetHeight; //  navbar height
                const position = targetElement.offsetTop - offset; // Position for scroll
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });
    

   
    //console.log("CurrentUser ID:", data.CurrentUser);


    // profile 
    $(".profileIcon").on("click", function () {

        if (!data.CurrentUser) {
            Swal.fire({
                title: "Can not Enter Your Profile",
                text: "You Should Make Login First",
                icon: "warning",
           
            
            }).then(()=>{ location.assign("login.html")})
        }

        // check the role
        switch (data.CurrentUser.Role) {
            case "Admin":
                window.location.href = "../html/adminprofile.html";
                break;
            case "User":
                window.location.href = "../html/users-profile.html";
                break;
            case "Seller":
                window.location.href = "../html/sellerprofile.html";
                break;
            default:
                window.location.href = "homeMain.html";
                break;
        }


    })



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
                    <div class="col-md-4 col-sm-6 mb-4">
                        <div class="card h-100 shadow-sm product-item d-flex flex-column">
                            <a href="productDetails.html" class="view-details" data-product-id="${product._id}">
                                <img src="${product.Images[0]}" data-product-id="${product._id}" class="card-img-top product-image" alt="${product.Name}">
                            </a>
                            <div class="label-top shadow-sm" style="background-color: ${(product.Stock > 0) ? 'green' : 'red'};">${(product.Stock > 0) ? "in stock" : "out stock"}</div>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title text-center">${product.Name}</h5>
                                <div class="clearfix mb-3 d-flex justify-content-between" >
                                    <span class="float-start badge rounded-pill" style="background-color: #B88E2F;">${product.Price.toFixed(2)}€</span>
                                </div>
                                <div class="mt-auto text-center">
                                    <a href="#" class="btn-addToCart btn btn-warning w-100" data-product-id="${product._id}" style="background-color: #B88E2F; color: white;">Add to Cart</a>
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
       //console.log("Add to Cart button clicked for product ID:", productID);

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
        if (data.CurrentUser !=null) {
            const ticket = {
                "_id": "ticket" + Date.now(),
                "Email": data.CurrentUser.Email,
                "Comment": comment,
                "CreatedAt": new Date().toISOString()
            };
            data.Tickets.push(ticket);
            saveDataInLocalStorage();
            console.log("User Ticket:", ticket);
            Swal.fire({
                icon: 'success',
                title: 'Your comment sent',
                text: 'Thanks your comment ',
            });
            $('#textarea').val(' ');
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Your Comment Cannot Be Sent',
                text: 'Please Login First To Send Your Comments',
            }).then(()=>{
            location.assign("../html/Login.html");
            })
            $('#textarea').val(' ');



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


function setupLoginButton() {
    const $loginButton = $('#login');
    if (!$loginButton.length) {
        //console.error("Login button not found in the DOM.");
        return;
    }

    
    loadDataFromLocalStorage();

    const currentUser = getCurrentUser();

    if (currentUser && currentUser._id) {
        //console.log("User is logged in:", currentUser);
        $loginButton
            .text("Logout")
            .off("click")
            .on("click", confirmLogout); 
    } else {
        //console.log("User is not logged in.");
        $loginButton
            .text("Login")
            .off("click")
            .on("click", () => {
                window.location.href = "../html/login.html";  
            });
    }
}

// Confirm logout and reset the `CurrentUser` in localStorage
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
          
            //loadDataFromLocalStorage();  
            data.CurrentUser = null;
            saveDataInLocalStorage();  // Save updated data
            let messsage = document.querySelector(".Username");
            if(messsage){
                messsage.innerText="";
            }
            console.log("Logged out. CurrentUser:", data.CurrentUser)
           
            setupLoginButton();
 
        }
    });
}


setupLoginButton();





}
$(document).ready(function () {
    initializePage();
    console.log("Page initialized.");
    updateCartCounter();
});
