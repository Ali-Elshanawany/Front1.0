import {
    getOrders,
    loadDataFromLocalStorage,
    saveDataInLocalStorage,
    data,
    isAuthorized,
    PendingProducts,
    ApproveProducts,
    CancelOrder,
    increaseStock,
    decreaseTotalSales,
    GetOrder,
    TotalSales
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
    <th  id="_id" > OrderId</th>
    <th  id="UserName" > UserName</th>
    <th  id="Items" > #Items</th>
    <th  id="TotalAmount" > TotalPrice</th>
    <th  id="CreatedAt" > CreatedAt</th>
    <th  id="Status" > Status</th>
    <th  id="delete" > Cancel</th>
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
        Orders = getOrders(); 
    });
    // * Add Desc Sorting Event
    tr.addEventListener("dblclick", function (event) {
        const prop = event.target.id;

        if (prop) {
            Orders.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
            displayOrdersTable(Orders, currentPage, rowsPerPage);
        }
        Orders = getOrders(); 
    });
    paginatedOrders.forEach((order, index) => {
        const tr = document.createElement("tr");
        let UserName = data.Users.find(user => user._id == order.UserID).Name
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
        class="btn form-control status-btn ${order.Status === "Pending" ? "btn-warning"
                : order.Status === "Shipped" ? "btn-info"
                    : order.Status === "Delivered" ? "btn-success" : "btn-danger"
            }">
    ${order.Status}
            </button>
            <td class="delete-btn" >
            <button id="Del" type="button"  data-index="${start + index}" class="btn btn-danger" data-order="${order._id}" data-status="${order.Status}">
            <i id="Del" data-index="${start + index}" data-order="${order._id}" data-status="${order.Status}" class="bi bi-x-lg"> </i>
            </button>
            </td>
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
    // isAuthorized();
    let Orders = getOrders();
    let Products = PendingProducts();
    console.log(Products)
    let rowsPerPage = 10; // * Default rows per page
    let currentPage = 1;

    ChangCard()

    const counterInput = document.querySelector('input[type="number"]');
    const searchInput = document.querySelector('input[type="text"]');
    const table = document.getElementsByTagName("table")[0];
    const Producttable = document.getElementsByTagName("table")[1];



    const ProductcounterInput = document.getElementById('ProductCounterInput');
    const ProductsearchInput = document.getElementById('ProductSearhInput');

    ProductcounterInput.addEventListener("change", function () {
        rowsPerPage = parseInt(this.value, 10) || 5;
        currentPage = 1; // * Reset to the first page
        displayProductsTable(Products, currentPage, rowsPerPage)
    });

    ProductsearchInput.addEventListener("keyup", function () {
        const searchTerm = this.value.trim().toLowerCase();
        const filteredProducts = Products.filter(product =>
            product.Name.toLowerCase().includes(searchTerm) ||
            product.Description.toLowerCase().includes(searchTerm) ||
            product.Price.toLocaleString().toLowerCase().includes(searchTerm)||
            product.Stock.toLocaleString().toLowerCase().includes(searchTerm) ||
            product.CategoryID.toLowerCase().includes(searchTerm) ||
            product.CreatedAt.toLowerCase().includes(searchTerm) 
        );
        currentPage = 1; // * Reset to the first page
        displayProductsTable(filteredProducts, currentPage, rowsPerPage);
    });



    table.addEventListener("click", function (event) {
        if (event.target.id == "Del") {
            const index = +event.target.dataset.index;
            console.log("Start")
            console.log(event.target.dataset.order)
            const selectedOrder = GetOrder(event.target.dataset.order)
            console.log("This is Order")
            console.log(selectedOrder)

            if (selectedOrder.Status !== "Delivered" && selectedOrder.Status !== "Canceled") {
                // * Start Sweet Alert
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Cancel it!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Canceled!",
                            text: "Your Order has been Canceled.",
                            icon: "success",
                        });
                        // Orders.splice(index, 1);
                        // console.log(event.target.dataset.order)
                        // * Canceling order 
                        CancelOrder(event.target.dataset.order);
                        increaseStock(selectedOrder.Items)
                        decreaseTotalSales(selectedOrder.Items)

                        //localStorage.setItem("Orders", JSON.stringify(Orders));
                        // * Load Data From Local To Data Object To Achieve Consistency
                        Orders = getOrders(); 
                        ChangCard()
                        displayOrdersTable(Orders, currentPage, rowsPerPage);
                    }
                });
                // * End Sweet Alert
            }

        }
        if (event.target.id == "StatusBtn") {
            console.log(event.target.dataset.orderstatus)
            if (event.target.dataset.orderstatus !== "Delivered" && event.target.dataset.orderstatus !== "Canceled") {
                Swal.fire({
                    title: "Are you sure?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Update it!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Updated Successfully!",
                            icon: "success",
                        });
                        switch (data.Orders[event.target.dataset.index].Status) {
                            case "Pending":
                                data.Orders[event.target.dataset.index].Status = "Shipped";
                                break;
                            case "Shipped":
                                data.Orders[event.target.dataset.index].Status = "Delivered";
                        }
                        saveDataInLocalStorage();
                        Orders = getOrders();
                        //loadDataFromLocalStorage();
                        ChangCard()
                        displayOrdersTable(Orders, currentPage, rowsPerPage);
                    }
                });
            }
        }
    });

    displayProductsTable(Products, currentPage, rowsPerPage)



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
                confirmButtonText: "Yes, Approve it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Approved!!",
                        text: "Your Product has been Approved.",
                        icon: "success"
                    });

                    const index = +event.target.dataset.index;
                    const id = event.target.dataset.productid;
                    console.log(index);
                    console.log(id);
                    ApproveProducts(id);
                    Products = PendingProducts();
                    loadDataFromLocalStorage()
                    ChangCard()
                    displayProductsTable(Products, currentPage, rowsPerPage)
                }
            });
            // * End Sweet Alert
        }
        // if (event.target.id == "Update") {
        //     // * When Clicked is update trun True Then AddAccounts Function Will Know that is update not addning new Accounts 
        //     isUpdate = true;
        //     const selectedUser = data.Users[event.target.dataset.index]
        //     $("#in-head").text(" Update Account");
        //     $("#in-email").val(selectedUser.Email);
        //     $("#in-name").val(selectedUser.Name);
        //     $("#in-password").val(selectedUser.Password);
        //     $("#in-Phone").val(selectedUser.Phone);
        //     $("#in-City").val(selectedUser.City);
        //     $("#in-Street").val(selectedUser.Street);
        //     selectedUser.Role == "Admin"
        //         ? $("#roleAdmin").prop("checked", true)
        //         : selectedUser.Role == "Seller"
        //             ? $("#roleSeller").prop("checked", true)
        //             : $("#roleCustomer").prop("checked", true);
        //     console.log("Changes");
        // }
    });


    // * Search Orders
    searchInput.addEventListener("keyup", function () {
        const searchTerm = this.value.trim().toLowerCase();
        const filteredOrders = Orders.filter(
            (order) =>
                order.UserID.toLowerCase().includes(searchTerm) ||
                order._id.toLowerCase().includes(searchTerm) ||
                order.Status.toLowerCase().includes(searchTerm) ||
                order.CreatedAt.toLowerCase().includes(searchTerm)||
                order.TotalAmount.toString().toLowerCase().includes(searchTerm)
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
    <th  id="approve" > Action</th>
    </tr>   
`;
    thead.appendChild(tr);
    // * Add Asc Sorting Event
    tr.addEventListener("click", function (event) {
        const prop = event.target.id;
        console.log("Asc Sorting")
        if (prop) {
            Products.sort((a, b) => a[prop] > b[prop] ? 1 : -1);
            displayProductsTable(Products, currentPage, rowsPerPage);
        }
    });
    // * Add Desc Sorting Event
    tr.addEventListener("dblclick", function (event) {
        const prop = event.target.id;
        console.log("Desc Sorting")
        if (prop) {
            Products.sort((a, b) => a[prop] < b[prop] ? 1 : -1);
            displayProductsTable(Products, currentPage, rowsPerPage);
        }
    });
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedUsers = Products.slice(start, end);
    paginatedUsers.forEach((product, index) => {
        console.log("-----------------------1")
        console.log(product.SellerID)
        console.log("-----------------------2")
        console.log(data.Users.find(user => user._id == product.SellerID).Name)
        console.log("-----------------------3")
        let SellerName = data.Users.find(user => user._id == product.SellerID).Name
        console.log("-----------------------4")
        console.log(SellerName)
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


function ChangCard() {
    console.log("Entered")
    loadDataFromLocalStorage()
    // * Altering Cards Dynamically 
    const NumofOrdersCard = document.getElementById("OrderCard");
    const NumOfCanceledOrdersCard = document.getElementById("CanceledOrdersCard");
    const NumofPendingProductssCard = document.getElementById("PendingProducts");
    const TotalSalesCard = document.getElementById("TotalSalesCard");

    if (data.Orders.length) {
        NumofOrdersCard.innerText = data.Orders.length
    } else {
        NumofOrdersCard.innerText = 0
    }

    if (data.Orders.filter(o=>o.Status=="Canceled").length) {
        NumOfCanceledOrdersCard.innerText = data.Orders.filter(o=>o.Status=="Canceled").length
    } else {
        NumOfCanceledOrdersCard.innerText = 0
    }

    if (data.Products.filter(p=>p.Approved==false).length) {
        NumofPendingProductssCard.innerText = data.Products.filter(p=>p.Approved==false).length
    } else {
        NumofPendingProductssCard.innerText = 0
    }

    if (TotalSales()) {
        TotalSalesCard.innerText = TotalSales() + '$'
    } else {
        TotalSalesCard.innerText = 0
    }
}