import {
    getOrders,
    loadDataFromLocalStorage,
    saveDataInLocalStorage,
    data,
    isAuthorized,
    SellerOrders,
    getSalesByMonth
} from "../Data.js";
// import {Draw} from '../Admin/Chart.js'

// ! Tesing Only Remove For Production
// saveDataInLocalStorage();
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
        class="btn form-control status-btn ${order.Status === "Pending" ? "btn-warning"
                : order.Status === "Shipped" ? "btn-info"
                    : order.Status === "Delivered" ? "btn-success" : "btn-danger"
            }">
    ${order.Status}
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
 //   isAuthorized();
//  const dataValues = getSalesByMonth();
//  console.log(dataValues);

//  Draw(dataValues)
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
    }).then(result => {
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


 ChangCard()
    let Orders = SellerOrders();
    console.log(Orders)
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


function ChangCard() {
    console.log("Entered")
    loadDataFromLocalStorage()
    // * Altering Cards Dynamically 
    const NumofOrdersCard = document.getElementById("OrderCard");
    const NumOfCanceledOrdersCard = document.getElementById("CanceledOrdersCard");
    const NumofDeliveredOrdersCard = document.getElementById("DeliveredOrdersCard");
    const TotalSalesCard = document.getElementById("TotalSalesCard");

    if ((data.Orders || []).filter(o => o.Items.some(i => i.SellerId == data.CurrentUser._id)).length) {
        NumofOrdersCard.innerText = (data.Orders || []).filter(o => o.Items.some(i => i.SellerId == data.CurrentUser._id)).length

    } else {
        NumofOrdersCard.innerText = 0
    }

    if ((data.Orders || []).filter(o => o.Items.some(i => i.SellerId == data.CurrentUser._id) && o.Status=="Canceled").length) {
        NumOfCanceledOrdersCard.innerText =(data.Orders || []).filter(o => o.Items.some(i => i.SellerId == data.CurrentUser._id) && o.Status=="Canceled").length
    } else {
        NumOfCanceledOrdersCard.innerText = 0
    }

    if ((data.Orders || []).filter(o => o.Items.some(i => i.SellerId == data.CurrentUser._id) && o.Status=="Delivered").length) {
        NumofDeliveredOrdersCard.innerText = (data.Orders || []).filter(o => o.Items.some(i => i.SellerId == data.CurrentUser._id) && o.Status=="Delivered").length
    } else {
        NumofDeliveredOrdersCard.innerText = 0
    }
    let seller=data.Users.find(u=>u._id==data.CurrentUser._id)
    if (seller) {
        TotalSalesCard.innerText = seller.TotalSales + '$'
    } else {
        TotalSalesCard.innerText = 0
    }
}
