import {
    getOrders,
    loadDataFromLocalStorage,
    saveDataInLocalStorage,
    data,
    isAuthorized
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
    <th  id="UserId" > UserId</th>
    <th  id="UserName" > UserName</th>
    <th  id="Items" > #Items</th>
    <th  id="TotalPrice" > TotalPrice</th>
    <th  id="CreatedAt" > CreatedAt</th>
    <th  id="Status" > Status</th>
    <th  id="Delete" > Delete</th>
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
        tr.innerHTML = `
            <td >${order._id}</td>
            <td >${order.UserID}</td>
            <td >${order.UserID}</td>
            <td >${order.Items.length}</td>
            <td >${order.TotalAmount}</td>
            <td >${order.CreatedAt}</td>
            <td >
            <button type="button" 
            id="StatusBtn"
        data-index="${start + index}" 
        data-Orderstatus="${order.Status}" 
        class="btn form-control status-btn ${order.Status === "Pending"
                ? "btn-warning"
                : order.Status === "Processing"
                    ? "btn-info"
                    : "btn-success"
            }">
    ${order.Status}
            </button>
            </td>
            <td class="delete-btn" >
            <button id="Del" type="button"  data-index="${start + index
            }" class="btn btn-danger">
            <i id="Del" data-index="${start + index
            }" class="bi bi-trash-fill"> </i>
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
    isAuthorized();
    let Orders = getOrders();
    let rowsPerPage = 10; // * Default rows per page
    let currentPage = 1;

    const counterInput = document.querySelector('input[type="number"]');
    const searchInput = document.querySelector('input[type="text"]');
    const table = document.getElementsByTagName("table")[0];

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

    // * Delete Order Row
    table.addEventListener("click", function (event) {
        if (event.target.id == "Del") {
            // * Start Sweet Alert
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    });
                    const index = +event.target.dataset.index;
                    console.log(index);
                    Orders.splice(index, 1);
                    localStorage.setItem("Orders", JSON.stringify(Orders));
                    // * Load Data From Local To Data Object To Achieve Consistency
                    console.log("ddd");
                    loadDataFromLocalStorage();
                    displayOrdersTable(Orders, currentPage, rowsPerPage);
                }
            });
            // * End Sweet Alert
        }
        if (event.target.id == "StatusBtn") {
            if (event.target.dataset.orderstatus != "Shipped") {
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
                                data.Orders[event.target.dataset.index].Status = "Processing";
                                break;
                            case "Processing":
                                data.Orders[event.target.dataset.index].Status = "Shipped";
                        }
                        saveDataInLocalStorage();
                        displayOrdersTable(Orders, currentPage, rowsPerPage);
                    }
                });
            }
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
