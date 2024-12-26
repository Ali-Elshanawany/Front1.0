import { data, loadDataFromLocalStorage, saveDataInLocalStorage, SetUserById ,getCurrentUser,getUsers}
    from '../Data.js';

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
    


    // profile 
    $(".profileIcon").on("click", function () {
        if (!data.CurrentUser) {
            Swal.fire({
                title: "Can not Enter Your Profile",
                text: "You Should Make Login First",
                icon: "warning",
           
            
            }).then(()=>{ location.assign("login.html")})
        }else{
            window.location.href = "../html/sellerprofile.html";

        }

        


    })


$('.dashboard').on("click", function (e) {
    e.preventDefault()
   window.location.href = "../html/SellerProductDashboard.html";
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
                
                    <div class=" ">
                        <div class="card h-100 shadow-sm product-item">
                            <a href="productDetails.html" class="view-details" data-product-id="${product._id}">
                                <img src="${product.Images[0]}" data-product-id="${product._id}" class="card-img-top product-image" alt="${product.Name}">
                            </a>
                            <div class="label-top shadow-sm">${(product.Stock > 0) ? "in stock" : "out stock"}</div>
                            <div class="card-body">
                                <h5 class="card-title">${product.Name}</h5>
                                
                                <div class="clearfix mb-3 d-flex justify-content-between">
                                    <span class="float-start badge rounded-pill bg-success">${product.Price.toFixed(2)}€</span>
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


   

    // product details link
    $(document).on('click', '.view-details', function (e) {
        e.preventDefault();
        let productID = $(this).data('product-id');
        console.log("Clicked product ID:", productID);
        window.location.href = `sellerProductDetails.html?productID=${productID}`;
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


    //LogOut
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", confirmLogout);
    }

    function confirmLogout() {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                data.CurrentUser = null;
                saveDataInLocalStorage("currentUser", null);
                redirectToHome();
            }
        });
    }

    function redirectToHome() {
        window.location.href = "login.html";
    }
    //End Logout





//logout 
function setupLoginButton() {
    const $loginButton = $('#login');
    if (!$loginButton.length) {
        //console.error("Login button not found in the DOM.");
        return;
    }

    
<<<<<<< HEAD
    loadDataFromLocalStorage();

    const currentUser = getCurrentUser();

    if (currentUser && currentUser._id) {
       
        $loginButton
            .text("Logout")
            .off("click")
            .on("click", confirmLogout); 
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

            //loadDataFromLocalStorage();  
            data.CurrentUser = null;
            saveDataInLocalStorage();  

            console.log("Logged out. CurrentUser:", data.CurrentUser)
           
            setupLoginButton();
location.assign("login.html");
        }
    });
}


setupLoginButton();


=======
    
>>>>>>> master

}
$(document).ready(function () {
    initializePage();
    console.log("Page initialized.");
});
