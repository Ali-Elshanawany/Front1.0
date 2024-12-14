
import { data, loadDataFromLocalStorage, saveDataInLocalStorage } from './Data.js';

loadDataFromLocalStorage()
$(document).ready(function () {
   
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get product ID from URL
    const productID = getQueryParam('productID');
    console.log("Product ID from URL:", productID);

    // Simulate fetching product data 
    const products = data.Products
    

    // Find the product with the matching ID
    const product = products.find(p => p._id === productID);

    // Check if the product exists
    if (product) {
        
        // Dynamically populate product details
        $('#product-name').text( product.Name);
        $('#product-description').text(product.Description);
        $('#product-price').text(`${product.Price}€`);
        $('#product-stock').text(product.Stock > 0 ? 'In Stock' : 'Out of Stock');
        $('#product-image').attr('src', product.Images[0]);

  // Populate carousel images dynamically
  const carouselInner = $('.carousel-inner');
   carouselInner.empty();
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
});









$('.goToHome').on('click', function () {
    window.location.href = "homeMain.html";  // Navigate to homepage
});

