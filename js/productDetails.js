import {data,loadDataFromLocalStorage,saveDataInLocalStorage,saveInLocalStorage}from './Data.js'


$(document).ready(function() {
    // Load data from local storage
    const data = loadDataFromLocalStorage();  
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Get the product ID from the URL
  
    if (!productId) {
      $('#product-details').html('<p>Product not found!</p>');
      return;
    }
  
    // Check if products data is available in local storage
    const products = data.Products || []; 
  
    // Find the product by ID
    const product = products.find(p => p._id === productId);
  
    if (!product) {
      $('#product-details').html('<p>Product not found!</p>');
      return;
    }
  
    // Set product details
    $('#product-details h1').text(product.Name);
    $('#product-details .description').text(product.Description);
    $('#product-details .price').text(`$${product.Price}`);
  
    // Set carousel images
    const $carouselInner = $('.carousel-inner');
    $carouselInner.empty(); // Clear any existing images
  
    product.Images.forEach((image, index) => {
      const carouselItem = $('<div class="carousel-item">');
      if (index === 0) carouselItem.addClass('active');
      carouselItem.html(`<img src="${image}" class="d-block w-100" alt="Slide ${index + 1}">`);
      $carouselInner.append(carouselItem);
    });
  });
  

  document.querySelector('.goToHome').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = '../html/home.html'; // Ensure the correct path
  });
  

