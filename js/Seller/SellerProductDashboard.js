import {
    getOrders,
    loadDataFromLocalStorage,
    saveDataInLocalStorage,
    data,
    isAuthorized,
    PendingProducts,
    ApproveProducts,
    SellerProducts,
    DeleteSepecificproduct,
    increaseStock,
    decreaseTotalSales
} from "../Data.js";

import { AddProducts } from "../Seller/AddProducts.js";

// ! Tesing Only Remove For Production
//saveDataInLocalStorage();
// ! Note ----------------- Remove All Console.log() in Production

// * Event Listeners Load
window.addEventListener("load", function () {
       isAuthorized();
    ChangCard();
    let Products = SellerProducts();
    let isUpdate = true;
    let UpdatedProduct = null;
    console.log("Hola");
    console.log(Products);
    let rowsPerPage = 10; // * Default rows per page
    let currentPage = 1;

    const Producttable = document.getElementsByTagName("table")[0];

    const ProductcounterInput = document.getElementById("ProductCounterInput");
    const ProductsearchInput = document.getElementById("ProductsearchInput");

    ProductcounterInput.addEventListener("change", function () {
        rowsPerPage = parseInt(this.value, 10) || 5;
        currentPage = 1; // * Reset to the first page
        displayProductsTable(Products, currentPage, rowsPerPage);
    });

    ProductsearchInput.addEventListener("keyup", function () {
        const searchTerm = this.value.trim().toLowerCase();
        const filteredProducts = Products.filter(
            (product) =>
                product.Name.toLowerCase().includes(searchTerm) ||
                product.Price.toLocaleString().toLowerCase().includes(searchTerm)
        );
        currentPage = 1; // * Reset to the first page
        displayProductsTable(filteredProducts, currentPage, rowsPerPage);
    });

    displayProductsTable(Products, currentPage, rowsPerPage);

    Producttable.addEventListener("click", function (event) {
        console.log(event.target.id);
        if (event.target.id == "Del") {
            // * Start Sweet Alert
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                    DeleteProducts(event.target.dataset.productid)
                    Products = SellerProducts();
                    ChangCard()
                    displayProductsTable(Products, currentPage, rowsPerPage);

                }
            });
         
            // * End Sweet Alert
        }
        if (event.target.id == "Update") {
                // * When Clicked is update trun True Then AddAccounts Function Will Know that is update not addning new Accounts 
                console.log("Hereeeeeeeeeeeeeeeeeeeee");
                console.log(event.target.dataset.productid);

            isUpdate=true;
            
            const SelectedProduct = data.Products.find(p=>p._id==event.target.dataset.productid)
            console.log(SelectedProduct);
            UpdatedProduct=SelectedProduct
            console.log(SelectedProduct)
            $("#in-head").text(" Update Product");
            $("#in-Name").val(SelectedProduct.Name);
            $("#in-Desc").val(SelectedProduct.Description);
            $("#in-Price").val(SelectedProduct.Price);
            $("#in-Stock").val(SelectedProduct.Stock);
            $("#in-Cat").val(SelectedProduct.CategoryID);
            $("#previmg1")
            .attr("src", SelectedProduct.Images[0])
            .css({
                "display": "inline-block",
                "width": "200px",
                "height": "200px"
            });
            $("#previmg2")
            .attr("src", SelectedProduct.Images[1])
            .css({
                "display": "inline-block",
                "width": "200px",
                "height": "200px"
            });
        }
    });

    // * on click Add Products Button the form will reset and the header will change to the default
    $("#add-Product").on("click", function () {
        $("#previmg1").css("display", "none");
        $("#previmg2").css("display", "none");
           $("#in-head").text("Add New Product");
            $("#ProductsForm")[0].reset();
        isUpdate = false;
        UpdatedProduct=null
        
    });
    $("#Confirm").on("click", function (e) {
        AddProducts(isUpdate,UpdatedProduct);
        Products = SellerProducts();
        ChangCard();
        displayProductsTable(Products, currentPage, rowsPerPage);
        // loadDataFromLocalStorage();
        // Users=getUsers();
        // displayTable(Users,currentPage,rowsPerPage);
    });



}); // * end of load

//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// * Function to Display the Pending products Table
function displayProductsTable(Products, currentPage = 1, rowsPerPage = 10) {
    const tbody = document.getElementById("ProductBody");
    const thead = document.getElementById("ProductHead");
    tbody.innerHTML = ""; // Clear previous rows
    thead.innerHTML = ""; // Clear previous rows

    const tr = document.createElement("tr");
    tr.innerHTML = `
    <tr >
    <th  id="Name" > Name</th>
    <th  id="Description" > Description</th>
    <th  id="Price" > Price</th>
    <th  id="Stock" > Stock</th>
    <th  id="CategoryID" > Category</th>
    <th  id="SellerName" > SellerName</th>
    <th  id="Images" > Images</th>
    <th  id="CreatedAt" > CreatedAt</th>
    <th  id="Status" > Status</th>
    <th  id="Delete" > Delete</th>
    <th  id="Update" > Update</th>
    </tr>   
`;
    thead.appendChild(tr);
    // * Add Asc Sorting Event
    tr.addEventListener("click", function (event) {
        const prop = event.target.id;
        console.log("Asc Sorting");
        if (prop) {
            Products.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
            displayProductsTable(Products, currentPage, rowsPerPage);
        }
    });
    // * Add Desc Sorting Event
    tr.addEventListener("dblclick", function (event) {
        const prop = event.target.id;
        console.log("Desc Sorting");
        if (prop) {
            Products.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
            displayProductsTable(Products, currentPage, rowsPerPage);
        }
    });
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedUsers = Products.slice(start, end);
    paginatedUsers.forEach((product, index) => {
        let SellerName = data.Users.find(
            (user) => user._id == product.SellerID
        )?.Name||"john doe";
        //console.log(SellerName)
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td >${product.Name}</td>
            <td >${product.Description}</td>
            <td >${product.Price}</td>
            <td >${product.Stock}</td>
            <td >${product.CategoryID}</td>
            <td >${SellerName}</td>
            <td><img src="${product.Images[0]
            }" style="width: 150px !important; height: 150px !important;" /></td>
            <td >${product.CreatedAt}</td>
            <td class="Status-btn" >
            <button id="Approve" type="button" 
            data-index="${start + index}" 
            data-Productid="${product._id}" 
            class="${product.Approved ? "btn btn-success" : "btn btn-danger"}">
            ${product.Approved ? "Approved" : "Not Approved Yet"}
            </button>
            </td>
            <td class="delete-btn" >
            <button id="Del" type="button" 
            data-index="${start + index}" 
            data-Productid="${product._id}" 
            class="btn btn-danger">
            <i id="Del" data-index="${start + index}"
            data-Productid="${product._id}" 
             class="bi bi-trash-fill"> </i>
            </button>
            </td>
             <td class="Update-btn" >
            <button id="Update" type="button" 
             data-index="${start + index}"
             data-Productid="${product._id}"
              class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#addProductModal">
            <i id="Update"
             data-index="${start + index}" 
             data-Productid="${product._id}"
             class="bi bi-pencil-fill"> </i>
            </button>
            </td>
            `;
        tbody.appendChild(tr);
    });

    setupProductsPagination(Products, rowsPerPage, currentPage);
}

// * Function to Set Up Pagination
function setupProductsPagination(Products, rowsPerPage, currentPage) {
    const pagination = document.getElementById("Productpagination");
    pagination.innerHTML = ""; // * Clear previous pagination
    const totalPages = Math.ceil(Products.length / rowsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = "btn btn-info m-1";
        if (i === currentPage) button.className = "btn btn-dark";
        button.addEventListener("click", () => {
            displayProductsTable(Products, i, rowsPerPage);
        });
        pagination.appendChild(button);
    }
}


function DeleteProducts(productId){

    //* Fisrt Check if the Product isn't approved Yet Then Delete Directly Else Check For Pending  Orders 
    if(data.Products.find(p=>p.Approved==false)){
        console.log(productId)
        DeleteSepecificproduct(productId)
    }else{
        const DesiredOrders=data.Orders.filter(function(o){
            if(o.Status=="Pending"){
                return o.Items.filter(function(i){
                    if(i.ProductID==productId){
                        o.Status="Canceled"
                    }
                })

            }
        });
        console.log(DesiredOrders)
        console.log("Passed From Here")
        DesiredOrders.forEach(function(order){
            decreaseTotalSales(order.Items);
            increaseStock(order.Items);
        });
        // increaseStock(DesiredOrders.Items)
        // decreaseTotalSales(DesiredOrders.Items)
         DeleteSepecificproduct(productId)
    }
}


function ChangCard() {
    console.log("Entered")
    loadDataFromLocalStorage()
    // * Altering Cards Dynamically 
    const NumofOrdersCard = document.getElementById("OrderCard");
    const NumOfProductsCard = document.getElementById("ProductsCard");
    const NumofPendingProductssCard = document.getElementById("PendingProducts");
    const TotalSalesCard = document.getElementById("TotalSalesCard");

    if (data.Orders.filter(o => o.Items.some(i => i.SellerID == data.CurrentUser._id)).length) {
        NumofOrdersCard.innerText = data.Orders.filter(o => o.Items.some(i => i.SellerID == data.CurrentUser._id)).length

    } else {
        NumofOrdersCard.innerText = 0
    }

    if (data.Products.filter(p=>p.SellerID==data.CurrentUser._id).length) {
        NumOfProductsCard.innerText =data.Products.filter(p=>p.SellerID==data.CurrentUser._id).length
    } else {
        NumOfProductsCard.innerText = 0
    }

    if (data.Products.filter(p=>p.SellerID==data.CurrentUser._id && p.Approved==false).length) {
        NumofPendingProductssCard.innerText = data.Products.filter(p=>p.SellerID==data.CurrentUser._id && p.Approved==false).length
    } else {
        NumofPendingProductssCard.innerText = 0
    }

    let seller=data.Users.find(u=>u._id==data.CurrentUser?._id)
    if (seller) {
        TotalSalesCard.innerText = seller.TotalSales + '$'
    } else {
        TotalSalesCard.innerText = 0
    }
}

