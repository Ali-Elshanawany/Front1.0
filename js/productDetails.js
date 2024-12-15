import { data, loadDataFromLocalStorage } from './Data.js';
import { addToCart } from './home.js';  // Importing the addToCart function

$(document).ready(function () {
    // Get productID from URL (handles potential '#' at the end of the URL)
    let productId = location.href.split("=")[1];
    if (productId.slice(-1) === "#") {
        productId = productId.slice(0, productId.length - 1);
    }
    
    loadDataFromLocalStorage();  // Ensure data is loaded from local storage

    // Function to retrieve URL parameter (productID)
    function getQueryParam(param) {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Dynamically create "Add to Cart" button and append it
    let aref = document.createElement('a');
    aref.href = '#';
    aref.classList.add('btn-addToCart', 'btn', 'btn-warning');
    aref.setAttribute('data-product-id', productId);
    aref.textContent = 'Add to Cart';

    // Append the button to the appropriate div in your HTML
    let div = document.getElementById('arefDiv');
    div.appendChild(aref);

    // Get the productID from URL
    let productID = getQueryParam('productID');
    console.log("Product ID from URL:", productID);

    // Find the product matching the productID from the data
    let products = data.Products;
    let product = products.find(p => p._id === productID);

    if (product) {
        // Populate product details dynamically in HTML
        $('#product-name').text(product.Name);
        $('#product-description').text(product.Description);
        $('#product-price').text(`${product.Price}€`);
        $('#product-stock').text(product.Stock > 0 ? 'In Stock' : 'Out of Stock');
        $('#product-image').attr('src', product.Images[0]);

        // Populate carousel images dynamically
        const carouselInner = $('.carousel-inner');
        carouselInner.empty(); // Clear existing images
        product.Images.forEach((image, index) => {
            const isActive = index === 0 ? 'active' : ''; // Set the first image as active
            const carouselItem = `
                <div class="carousel-item ${isActive}">
                    <img src="${image}" class="d-block w-100" alt="${product.Name} Image ${index + 1}">
                </div>
            `;
            carouselInner.append(carouselItem);
        });
    } else {
        // Handle product not found
        $('#product-details').html('<p>Product not found.</p>');
    }

 
    $(document).on('click', '.btn-addToCart', function () {
       
        addToCart(productID);
    });

});

// Handle "Go to Home" button click
$('.goToHome').on('click', function () {
    window.location.href = "homeMain.html";  // Navigate to homepage
});
