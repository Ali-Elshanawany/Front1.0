import { data,loadDataFromLocalStorage } from "../Data.js";


$(document).ready(function () {

    let productId = location.href.split("=")[1];
    if (productId.slice(-1) === "#") {
        productId = productId.slice(0, productId.length - 1);
    }

    loadDataFromLocalStorage();


    function getQueryParam(param) {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }


    let aref = document.createElement('a');
    aref.href = '#';
   
    aref.setAttribute('data-product-id', productId);
   

    let div = document.getElementById('arefDiv');
    div.appendChild(aref);


    let productID = getQueryParam('productID');
    console.log("Product ID from URL:", productID);


    let products = data.Products;
    let product = products.find(p => p._id === productID);

    if (product) {

        $('#product-name').text(product.Name);
        $('#product-description').text(product.Description);
        $('#product-price').text(`${product.Price}€`);
        $('#product-stock').text(product.Stock > 0 ? 'In Stock' : 'Out of Stock');
        $('#product-image').attr('src', product.Images[0]);


        const carouselInner = $('.carousel-inner');
        carouselInner.empty();
        product.Images.forEach((image, index) => {
            const isActive = index === 0 ? 'active' : '';
            const carouselItem = `
                <div class="carousel-item ${isActive}">
                    <img src="${image}" class="d-block w-100" alt="${product.Name} Image ${index + 1}">
                </div>
            `;
            carouselInner.append(carouselItem);
        });
    } else {

        $('#product-details').html('<p>Product not found.</p>');
    }

  
    

});



$('.goToHome').on('click', function () {
    window.location.href = "/html/AdminHome.html";
});

$('.homeNav').on("click",function(){ window.location.href = "/html/AdminHome.html";})
$('.productNav').on("click",function(){window.location.href="/html/AdminHome.html#product"})
$('.contactNav').on("click",function(){window.location.href="/html/AdminHome.html#contact"})
$('.aboutNav').on("click",function(){window.location.href="/html/AdminHome.html#about"})