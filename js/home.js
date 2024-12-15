import { data, loadDataFromLocalStorage, saveDataInLocalStorage,SetUserById }
from './Data.js'

function initializePage() {
 //   Load data from localStorage (if necessary)
 loadDataFromLocalStorage();

    //Sticky Navbar
    const firstNavbarHeight = $('.navbar-main').outerHeight();
    $(window).on('scroll', function () {
        const scrollPosition = $(this).scrollTop();
        if (scrollPosition > firstNavbarHeight) {
            $('.sticky-navbar').addClass('show');
        } else {
            $('.sticky-navbar').removeClass('show');
        }
    });

 //   Smooth scrolling for sections
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

   // Open profile and cart in new tabs
    $('.profileIcon').on("click", function () {
        window.open("profile.html", "_blank");
    });

 //   Function to display products
    function displayProducts(products) {
        let $productSection = $('#products-container');
        $productSection.empty(); // Clear the container before appending new products

        if (!products || products.length === 0) {
            $productSection.html("<p class='notAvalible' style='font-weight: bold; font-size: 22px; color: red;'>No products available.</p>");
            return;
        }

        products.forEach(product => {
            if(product.Approved){
            let productCard = `
                <div class="col-md-4">
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
            }else{
                console.log(`Product "${product.Name}" is not approved and will not be displayed.`);
            }
        });
    }


   // Function to filter products by category (based on CategoryID)
    function filterByCategory(categoryID) {
        let filteredProducts = data.Products.filter(product => {
            return categoryID === '' || product.CategoryID === categoryID;
        });

        displayProducts(filteredProducts);
    }

  //  Function to filter products by search query (ignoring category)
    function filterBySearch(searchQuery) {
        let filteredProducts = data.Products.filter(product => {
            let title = product.Name.toLowerCase();
            return title.includes(searchQuery.toLowerCase());
        });

        displayProducts(filteredProducts);
    }

  //  Handle category filter click event
    $('.nav-link').on('click', function (e) {
        e.preventDefault();
  //      Remove active class from all links and add it to the clicked one
        $('.nav-link').removeClass('active');
        $(this).addClass('active');

   //     Get the selected category ID (assuming it's stored in data-category)
        let categoryID = $(this).data('category') || '';

     //   Apply the category filter
        filterByCategory(categoryID);

     //   Clear the search input when changing categories
        $('#searchInput').val('');
    });

  //  Keyup event for search input
    $('#searchInput').on('keyup', function () {
        let searchText = $(this).val().toLowerCase();

  //      Apply the search filter (ignoring category)
        filterBySearch(searchText);

    //    Remove active class from categories when typing in the search input
        $('.nav-link').removeClass('active');
        activeCategory = ''; // Clear the active category filter when typing in the search input
    });

 //   Initially display all products (optional)
    displayProducts(data.Products); // Assuming data.Products contains the full list of products

 //   Add product to cart
    $(document).on('click', '.btn-addToCart', function () {
        let productID = $(this).data('product-id'); // Get product ID
        console.log("Add to Cart button clicked for product ID:", productID);

        let product = data.Products.find((p) => p._id === productID); // Find the product in the data
        if (!product) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Product not found.',
            });
            return;
        }

        console.log("Product found:", product);

     //   Check if there is a logged-in user (currentUser is not null)
        const currentUser = (data.CurrentUser && data.CurrentUser._id && data.CurrentUser._id !== '') ? data.CurrentUser : null;
        console.log("Current User:", currentUser ? "Logged In" : "Guest");

        if (currentUser) {
     //       User is logged in: Add to their cart
            console.log("User is logged in. Adding to user's cart...");
            let userCart = currentUser.cart || []; // If no cart exists, initialize an empty array

      //      Find if product already exists in user's cart
            let existingItem = userCart.find(item => item._id === productID);
            if (existingItem) {
                existingItem.Quantity += 1;
            } else {
                userCart.push({ _id: productID, Quantity: 1 });
            }

     //       Update user's cart in the data object
            currentUser.cart = userCart;
           
            console.log(currentUser._id)
            SetUserById(currentUser); // Save updated user data
            saveDataInLocalStorage(); // Save updated data

            console.log("Updated user cart:", currentUser.cart);
        } else {
      //      User is NOT logged in: Add to guest cart
    
            let guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];

            if (guestCart.length === 0) {
                guestCart = [{
                    UserID: 'guest',
                    Items: [],
                    UpdatedAt: new Date().toISOString()
                }];
            }

            let existingItem = guestCart[0].Items.find(item => item._id === productID);
            if (existingItem) {
                existingItem.Quantity += 1;
            } else {
                guestCart[0].Items.push({ _id: productID, Quantity: 1 });
            }

            guestCart[0].UpdatedAt = new Date().toISOString();
            localStorage.setItem('guestCart', JSON.stringify(guestCart));
        }

        Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `${product.Name} has been added to your cart.`,
        });
    });

 //   Add click event to product image or product details link
    $(document).on('click', '.view-details', function (e) {
        e.preventDefault();
        let productID = $(this).data('product-id');
        console.log("Clicked product ID:", productID);
        window.location.href = `productDetails.html?productID=${productID}`;
    });

 //   Handle comment form submission
    $('#AddTicketButton').on("click", function (e) {
       // e.preventDefault();
        let comment = $('#textarea').val();
       
        console.log("User comment:", comment);
        if(data.CurrentUser){
            const ticket={
                "_id": "ticket"+Date.now(),
                "Email": data.CurrentUser.Email,
                "Comment": comment,
                "CreatedAt": new Date().toISOString() 
            }
            data.Tickets.push(ticket)
            saveDataInLocalStorage()
            console.log("User Ticket:", ticket);
}
    
    

    });
   // Assuming data is already available and contains Products
let bestSellers = data.Products;

// Sort and get the top 5 best-sellers
bestSellers = bestSellers.sort((a, b) => b.NumOfSales - a.NumOfSales).slice(0, 5);

// Select the best-sellers section
let bestSellersSection = $('.best-sellers-section');

// Create the structure dynamically
let best = `
    <input type="radio" name="position" checked />
    <input type="radio" name="position" />
    <input type="radio" name="position" />
    <input type="radio" name="position" />
    <input type="radio" name="position" />
    <main id="carousel">
`;

// Loop through best-seller products and add each image to the carousel
bestSellers.forEach((product) => {
    product.Images.forEach((image) => {
        best -= `
            <div class="item"><img src="${image}" alt="${product.Name}"></div>
        `;
    });
});


 
  
;

// Append the dynamic structure to the best-sellers section
bestSellersSection.append(best);





















}
//Run the initializePage function when the document is ready
$(document).ready(function(){
   
  //saveDataInLocalStorage()
   initializePage()
   console.log($('#AddTicketButton'))


})

