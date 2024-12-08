import { data, loadDataFromLocalStorage, saveDataInLocalStorage, saveInLocalStorage,getCurrentUser } from './Data.js';

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      window.scrollTo({
          top: target.offsetTop - 100, // Adjust for navbar height
          behavior: 'smooth'
      });
  });
});
/*
if (!localStorage.getItem('data')) {
  localStorage.setItem('data', JSON.stringify(data));
  console.log('Initialized data in localStorage.');
}*/


let dataFromStorage = loadDataFromLocalStorage();
if (!dataFromStorage || !dataFromStorage.Products || dataFromStorage.Products.length === 0) {
    console.log("No products available in local storage.");
} else {
    displayProducts(dataFromStorage.Products); // Display products if they exist
}



// Load the data from localStorage
//let dataFromStorage = loadDataFromLocalStorage();

// Variables to track active category and search query
let activeCategory = '';
let searchQuery = '';

// Sticky Navbar

const firstNavbarHeight = $('.navbar-main').outerHeight();

$(window).on('scroll', function () {
  if ($(this).scrollTop() > firstNavbarHeight) {
    $('.sticky-navbar').addClass('show');
  } else {
    $('.sticky-navbar').removeClass('show');
  }
});

// Handle category filter click event
$('.nav-link').on('click', function (e) {
  e.preventDefault(); // Prevent default anchor behavior

  // Remove active class from all links and add it to the clicked one
  $('.nav-link').removeClass('active');
  $(this).addClass('active');

  // Update the active category
  activeCategory = $(this).data('category') || '';

  // Filter products based on the current search query and category
  searchProducts(searchQuery, activeCategory);
});

// Handle search input change event
$('.search').on('input', function () {
  searchQuery = $(this).val(); // Update search query
  searchProducts(searchQuery, activeCategory); // Filter based on updated query
});

// Function to search and filter products by query and category
function searchProducts(query, categoryFilter) {
  let filteredProducts = dataFromStorage.Products; // Ensure 'Products' is available

  // Filter by search query (case-insensitive)
  if (query) {
    filteredProducts = filteredProducts.filter(product =>
      product.Name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Filter by category if a valid categoryFilter is provided
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(product =>
      product.CategoryID === categoryFilter
    );
  }

  // Display the filtered products
  displayProducts(filteredProducts);
}


// Function to display products
function displayProducts(products) {
  const $productSection = $('#products-container');

  if (!$productSection.length) {
    console.error('Element with id "products-container" not found');
    return;
  }

  $productSection.empty(); // Clear the container before appending and searching new products

  if (!products || products.length === 0) {
    $productSection.html("<p class='notAvalible' style='font-weight: bold;font-size: 22px;color:red;'>No products available.</p>");
    return;
  }

  products.forEach(product => {
    const productCard = `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm product-item" >
          <a href="productDetails.html?id=${product._id}"><img src="${product.Images[0]}" class="card-img-top product-image" alt="${product.Name}"></a>
          <div class="label-top shadow-sm">${getCategoryName(product.CategoryID)}</div>
          <div class="card-body">
            <h5 class="card-title">${product.Name}</h5>
            <p class="card-text">${product.Description}</p>
            <div class="clearfix mb-3">
              <span class="float-start badge rounded-pill bg-success">${product.Price.toFixed(2)}€</span>
            </div>
            <div class="text-center my-4">
              <a href="#" class="btn-addToCard btn btn-warning" data-id="${product._id}">Add to Cart</a>
            </div>
          </div>
        </div>
      </div>
    `;
    $productSection.append(productCard);
  });
}

// Function to get the category name from the category ID
function getCategoryName(categoryID) {
  const categories = {
    "cat1": "Chairs",
    "cat2": "Tables",
    "cat3": "Master Bedrooms",
    // Add more categories as needed
  };
  return categories[categoryID] || "Unknown Category";
}

// Profile page
$('.profile').click(function () { 
  window.open("profile.html", "_blank");
});

// Cart page
$('.cartIcon').click(function(){
  window.open("cart.html");
});




    
    // Update cart in `data`
    
    $(document).on('click', '.btn-addToCard', function () {
      const productID = $(this).data('id');
      loadDataFromLocalStorage();
      
      const product = data.Products.find(p => p._id === productID);
      if (product) {
        const quantity = 1; // Default quantity, you can change this based on user input (e.g., from an input field)
    
        // Check stock availability
        if (quantity > product.Stock) {
          Swal.fire({
            icon: 'warning',
            title: 'Insufficient Stock',
            text: `The quantity you ordered (${quantity}) is not available in stock. Available stock: ${product.Stock}.`,
          });
          return; // Exit early if there's not enough stock
        }
    
        // If the user is not logged in, use the guest cart
        const currentUser = getCurrentUser();
    
        if (!currentUser) {
          // Handle guest cart
          let guestCart = data.guestCart || [];
    
          const productInGuestCart = guestCart.find(item => item.ProductID === productID);
          
          if (productInGuestCart) {
            // Update quantity in guest cart
            const totalQuantity = productInGuestCart.Quantity + quantity;
            
            // Check if the updated quantity exceeds the stock
            if (totalQuantity > product.Stock) {
              Swal.fire({
                icon: 'warning',
                title: 'Stock Exceeded',
                text: `The total quantity you want (${totalQuantity}) exceeds available stock (${product.Stock}).`,
              });
              return; // Exit if the total quantity exceeds available stock
            }
    
            productInGuestCart.Quantity = totalQuantity;
          } else {
            // Add new product to guest cart
            guestCart.push({
              ProductID: productID,
              Quantity: quantity,
            });
          }
    
          // Save guest cart to localStorage
          saveInLocalStorage('guestCart', guestCart);
    
          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Product Added!',
            text: `${product.Name} has been added to your guest cart.`,
          });
        } else {
          // Handle logged-in user cart
          const userCartIndex = data.Cart.findIndex(cart => cart.UserID === currentUser._id);
    
          if (userCartIndex !== -1) {
            const userCart = data.Cart[userCartIndex];
            const productInUserCart = userCart.Items.find(item => item.ProductID === productID);
    
            if (productInUserCart) {
              // Update quantity if product already in cart
              const totalQuantity = productInUserCart.Quantity + quantity;
              
              // Check if the updated quantity exceeds the stock
              if (totalQuantity > product.Stock) {
                Swal.fire({
                  icon: 'warning',
                  title: 'Stock Exceeded',
                  text: `The total quantity you want (${totalQuantity}) exceeds available stock (${product.Stock}).`,
                });
                return; // Exit if the total quantity exceeds available stock
              }
    
              productInUserCart.Quantity = totalQuantity;
            } else {
              // Add new product to user cart
              userCart.Items.push({
                ProductID: productID,
                Quantity: quantity,
              });
            }
    
            // Update the cart's updated time
            userCart.UpdatedAt = new Date().toISOString();
          } else {
            // Create a new cart for the user if one does not exist
            const newCart = {
              _id: `cart${storageData.Cart.length + 1}`,
              UserID: currentUser._id,
              Items: [
                {
                  ProductID: productID,
                  Quantity: quantity,
                },
              ],
              UpdatedAt: new Date().toISOString(),
            };
    
            storageData.Cart.push(newCart);
          }
    
          // Save updated cart data to localStorage
          saveDataInLocalStorage();
    
          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Product Added!',
            text: `${product.Name} has been added to your cart.`,
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Product not found in the product list!',
        });
      }
    });
    




