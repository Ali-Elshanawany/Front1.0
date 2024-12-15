import { data, loadDataFromLocalStorage, saveDataInLocalStorage, SetUserById } from './Data.js';

loadDataFromLocalStorage();

export async function addToCart(productID) {
    let product = data.Products.find((p) => p._id === productID); // Ensure productID is correctly matched
    if (!product) {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Product not found.',
        });
        return;
    }

    console.log("Product found:", product);

    // Check if there is a logged-in user (currentUser is not null)
    const currentUser = (data.CurrentUser && data.CurrentUser._id) ? data.CurrentUser : null;

    if (currentUser) {
        // User is logged in: Add to their cart
        let userCart = currentUser.cart || []; // If no cart exists, initialize an empty array

        // Find if product already exists in user's cart
        let existingItem = userCart.find(item => item._id === productID);
        if (existingItem) {
            existingItem.Quantity += 1; // Increment quantity if product already exists
        } else {
            userCart.push({ _id: productID, Quantity: 1 }); // Add product with initial quantity of 1 if not found
        }

        // Update user's cart in the data object
        currentUser.cart = userCart;

        // Save updated user data and cart
        SetUserById(currentUser);
        saveDataInLocalStorage(currentUser);

        console.log("Updated user cart:", currentUser.cart);
    } else {
        // User is NOT logged in: Add to guest cart
        let guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];

        if (guestCart.length === 0) {
            guestCart = [{ UserID: 'guest', Items: [], UpdatedAt: new Date().toISOString() }];
        }

        // Find if product already exists in guest cart
        let existingItem = guestCart[0].Items.find(item => item.ProductID === productID);
        if (existingItem) {
            existingItem.Quantity += 1; // Increment quantity if product already exists
        } else {
            guestCart[0].Items.push({ ProductID: productID, Quantity: 1 }); // Add product with initial quantity of 1 if not found
        }

        guestCart[0].UpdatedAt = new Date().toISOString();
        localStorage.setItem('guestCart', JSON.stringify(guestCart));
    }

    // Show success message after adding product to cart
    Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${product.Name} has been added to your cart.`,
    });
}

// Sticky Navbar
let firstNavbarHeight = $('.navbar-main').outerHeight();
$(window).on('scroll', function () {
    let scrollPosition = $(this).scrollTop();
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
        let targetId = this.getAttribute('href').slice(1);
        let targetElement = document.getElementById(targetId);
        if (targetElement) {
            let offset = document.querySelector('.navbar-main').offsetHeight; // Adjust for navbar height
            let position = targetElement.offsetTop - offset;
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
    $productSection.empty(); // Clear the container before appending new products

    if (!products || products.length === 0) {
        $productSection.html("<p class='notAvalible' style='font-weight: bold; font-size: 22px; color: red;'>No products available.</p>");
        return;
    }

    products.forEach(product => {
        if (product.Approved) {
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
        } else {
            //console.log(`Product "${product.Name}" is not approved and will not be displayed.`);
        }
    });
}

// Event listener for "Add to Cart" button (with a single event listener)
$(document).on('click', '.btn-addToCart', function () {
    let productID = $(this).data('product-id'); // Get product ID
    addToCart(productID); // Call the reusable addToCart function
});

// Function to handle category filtering
$('.nav-link').on('click', function (e) {
    e.preventDefault();
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    let categoryID = $(this).data('category') || '';
    filterByCategory(categoryID);

    $('#searchInput').val('');
});

// Search functionality
$('#searchInput').on('keyup', function () {
    let searchText = $(this).val().toLowerCase();
    filterBySearch(searchText);
    $('.nav-link').removeClass('active');
    activeCategory = '';
});

// Initially display all products (optional)
displayProducts(data.Products);

// Function to filter products by category (based on CategoryID)
function filterByCategory(categoryID) {
    let filteredProducts = data.Products.filter(product => {
        return categoryID === '' || product.CategoryID === categoryID;
    });

    displayProducts(filteredProducts);
}

// Function to filter products by search query (ignoring category)
function filterBySearch(searchQuery) {
    let filteredProducts = data.Products.filter(product => {
        let title = product.Name.toLowerCase();
        return title.includes(searchQuery.toLowerCase());
    });

    displayProducts(filteredProducts);
}

// Event listener for product details page
$(document).on('click', '.view-details', function (e) {
    e.preventDefault();
    let productID = $(this).data('product-id');
    window.location.href = `productDetails.html?productID=${productID}`;
});

// Ticket submission functionality
$('#AddTicketButton').on("click", function (e) {
    let comment = $('#textarea').val();

    if (data.CurrentUser) {
        const ticket = {
            "_id": "ticket" + Date.now(),
            "Email": data.CurrentUser.Email,
            "Comment": comment,
            "CreatedAt": new Date().toISOString()
        }
        data.Tickets.push(ticket);
        saveDataInLocalStorage();
    }
});


/*
let bestSellers = data.Products;
bestSellers = bestSellers.sort((a, b) => b.NumOfSales - a.NumOfSales).slice(0, 5);


let bestSellersSection = $('.best-sellers-section');


let best = `
  <input type="radio" name="position" checked />
  <input type="radio" name="position" />
  <input type="radio" name="position" />
  <input type="radio" name="position" />
  <input type="radio" name="position" />
  <main id="carousel">
    <div class="carousel-inner">
`;

// Loop through the best-seller products
bestSellers.forEach((product, productIndex) => {
    product.Images.forEach((image, index) => {
        const isActive = index === 0 && productIndex === 0 ? 'active' : ''; // Set the first image of the first product as active
        best += `
        <div class="carousel-item ${isActive}">
            <img src="${image}" alt="${product.Name} Image ${index + 1}">
        </div>
        `;
    });
});


best += `</div></main>`;


bestSellersSection.append(best);

*/

bestSellers.forEach((product, productIndex) => {
    let productHTML = `<div class="carousel-product">`; // Separate product wrapper
    product.Images.forEach((image, index) => {
        const isActive = index === 0 ? 'active' : ''; // Only one active image per product
        productHTML += `
        <div class="carousel-item ${isActive}">
            <img src="${image}" alt="${product.Name} Image ${index + 1}">
        </div>
        `;
    });
    productHTML += `</div>`;
    best += productHTML;
});
