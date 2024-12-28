import { data, getOrders, getUsers, loadDataFromLocalStorage,
     saveDataInLocalStorage, isAuthorized, getUserById, SetUserById,DeleteUser,increaseStock,decreaseTotalSales,DeleteOrders,TotalSales } from "../Data.js";

import {AddAccounts} from './AddAccounts.js'
import { DeleteSeller } from "./DeleteSellerAccount.js";

// ! Tesing Only Remove For Production 
//saveDataInLocalStorage();
//saveDataInLocalStorage();
// ! Note ----------------- Remove All Console.log() in Production

// // * Function to Display the User Table
// function displayTable(Users, currentPage = 1, rowsPerPage = 10) {
//     const table = document.getElementsByTagName("table")[0];
//     const tbody = document.querySelector("tbody");
//     const thead = document.querySelector("thead");
//     tbody.innerHTML = ""; // Clear previous rows
//     thead.innerHTML = ""; // Clear previous rows


//     const start = (currentPage - 1) * rowsPerPage;
//     const end = start + rowsPerPage;
//     const paginatedUsers = Users.slice(start, end);
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//     <tr >
//     <th  id="Name" > Name</th>
//     <th  id="Email" > Email</th>
//     <th  id="Phone" > Phone</th>
//     <th  id="City" > City</th>
//     <th  id="Role" > Role</th>
//     <th  id="CreatedAt" > CreatedAt</th>
//     <th  id="delete" > Delete</th>
//     <th  id="update" > Update</th>
//     </tr>   
// `;
//     thead.appendChild(tr);
//     // * Add Asc Sorting Event
//     tr.addEventListener("click", function (event) {
//         const prop = event.target.id;
//         console.log("Asc Sorting")
//         if (prop) {
//             Users.sort((a, b) => a[prop] > b[prop] ? 1 : -1);
//             displayTable(Users, currentPage, rowsPerPage);
//         }
//     });
//     // * Add Desc Sorting Event
//     tr.addEventListener("dblclick", function (event) {
//         const prop = event.target.id;
//         console.log("Desc Sorting")
//         if (prop) {
//             Users.sort((a, b) => a[prop] < b[prop] ? 1 : -1);
//             displayTable(Users, currentPage, rowsPerPage);
//         }
//     });
//     paginatedUsers.forEach((employee, index) => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td >${employee.Name}</td>
//             <td >${employee.Email}</td>
//             <td >${employee.Phone}</td>
//             <td >${employee.City}</td>
//             <td >${employee.Role}</td>
//             <td >${employee.CreatedAt}</td>
//             <td class="delete-btn" >
//             <button id="Del" type="button"  data-index="${start + index}" data-userid="${employee._id}"  class="btn btn-danger">
//             <i id="Del" data-index="${start + index}" data-userid="${employee._id}" class="bi bi-trash-fill"> </i>
//             </button>
//             </td>
//             <td class="Update-btn" >
//             <button id="Update" type="button"  data-index="${start + index}" data-userid="${employee._id}" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#addCustomerModal">
//             <i id="Update" data-index="${start + index}" data-userid="${employee._id}"  class="bi bi-pencil-fill"> </i>
//             </button>
//             </td>
//             `;
//         tbody.appendChild(tr);
//     });

//     setupPagination(Users, rowsPerPage, currentPage);
// }

// // * Function to Set Up Pagination
// function setupPagination(Users, rowsPerPage, currentPage) {
//     const pagination = document.getElementById("pagination");
//     pagination.innerHTML = ""; // * Clear previous pagination
//     const totalPages = Math.ceil(Users.length / rowsPerPage);
//     for (let i = 1; i <= totalPages; i++) {
//         const button = document.createElement("button");
//         button.textContent = i;
//         button.className = "btn btn-info m-1";
//         if (i === currentPage) button.className = ("btn btn-dark");
//         button.addEventListener("click", () => {
//             displayTable(Users, i, rowsPerPage);
//         });
//         pagination.appendChild(button);
//     }
// }


// * Event Listeners Load 
window.addEventListener("load", function () {
    isAuthorized();
    loadDataFromLocalStorage();
    // Top Product
    let topProduct=data.Products.reduce((max, product) => {
        return product.NumOfSales > max.NumOfSales ? product : max;
    }, data.Products[0]);
    console.log(topProduct.Name);
    const inTopProduct =document.getElementById("TopProduct");
    inTopProduct.innerText=topProduct.Name;

    // Top Category
    
        // let CategoryData = new Array(8).fill(0);
        // data.Orders.forEach(x => {
        //     // Check if the order's status is not "Canceled"
        //    if (x.Status !== "Canceled") {
        //       x.Items.forEach(i=>{
        //         i.CategoryID
        //       })
        //    }
        // });
        // console.log(CategoryData);


    // Top Selling Seller
    let topSeller=data.Users.filter(u=>u.Role=="Seller").reduce((max, user) => {
        return user.TotalSales > max.TotalSales ? user : max;
    }, data.Users.filter(u=>u.Role=="Seller")[0]);
    console.log(topSeller)
    const inTopSeller =document.getElementById("TopSeller");
    inTopSeller.innerText=topSeller.Name;

    // Top Year
    let Year=new Set();
    data.Orders.forEach(o=>{
        Year.add(new Date(o.CreatedAt).getFullYear())
    })
    console.log(Year);
  
    console.log(Year);
    let SumYears=new Array(Year.size).fill(0);
    Year=Array.from(Year);
    console.log(SumYears);
    data.Orders.forEach(x => {
        // Check if the order's status is not "Canceled"
       if (x.Status !== "Canceled") {
          // * new Date(x.CreatedAt).getMonth() Will return The number of month Of Order   
          SumYears[Year.indexOf(new Date(x.CreatedAt).getFullYear())] += x.TotalAmount;
       }
    });
    let topYear=SumYears.reduce((max, year) => {
        return year >max ? year : max;
    }, SumYears[0]);
    const inTopYear =document.getElementById("TopYear");
    inTopYear.innerText=Year[(SumYears.indexOf(topYear))]

    // Top Month 

    let Month=new Set();
    data.Orders.forEach(o=>{
        Month.add(new Date(o.CreatedAt).getMonth())
    })
    console.log(Month);
  
    console.log(Year);
    let SumMonth=new Array(Month.size).fill(0);
    Month=Array.from(Month);
    console.log(SumMonth);
    data.Orders.forEach(x => {
        // Check if the order's status is not "Canceled"
       if (x.Status !== "Canceled") {
          // * new Date(x.CreatedAt).getMonth() Will return The number of month Of Order   
          SumMonth[Month.indexOf(new Date(x.CreatedAt).getMonth())] += x.TotalAmount;
       }
    });
    let topMonth=SumMonth.reduce((max, year) => {
        return year >max ? year : max;
    }, SumMonth[0]);
    const inTopMonth =document.getElementById("TopMonth");
    //* Added 1 Cuz GetMonth Function Start From Jan->0 and so on ...
    inTopMonth.innerText=Month[(SumMonth.indexOf(topMonth))]+1;

 // Top Day
let DaySalesArr = new Array(31).fill(0);
data.Orders.forEach(x => {
    // Check if the order's status is not "Canceled"
   if (x.Status !== "Canceled") {
      // * new Date(x.CreatedAt).getMonth() Will return The number of month Of Order
      DaySalesArr[new Date(x.CreatedAt).getDate()] += x.TotalAmount;
   }
});
    let topDay=DaySalesArr.reduce((max, day) => {
        return day >max ? day : max;
    }, DaySalesArr[0]);
        const inTopDay =document.getElementById("TopDay");
        inTopDay.innerText=(DaySalesArr.indexOf(topDay));






        
    







    // * Altering Cards Dynamically 
    changeCard();





});// * end of load


//! ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////




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
