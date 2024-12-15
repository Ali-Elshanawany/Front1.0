import { data, getOrders, getUsers, loadDataFromLocalStorage,
     saveDataInLocalStorage, isAuthorized, getUserById, SetUserById,DeleteUser,increaseStock,decreaseTotalSales,DeleteOrders,TotalSales } from "../Data.js";

import {AddAccounts} from './AddAccounts.js'
import { DeleteSeller } from "./DeleteSellerAccount.js";

// ! Tesing Only Remove For Production 
//saveDataInLocalStorage();
// saveDataInLocalStorage();
// ! Note ----------------- Remove All Console.log() in Production

// * Function to Display the User Table
function displayTable(Users, currentPage = 1, rowsPerPage = 5) {
    const table = document.getElementsByTagName("table")[0];
    const tbody = document.querySelector("tbody");
    const thead = document.querySelector("thead");
    tbody.innerHTML = ""; // Clear previous rows
    thead.innerHTML = ""; // Clear previous rows


    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedUsers = Users.slice(start, end);
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <tr >
    <th  id="Name" > Name</th>
    <th  id="Email" > Email</th>
    <th  id="Phone" > Phone</th>
    <th  id="City" > City</th>
    <th  id="Role" > Role</th>
    <th  id="CreatedAt" > CreatedAt</th>
    <th  id="delete" > Delete</th>
    <th  id="update" > Update</th>
    </tr>   
`;
    thead.appendChild(tr);
    // * Add Asc Sorting Event
    tr.addEventListener("click", function (event) {
        const prop = event.target.id;
        console.log("Asc Sorting")
        if (prop) {
            Users.sort((a, b) => a[prop] > b[prop] ? 1 : -1);
            displayTable(Users, currentPage, rowsPerPage);
        }
    });
    // * Add Desc Sorting Event
    tr.addEventListener("dblclick", function (event) {
        const prop = event.target.id;
        console.log("Desc Sorting")
        if (prop) {
            Users.sort((a, b) => a[prop] < b[prop] ? 1 : -1);
            displayTable(Users, currentPage, rowsPerPage);
        }
    });
    paginatedUsers.forEach((employee, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td >${employee.Name}</td>
            <td >${employee.Email}</td>
            <td >${employee.Phone}</td>
            <td >${employee.City}</td>
            <td >${employee.Role}</td>
            <td >${employee.CreatedAt}</td>
            <td class="delete-btn" >
            <button id="Del" type="button"  data-index="${start + index}" data-userid="${employee._id}"  class="btn btn-danger">
            <i id="Del" data-index="${start + index}" data-userid="${employee._id}" class="bi bi-trash-fill"> </i>
            </button>
            </td>
            <td class="Update-btn" >
            <button id="Update" type="button"  data-index="${start + index}" data-userid="${employee._id}" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#addCustomerModal">
            <i id="Update" data-index="${start + index}" data-userid="${employee._id}"  class="bi bi-pencil-fill"> </i>
            </button>
            </td>
            `;
        tbody.appendChild(tr);
    });

    setupPagination(Users, rowsPerPage, currentPage);
}

// * Function to Set Up Pagination
function setupPagination(Users, rowsPerPage, currentPage) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; // * Clear previous pagination
    const totalPages = Math.ceil(Users.length / rowsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = "btn btn-info m-1";
        if (i === currentPage) button.className = ("btn btn-dark");
        button.addEventListener("click", () => {
            displayTable(Users, i, rowsPerPage);
        });
        pagination.appendChild(button);
    }
}


// * Event Listeners Load 
window.addEventListener("load", function () {
   // isAuthorized();
    let isUpdate=false;

    let Users = getUsers();
    let Tickets=data.Tickets;
    let rowsPerPage = 10; // * Default rows per page
    let currentPage = 1;

    let UpdatedUser = null;

    const counterInput = document.querySelector('input[type="number"]');
    const searchInput = document.querySelector('input[type="text"]');

    const TicketcounterInput = document.getElementById('TicketCounterInput');
    const TicketsearchInput = document.getElementById('TicketSearhInput');



    const table = document.getElementsByTagName("table")[0];
    // * Altering Cards Dynamically 
    changeCard();


    displayTable(Users, currentPage, rowsPerPage);
    displayTicketsTable(Tickets, currentPage, rowsPerPage);

    // * Update Rows Per Page Based on Counter Input
    counterInput.addEventListener("change", function () {
        rowsPerPage = parseInt(this.value, 10) || 5;
        currentPage = 1; // * Reset to the first page
        displayTable(Users, currentPage, rowsPerPage);
    });
    // * Tickets counter Row / Page Event
    TicketcounterInput.addEventListener("change", function () {
        rowsPerPage = parseInt(this.value, 10) || 5;
        currentPage = 1; // * Reset to the first page
        displayTicketsTable(Tickets, currentPage, rowsPerPage);
    });

    // * Delete || update User Row
    table.addEventListener("click", function (event) {
        if (event.target.id == "Del") {
            const userid = event.target.dataset.userid;
            const user = data.Users.find(u=>u._id==userid)
            if(user._id!==data.CurrentUser._id){
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
                        if(user.Role=="User"){
                            DeleteCustomer(user._id);
                        }else if(user.Role=="Seller"){
                            DeleteSeller(user._id)
                        }else{
                            DeleteUser(user._id)
                        }
                        Users = getUsers();
                        changeCard();
                        displayTable(Users, currentPage, rowsPerPage);
                    }
                });
                // * End Sweet Alert
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You Can't Delete This Account",
                  });
            }
        }
        if (event.target.id == "Update") {
                // * When Clicked is update trun True Then AddAccounts Function Will Know that is update not addning new Accounts 
            isUpdate=true;
            $("#RoleDiv").css("display","none")
            const userid = event.target.dataset.userid;
            const user = data.Users.find(u=>u._id==userid)
            UpdatedUser=user
            $("#in-head").text(" Update Account");
            $("#in-email").val(user.Email);
            $("#in-name").val(user.Name);
            $("#in-password").val(user.Password);
            $("#in-Phone").val(user.Phone);
            $("#in-City").val(user.City);
            $("#in-Street").val(user.Street);
            user.Role == "Admin"
                ? $("#roleAdmin").prop("checked", true)
                : user.Role == "Seller"
                    ? $("#roleSeller").prop("checked", true)
                    : $("#roleCustomer").prop("checked", true);
            console.log("Changes");
        }
    });
    // * Search Users
    searchInput.addEventListener("keyup", function () {
        const searchTerm = this.value.trim().toLowerCase();
        const filteredUsers = Users.filter(user =>
            user.Name.toLowerCase().includes(searchTerm) ||
            user.Email.toLowerCase().includes(searchTerm) ||
            user.Phone.toLowerCase().includes(searchTerm) ||
            user.City.toLowerCase().includes(searchTerm) ||
            user.Role.toLowerCase().includes(searchTerm) ||
            user.CreatedAt.toLowerCase().includes(searchTerm)
        );
        currentPage = 1; // * Reset to the first page
        displayTable(filteredUsers, currentPage, rowsPerPage);
    });
    // * Ticket Search Input 
    TicketsearchInput.addEventListener("keyup", function () {
        const searchTerm = this.value.trim().toLowerCase();
        const filteredTickets = Tickets.filter(ticket =>
            ticket.Comment?.toLowerCase().includes(searchTerm) ||
            ticket.Email?.toString().toLowerCase().includes(searchTerm)||
            ticket.CreatedAt?.toLowerCase().includes(searchTerm)
        );
        currentPage = 1; // * Reset to the first page
        displayTicketsTable(filteredTickets, currentPage, rowsPerPage);
    });

    // * on click Add Account Button the form will reset and the header will change to the default 
    $("#add-Account").on('click', function () {
        $("#in-head").text("Add New Account");
        $("#AccountsForm")[0].reset();
        isUpdate=false
        UpdatedUser=null
        $("#RoleDiv").css("display","flex")
        
    });
    $("#Confirm").on('click', function (e) {
        AddAccounts(isUpdate,UpdatedUser);
        loadDataFromLocalStorage();
        Users=getUsers();
        changeCard();
        displayTable(Users,currentPage,rowsPerPage);
    });
   



    function DeleteCustomer(customerid) {
        const selectedorders = data.Orders.filter(function (e) {
            return e.UserID == customerid && e.Status != "Shipped"
        });
        console.log(selectedorders);
        selectedorders.forEach(function (or) {
            console.log(or.Items)
            decreaseTotalSales(or.Items)
            increaseStock(or.Items);
            DeleteOrders(customerid);
        });
        DeleteUser(customerid);
    }



});// * end of load


//! ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// * Function to Display the User Table
function displayTicketsTable(Tickets, currentPage = 1, rowsPerPage = 10) {
    const tbody = document.getElementById("TicketBody");
    const thead = document.getElementById("TicketHead");
    tbody.innerHTML = ""; // Clear previous rows
    thead.innerHTML = ""; // Clear previous rows


    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedUsers = Tickets.slice(start, end);
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <tr >
    <th  id="Email" > Email</th>
    <th  id="Comment" > Comments</th>
    <th  id="CreatedAt" > CreatedAt</th>
    </tr>   
`;
    thead.appendChild(tr);
    // * Add Asc Sorting Event
    tr.addEventListener("click", function (event) {
        const prop = event.target.id;
        console.log("Asc Sorting")
        if (prop) {
            Tickets.sort((a, b) => a[prop] > b[prop] ? 1 : -1);
            displayTicketsTable(Tickets, currentPage, rowsPerPage);
        }
    });
    // * Add Desc Sorting Event
    tr.addEventListener("dblclick", function (event) {
        const prop = event.target.id;
        console.log("Desc Sorting")
        if (prop) {
            Tickets.sort((a, b) => a[prop] < b[prop] ? 1 : -1);
            displayTicketsTable(Tickets, currentPage, rowsPerPage);
        }
    });
    paginatedUsers.forEach((ticket) => {
        let UserName=data.Users.find(user=>user._id==ticket.UserID)?.Name||"Anonymous"
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td >${ticket.Email||"Anonymous"}</td>
            <td >${ticket.Comment}</td>
            <td >${ticket.CreatedAt}</td>
            `;
        tbody.appendChild(tr);
    });

    setupTicketsPagination(Tickets, rowsPerPage, currentPage);
}

// * Function to Set Up Pagination
function setupTicketsPagination(Tickets, rowsPerPage, currentPage) {
    const pagination = document.getElementById("Ticketpagination");
    pagination.innerHTML = ""; // * Clear previous pagination
    const totalPages = Math.ceil(Tickets.length / rowsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = "btn btn-info m-1";
        if (i === currentPage) button.className = ("btn btn-dark");
        button.addEventListener("click", () => {
            displayTicketsTable(Tickets, i, rowsPerPage);
        });
        pagination.appendChild(button);
    }
}



function changeCard(){
    const NumofOrdersCard =document.getElementById("OrderCard");
    const NumOfUsersCard = document.getElementById("UsersCard");
    const NumofTicketsCard = document.getElementById("TicketCard");
    const TotalSalesCard = document.getElementById("TotalSalesCard");

    if(data.Orders.length){
        NumofOrdersCard.innerText = data.Orders.length 
    }else{
        NumofOrdersCard.innerText = 0
    }
    if(getUsers().length){
        NumOfUsersCard.innerText = getUsers().length
    }else{
        NumOfUsersCard.innerText = 0
    }
    if(data.Tickets.length){
        NumofTicketsCard.innerText = data.Tickets.length 
    }else{
        NumofTicketsCard.innerText = 0
    }
    if(TotalSales()){
        TotalSalesCard.innerText = TotalSales() +'$'
    }else{
        TotalSalesCard.innerText = 0
    }
}
