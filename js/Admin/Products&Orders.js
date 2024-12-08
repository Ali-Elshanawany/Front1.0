import {
    getOrders,
    loadDataFromLocalStorage,
    saveDataInLocalStorage,
    data,
    isAuthorized,
    PendingProducts,
    ApproveProducts
} from "../Data.js";

// ! Tesing Only Remove For Production
//saveDataInLocalStorage();
// ! Note ----------------- Remove All Console.log() in Production

// * Function to Display the User Table
function displayOrdersTable(Orders, currentPage = 1, rowsPerPage = 5) {
    const table = document.getElementsByTagName("table")[0];
    const tbody = document.querySelector("tbody");
    const thead = document.querySelector("thead");
    tbody.innerHTML = ""; // Clear previous rows
    thead.innerHTML = ""; // Clear previous rows
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedOrders = Orders.slice(start, end);
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <tr >
    <th  id="OrderId" > OrderId</th>
    <th  id="UserName" > UserName</th>
    <th  id="Items" > #Items</th>
    <th  id="TotalAmount" > TotalPrice</th>
    <th  id="CreatedAt" > CreatedAt</th>
    <th  id="Status" > Status</th>
    </tr>   
`;
    thead.appendChild(tr);
    // * Add Asc Sorting Event
    tr.addEventListener("click", function (event) {
        const prop = event.target.id;
        if (prop) {
            Orders.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
            displayOrdersTable(Orders, currentPage, rowsPerPage);
        }
    });
    // * Add Desc Sorting Event
    tr.addEventListener("dblclick", function (event) {
        const prop = event.target.id;

        if (prop) {
            Orders.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
            displayOrdersTable(Orders, currentPage, rowsPerPage);
        }
    });
    paginatedOrders.forEach((order, index) => {
        const tr = document.createElement("tr");
        let UserName=data.Users.find(user=>user._id==order.UserID).Name
        tr.innerHTML = `
            <td >${order._id}</td>
            <td >${UserName}</td>
            <td >${order.Items.length}</td>
            <td >${order.TotalAmount}</td>
            <td >${order.CreatedAt}</td>
            <td >
            <button type="button" 
            id="StatusBtn"
        data-index="${start + index}" 
        data-Orderstatus="${order.Status}" 
        class="btn form-control status-btn ${
            order.Status === "Pending"   ? "btn-warning"
            : order.Status === "Shipped" ? "btn-info"
            :order.Status==="Delivered"  ? "btn-success" :"btn-danger"
            }">
    ${order.Status}
            </button>
            `;
        tbody.appendChild(tr);
    });

    setupPagination(Orders, rowsPerPage, currentPage);
}

// * Function to Set Up Pagination
function setupPagination(Orders, rowsPerPage, currentPage) {
    const pagination = document.getElementById("pagination");

    pagination.innerHTML = ""; // * Clear previous pagination

    const totalPages = Math.ceil(Orders.length / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = "btn btn-info m-1";
        if (i === currentPage) button.className = "btn btn-dark";

        button.addEventListener("click", () => {
            displayOrdersTable(Orders, i, rowsPerPage);
        });

        pagination.appendChild(button);
    }
}

// * Event Listeners Load
window.addEventListener("load", function () {
    isAuthorized();
    let Orders = getOrders();
    let Products=PendingProducts();
    console.log(Products)
    let rowsPerPage = 10; // * Default rows per page
    let currentPage = 1;

    const counterInput = document.querySelector('input[type="number"]');
    const searchInput = document.querySelector('input[type="text"]');
    const table = document.getElementsByTagName("table")[0];
    const Producttable = document.getElementsByTagName("table")[1];



    const ProductcounterInput = document.getElementById('ProductCounterInput');
    const ProductsearchInput = document.getElementById('ProductSearhInput');

    ProductcounterInput.addEventListener("change", function () {
        rowsPerPage = parseInt(this.value, 10) || 5;
        currentPage = 1; // * Reset to the first page
        displayProductsTable(Products,currentPage,rowsPerPage)
    });

    ProductsearchInput.addEventListener("keyup", function () {
        const searchTerm = this.value.trim().toLowerCase();
        const filteredProducts = Products.filter(product =>
            product.Name.toLowerCase().includes(searchTerm) ||
            product.Price.toLocaleString().toLowerCase().includes(searchTerm)
        );
        currentPage = 1; // * Reset to the first page
        displayProductsTable(filteredProducts, currentPage, rowsPerPage);
    });



    // if(Products){
    //     displayProductsTable(Products,currentPage,rowsPerPage)
    //     this.document.getElementById("ProductsNoData").innerText=""
    // }
    // else{
    //     this.document.getElementById("ProductsNoData").innerText="No Data"
    // }
   displayProductsTable(Products,currentPage,rowsPerPage)



    displayOrdersTable(Orders, currentPage, rowsPerPage);

    $("#home").on("click", function () {
        displayOrdersTable(Orders, 1, 10);
    });

    // * Update Rows Per Page Based on Counter Input
    counterInput.addEventListener("change", function () {
        rowsPerPage = parseInt(this.value, 10) || 5;
        currentPage = 1; // * Reset to the first page
        displayOrdersTable(Orders, currentPage, rowsPerPage);
    });


    Producttable.addEventListener("click", function (event) {
        console.log(event.target.id);
        if (event.target.id == "Approve") {
            // * Start Sweet Alert
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                    const index = +event.target.dataset.index;
                    const id = event.target.dataset.productid;
                    console.log(index);
                    console.log(id);
                    ApproveProducts(id);
                    Products=PendingProducts();
                    loadDataFromLocalStorage()
                    displayProductsTable(Products,currentPage,rowsPerPage)
                }
            });
            // * End Sweet Alert
        }
        if (event.target.id == "Update") {
                // * When Clicked is update trun True Then AddAccounts Function Will Know that is update not addning new Accounts 
            isUpdate=true;
            const selectedUser = data.Users[event.target.dataset.index]
            $("#in-head").text(" Update Account");
            $("#in-email").val(selectedUser.Email);
            $("#in-name").val(selectedUser.Name);
            $("#in-password").val(selectedUser.Password);
            $("#in-Phone").val(selectedUser.Phone);
            $("#in-City").val(selectedUser.City);
            $("#in-Street").val(selectedUser.Street);
            selectedUser.Role == "Admin"
                ? $("#roleAdmin").prop("checked", true)
                : selectedUser.Role == "Seller"
                    ? $("#roleSeller").prop("checked", true)
                    : $("#roleCustomer").prop("checked", true);
            console.log("Changes");
        }
    });
 

    // * Search Orders
    searchInput.addEventListener("keyup", function () {
        const searchTerm = this.value.trim().toLowerCase();
        const filteredOrders = Orders.filter(
            (order) =>
                order.UserID.toLowerCase().includes(searchTerm) ||
                order._id.toLowerCase().includes(searchTerm) ||
                order.Status.toLowerCase().includes(searchTerm) ||
                order.CreatedAt.toLowerCase().includes(searchTerm)
        );

        currentPage = 1; // * Reset to the first page
        displayOrdersTable(filteredOrders, currentPage, rowsPerPage);
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
    <th  id="approve" > Approve</th>
    </tr>   
`;
    thead.appendChild(tr);
    // * Add Asc Sorting Event
    tr.addEventListener("click", function (event) {
        const prop = event.target.id;
        console.log("Asc Sorting")
        if (prop) {
            Tickets.sort((a, b) => a[prop] > b[prop] ? 1 : -1);
            displayProductsTable(Products, currentPage, rowsPerPage);
        }
    });
    // * Add Desc Sorting Event
    tr.addEventListener("dblclick", function (event) {
        const prop = event.target.id;
        console.log("Desc Sorting")
        if (prop) {
            Tickets.sort((a, b) => a[prop] < b[prop] ? 1 : -1);
            displayProductsTable(Products, currentPage, rowsPerPage);
        }
    });
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedUsers = Products.slice(start, end);
    paginatedUsers.forEach((product,index) => {
        let SellerName=data.Users.find(user=>user._id==product.SellerID).Name
        //console.log(SellerName)
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td >${product.Name}</td>
            <td >${product.Description}</td>
            <td >${product.Price}</td>
            <td >${product.Stock}</td>
            <td >${product.CategoryID}</td>
            <td >${SellerName}</td>
            <td><img src="${product.Images[0]}" style="width: 150px !important; height: 150px !important;" /></td>
            <td >${product.CreatedAt}</td>
             <td class="delete-btn" >
            <button id="Approve" type="button"  data-index="${start + index}" data-Productid=${product._id} class="btn btn-success">
            Approve
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
        if (i === currentPage) button.className = ("btn btn-dark");
        button.addEventListener("click", () => {
            displayProductsTable(Products, i, rowsPerPage);
        });
        pagination.appendChild(button);
    }
}
