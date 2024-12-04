import { getUsers, loadDataFromLocalStorage, saveDataInLocalStorage } from "./Data.js";

const Users = getUsers();

// ! Tesing Only Remove For Production 
//saveDataInLocalStorage();
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
    <th  id="id" > Id</th>
    <th  id="name" > Name</th>
    <th  id="email" > Email</th>
    <th  id="phone" > Phone</th>
    <th  id="city" > City</th>
    <th  id="role" > Role</th>
    <th  id="CreatedAt" > CreatedAt</th>
    <th  id="delete" > Delete</th>
    <th  id="update" > Update</th>
    </tr>   
`;
    thead.appendChild(tr);
    // * Add Asc Sorting Event
    tr.addEventListener("click", function (event) {
        const prop = event.target.id;
        if (prop) {
            Users.sort((a, b) => a[prop] > b[prop] ? 1 : -1);
            displayTable(Users, currentPage, rowsPerPage);
        }
    });
    // * Add Desc Sorting Event
    tr.addEventListener("dblclick", function (event) {
        const prop = event.target.id;

        if (prop) {
            Users.sort((a, b) => a[prop] < b[prop] ? 1 : -1);
            displayTable(Users, currentPage, rowsPerPage);
        }
    });
    paginatedUsers.forEach((employee, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td >${employee._id}</td>
            <td >${employee.Name}</td>
            <td >${employee.Email}</td>
            <td >${employee.Phone}</td>
            <td >${employee.City}</td>
            <td >${employee.Role}</td>
            <td >${employee.CreatedAt}</td>
            <td class="delete-btn" >
            <button id="Del" type="button"  data-index="${start + index}" class="btn btn-danger">
            <i id="Del" data-index="${start + index}" class="bi bi-trash-fill"> </i>
            </button>
            </td>
            <td class="Update-btn" >
            <button id="Update" type="button"  data-index="${start + index}" class="btn btn-warning">
            <i id="Update" data-index="${start + index}"  class="bi bi-pencil-fill"> </i>
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
    let Users = JSON.parse(localStorage.getItem("Users")) || [];
    let rowsPerPage = 10; // * Default rows per page
    let currentPage = 1;

    const counterInput = document.querySelector('input[type="number"]');
    const searchInput = document.querySelector('input[type="text"]');
    const table = document.getElementsByTagName("table")[0];
    const headerRow = document.getElementsByTagName("tr")[0];
    const UsersNum=this.document.getElementById("Users");
    UsersNum.innerText=getUsers().length

    displayTable(Users, currentPage, rowsPerPage);

    // * Update Rows Per Page Based on Counter Input
    counterInput.addEventListener("change", function () {
        rowsPerPage = parseInt(this.value, 10) || 5;
        currentPage = 1; // * Reset to the first page
        displayTable(Users, currentPage, rowsPerPage);
    });

    // * Delete User Row
    table.addEventListener("click", function (event) {
        console.log(event.target.id);
        if (event.target.id == "Del") {
            const index = +event.target.dataset.index;
            console.log(index);
            Users.splice(index, 1);
            localStorage.setItem("Users", JSON.stringify(Users));
            // * Load Data From Local To Data Object To Achieve Consistency 
            loadDataFromLocalStorage()
            displayTable(Users, currentPage, rowsPerPage);
        }
    });

    // * Search Users
    searchInput.addEventListener("keyup", function () {
        const searchTerm = this.value.trim().toLowerCase();
        const filteredUsers = Users.filter(user =>
            user.Name.toLowerCase().includes(searchTerm) ||
            user._id.toLowerCase().includes(searchTerm) ||
            user.Email.toLowerCase().includes(searchTerm) ||
            user.Phone.toLowerCase().includes(searchTerm) ||
            user.City.toLowerCase().includes(searchTerm) ||
            user.Role.toLowerCase().includes(searchTerm) ||
            user.CreatedAt.toLowerCase().includes(searchTerm)
        );

        currentPage = 1; // * Reset to the first page
        displayTable(filteredUsers, currentPage, rowsPerPage);
    });


});// * end of load




