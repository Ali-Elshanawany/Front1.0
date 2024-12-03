// // function Employee(_id, _name, _address, _position) {
// //     //Public
// //     this.name = _name;
// //     this.id = _id;
// //     this.position = _position;
// //     this.address = _address;
// // }
// // /*
// // var p1 = new Employee(1, 'Ali', 'tanta', '.Net');
// // var p2 = new Employee(2, 'Yousef', 'Cairo', 'Bi');
// // var p3 = new Employee(3, 'Ahmed', 'Alex', 'FullStack');
// // var data=[p1,p2,p3];

// // // localStorage.setItem(
// // //     'Emps2',JSON.stringify(data));
// // // */


// // // // Create employee instances
// // // var employees = [
// // //     new Employee(1, 'Ali', 'Tanta', '.Net'),
// // //     new Employee(2, 'Yousef', 'Cairo', 'Java'),
// // //     new Employee(3, 'Ahmed', 'Giza', 'Python'),
// // //     new Employee(4, 'Sarah', 'Alexandria', 'Data Science'),
// // //     new Employee(5, 'Omar', 'Mansoura', 'Full Stack'),
// // //     new Employee(6, 'Laila', 'Aswan', 'Backend'),
// // //     new Employee(7, 'Hassan', 'Zagazig', 'Frontend'),
// // //     new Employee(8, 'Mona', 'Suez', 'DevOps'),
// // //     new Employee(9, 'Samir', 'Port Said', 'Mobile Dev'),
// // //     new Employee(10, 'Amira', 'Luxor', 'AI'),
// // //     new Employee(11, 'Khaled', 'Ismailia', 'Cybersecurity'),
// // //     new Employee(12, 'Nadia', 'Sharm El Sheikh', 'JavaScript'),
// // //     new Employee(13, 'Rania', 'Fayoum', 'Project Management'),
// // //     new Employee(14, 'Tamer', 'Minya', 'UI/UX'),
// // //     new Employee(15, 'Hoda', 'Beni Suef', 'Database Admin'),
// // //     new Employee(16, 'Wael', 'Qena', 'PHP'),
// // //     new Employee(17, 'Reham', 'Hurghada', 'Business Analyst'),
// // //     new Employee(18, 'Said', 'Damietta', 'IT Support'),
// // //     new Employee(19, 'Salma', 'Asyut', 'Data Engineer'),
// // //     new Employee(20, 'Mostafa', '6th of October', 'Machine Learning')
// // // ];

// // // // Save employees array to localStorage
// // // localStorage.setItem('Emps2', JSON.stringify(employees));







// // /// Table Selection

// // var table = document.getElementsByTagName("table")[0];
// // var alldata = JSON.parse(localStorage.getItem("Emps2"));
// // localStorage.setItem("SearchedEmps2", JSON.stringify(""));

// // function DisplayTable(alldata) {
// //     trs = document.querySelectorAll("tr[class]");
// //     for (var child of trs) {
// //         table.removeChild(child);
// //     }
// //     if (!alldata) {
// //         console.log("Empty");
// //     } else {
// //         console.log("Entered");
// //         //console.log(alldata);
// //         i = 0;
// //         for (var data of alldata) {
// //             // Creating Tr
// //             var tr = document.createElement("tr");
// //             tr.setAttribute("class", i);
// //             //tr.style.display = "none";
// //             // Creating Tds
// //             var idTd = document.createElement("td");
// //             var nameTd = document.createElement("td");
// //             var addressTd = document.createElement("td");
// //             var positionTd = document.createElement("td");
// //             var DeleteTd = document.createElement("td");
// //             DeleteTd.setAttribute("class", i);
// //             // Setting Tds
// //             idTd.innerText = data.id;
// //             nameTd.innerText = data.name;
// //             addressTd.innerText = data.address;
// //             positionTd.innerText = data.position;
// //             DeleteTd.innerText = "❌";
// //             // Appending To Tr
// //             tr.appendChild(idTd);
// //             tr.appendChild(nameTd);
// //             tr.appendChild(addressTd);
// //             tr.appendChild(positionTd);
// //             tr.appendChild(DeleteTd);
// //             table.appendChild(tr);
// //             i++;
// //         }
// //     }
// // }
// // DisplayTable(alldata);

// // function DisplayData(count) {
// //     trs = document.querySelectorAll("tr[class]");
// //     for (var i = 0; i < trs.length; i++) {
// //         if (+trs[i].className < count) {
// //             //trs[i].style.display = "block";
// //             trs[i].style.visibility = "visible";
// //         } else {
// //             trs[i].style.visibility = "hidden";
// //             //trs[i].style.display = "none";
// //         }
// //     }
// // }

// // window.addEventListener("load", function (e) {

// //     rev = localStorage.getItem("Emps2");
// //     rev = JSON.parse(rev);
// //     DisplayTable(rev);
// //     DisplayData(10);

// //     //
// //     var SearchData = [];
// //     var counter = document.querySelector('input[type="number"]');
// //     search = document.querySelector('input[type="text"]');
// //     var Id = document.getElementById("id");
// //     trs = document.querySelectorAll("tr[class]");
// //     Firsttr = document.querySelectorAll("tr")[0];
// //     searchdata = localStorage.getItem("SearchedEmps2");
// //     searchdata = JSON.parse(searchdata);

// //     // Selecting Table
// //     var table = document.getElementsByTagName("table")[0];
// //     table.addEventListener("click", function (e) {
// //         if (e.target.className) {
// //             var tr = document.getElementsByClassName(e.target.className)[0];
// //             var idxToRemove=+(e.target.className);
// //             console.log(tr);
// //             table.removeChild(tr);

// //             rev.splice(idxToRemove,1);
// //             console.log(rev);
// //             console.log(rev.length);

// //             localStorage.setItem('Emps2',JSON.stringify(rev));
            
// //                 rev=JSON.parse(localStorage.getItem("Emps2"));
// //                 console.log(rev);
// //                 DisplayTable(rev);
// //                 DisplayData(counter.value);
// //         }
// //     });

// //     counter.addEventListener("change", function (e) {
// //         DisplayData(e.target.value);
// //     });

// //     // Search
// //     search.addEventListener("keyup", function (e) {
// //         localStorage.removeItem("SearchedEmps2");
// //         SearchData = [];

// //         var pattern = new RegExp(search.value.trim(), "gi");
// //         for (var item of rev) {
// //             if (pattern.test(item.name)|| pattern.test(item.address) || pattern.test(item.position) ) {
// //                 SearchData.push(item);
// //                 localStorage.setItem("SearchedEmps2", JSON.stringify(SearchData));
// //             }
// //         }
// //         searchdata = localStorage.getItem("SearchedEmps2");
// //         searchdata = JSON.parse(searchdata);

// //         DisplayTable(searchdata);
// //         DisplayData(counter.value);
// //     }); // End of Search

// //     // Asc Sorting
// //     Firsttr.addEventListener("click", function (e) {
// //         prop = e.target.id;
// //         res = function (p) { 
// //             return function (a, b) {
// //                 var result = a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
// //                 return result;
// //             };
// //         };
// //         SortedData = rev.sort(res(e.target.id));
// //         DisplayTable(SortedData);
// //         DisplayData(counter.value);
// //     }); // End of Asc Sorting

// //     // Desc Sorting
// //     Firsttr.addEventListener("dblclick", function (e) {
// //         prop = e.target.id;
// //         res = function (p) {
// //             return function (a, b) {
// //                 var result = a[p] > b[p] ? -1 : a[p] < b[p] ? 1 : 0;
// //                 return result;
// //             };
// //         };
// //         SortedData = rev.sort(res(prop));
// //         DisplayTable(SortedData);
// //         DisplayData(counter.value);
// //     }); // End of Desc Sorting
// // }); //End win load

// // // Sorting Test

// // function dynamicSort(property) {
// //     return function (a, b) {
// //         var result =
// //             a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
// //         return result;
// //     };
// // }

// // function InsertData(){
// //    // Create employee instances
// // var employees = [
// //     new Employee(1, 'Ali', 'Tanta', '.Net'),
// //     new Employee(2, 'Yousef', 'Cairo', 'Java'),
// //     new Employee(3, 'Ahmed', 'Giza', 'Python'),
// //     new Employee(4, 'Sarah', 'Alexandria', 'Data Science'),
// //     new Employee(5, 'Omar', 'Mansoura', 'Full Stack'),
// //     new Employee(6, 'Laila', 'Aswan', 'Backend'),
// //     new Employee(7, 'Hassan', 'Zagazig', 'Frontend'),
// //     new Employee(8, 'Mona', 'Suez', 'DevOps'),
// //     new Employee(9, 'Samir', 'Port Said', 'Mobile Dev'),
// //     new Employee(10, 'Amira', 'Luxor', 'AI'),
// //     new Employee(11, 'Khaled', 'Ismailia', 'Cybersecurity'),
// //     new Employee(12, 'Nadia', 'Sharm El Sheikh', 'JavaScript'),
// //     new Employee(13, 'Rania', 'Fayoum', 'Project Management'),
// //     new Employee(14, 'Tamer', 'Minya', 'UI/UX'),
// //     new Employee(15, 'Hoda', 'Beni Suef', 'Database Admin'),
// //     new Employee(16, 'Wael', 'Qena', 'PHP'),
// //     new Employee(17, 'Reham', 'Hurghada', 'Business Analyst'),
// //     new Employee(18, 'Said', 'Damietta', 'IT Support'),
// //     new Employee(19, 'Salma', 'Asyut', 'Data Engineer'),
// //     new Employee(20, 'Mostafa', '6th of October', 'Machine Learning')
// // ];

// // // Save employees array to localStorage
// // localStorage.setItem('Emps2', JSON.stringify(employees));

// // }


// ///// Valid 2

// // Employee Constructor
// function Employee(_id, _name, _address, _position) {
//     this.id = _id;
//     this.name = _name;
//     this.address = _address;
//     this.position = _position;
// }

// // Function to Initialize Employee Data
// function initializeData() {
//     const employees = [
//         new Employee(1, 'Ali', 'Tanta', '.Net'),
//         new Employee(2, 'Yousef', 'Cairo', 'Java'),
//         new Employee(3, 'Ahmed', 'Giza', 'Python'),
//         new Employee(4, 'Sarah', 'Alexandria', 'Data Science'),
//         new Employee(5, 'Omar', 'Mansoura', 'Full Stack'),
//         new Employee(6, 'Laila', 'Aswan', 'Backend'),
//         new Employee(7, 'Hassan', 'Zagazig', 'Frontend'),
//         new Employee(8, 'Mona', 'Suez', 'DevOps'),
//         new Employee(9, 'Samir', 'Port Said', 'Mobile Dev'),
//         new Employee(10, 'Amira', 'Luxor', 'AI'),
//         new Employee(11, 'Khaled', 'Ismailia', 'Cybersecurity'),
//         new Employee(12, 'Nadia', 'Sharm El Sheikh', 'JavaScript'),
//         new Employee(13, 'Rania', 'Fayoum', 'Project Management'),
//         new Employee(14, 'Tamer', 'Minya', 'UI/UX'),
//         new Employee(15, 'Hoda', 'Beni Suef', 'Database Admin'),
//         new Employee(16, 'Wael', 'Qena', 'PHP'),
//         new Employee(17, 'Reham', 'Hurghada', 'Business Analyst'),
//         new Employee(18, 'Said', 'Damietta', 'IT Support'),
//         new Employee(19, 'Salma', 'Asyut', 'Data Engineer'),
//         new Employee(20, 'Mostafa', '6th of October', 'Machine Learning'),
//     ];

//     localStorage.setItem('Emps2', JSON.stringify(employees));
// }

// // Function to Display the Employee Table
// function displayTable(employees) {
//     const table = document.getElementsByTagName("table")[0];

//     // Clear Previous Rows
//     document.querySelectorAll("tr[class]").forEach(row => row.remove());

//     if (!employees || employees.length === 0) {
//         console.log("No data available to display.");
//         return;
//     }

//     employees.forEach((employee, index) => {
//         const tr = document.createElement("tr");
//         tr.setAttribute("class", index);

//         tr.innerHTML = `
//             <td>${employee.id}</td>
//             <td>${employee.name}</td>
//             <td>${employee.address}</td>
//             <td>${employee.position}</td>
//             <td class="${index}">❌</td>
//         `;

//         table.appendChild(tr);
//     });
// }

// // Function to Show Limited Rows
// function displayData(limit) {
//     document.querySelectorAll("tr[class]").forEach((row, index) => {
//         row.style.display = index < limit ? "block" : "none";
//     });
// }

// // Event Listeners
// window.addEventListener("load", function () {
//     let employees = JSON.parse(localStorage.getItem("Emps2")) || [];
//     displayTable(employees);
//     displayData(10);

//     const searchInput = document.querySelector('input[type="text"]');
//     const counterInput = document.querySelector('input[type="number"]');
//     const table = document.getElementsByTagName("table")[0];
//     const headerRow = document.querySelector("tr");

//     // Delete Employee Row
//     table.addEventListener("click", function (event) {
//         if (event.target.tagName === "TD" && event.target.textContent === "❌") {
//             const index = +event.target.className;
//             employees.splice(index, 1);
//             localStorage.setItem("Emps2", JSON.stringify(employees));
//             displayTable(employees);
//             displayData(counterInput.value);
//         }
//     });

//     // Filter by Count
//     counterInput.addEventListener("change", function () {
//         displayData(this.value);
//     });

//     // Search Employees
//     searchInput.addEventListener("keyup", function () {
//         const searchTerm = this.value.trim().toLowerCase();
//         const filteredEmployees = employees.filter(emp =>
//             emp.name.toLowerCase().includes(searchTerm) ||
//             emp.address.toLowerCase().includes(searchTerm) ||
//             emp.position.toLowerCase().includes(searchTerm)
//         );

//         displayTable(filteredEmployees);
//         displayData(counterInput.value);
//     });

//     // Sorting
//     headerRow.addEventListener("click", function (event) {
//         const prop = event.target.id;

//         if (prop) {
//             employees.sort((a, b) => a[prop] > b[prop] ? 1 : -1);
//             displayTable(employees);
//             displayData(counterInput.value);
//         }
//     });

//     headerRow.addEventListener("dblclick", function (event) {
//         const prop = event.target.id;

//         if (prop) {
//             employees.sort((a, b) => a[prop] < b[prop] ? 1 : -1);
//             displayTable(employees);
//             displayData(counterInput.value);
//         }
//     });
// });

// // Initialize Employee Data if Not Present
// if (!localStorage.getItem("Emps2")) {
//     initializeData();
// }


// End of Valid 2


// Employee Constructor
// Employee Constructor
function Employee(_id, _name, _address, _position) {
    this.id = _id;
    this.name = _name;
    this.address = _address;
    this.position = _position;
}

// Function to Initialize Employee Data
function initializeData() {
    console.log("d");
    const employees = [
        new Employee(1, 'Ali', 'Tanta', '.Net'),
        new Employee(2, 'Yousef', 'Cairo', 'Java'),
        new Employee(3, 'Ahmed', 'Giza', 'Python'),
        new Employee(4, 'Sarah', 'Alexandria', 'Data Science'),
        new Employee(5, 'Omar', 'Mansoura', 'Full Stack'),
        new Employee(6, 'Laila', 'Aswan', 'Backend'),
        new Employee(7, 'Hassan', 'Zagazig', 'Frontend'),
        new Employee(8, 'Mona', 'Suez', 'DevOps'),
        new Employee(9, 'Samir', 'Port Said', 'Mobile Dev'),
        new Employee(10, 'Amira', 'Luxor', 'AI'),
        new Employee(11, 'Khaled', 'Ismailia', 'Cybersecurity'),
        new Employee(12, 'Nadia', 'Sharm El Sheikh', 'JavaScript'),
        new Employee(13, 'Rania', 'Fayoum', 'Project Management'),
        new Employee(14, 'Tamer', 'Minya', 'UI/UX'),
        new Employee(15, 'Hoda', 'Beni Suef', 'Database Admin'),
        new Employee(16, 'Wael', 'Qena', 'PHP'),
        new Employee(17, 'Reham', 'Hurghada', 'Business Analyst'),
        new Employee(18, 'Said', 'Damietta', 'IT Support'),
        new Employee(19, 'Salma', 'Asyut', 'Data Engineer'),
        new Employee(20, 'Mostafa', '6th of October', 'Machine Learning'),
    ];

    localStorage.setItem('Emps2', JSON.stringify(employees));
}

// Function to Display the Employee Table
function displayTable(employees, currentPage = 1, rowsPerPage = 5) {
    const table = document.getElementsByTagName("table")[0];
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; // Clear previous rows

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedEmployees = employees.slice(start, end);
    const tr = document.createElement("tr");
tr.innerHTML =`
    <tr class="header">
    <th id="id"> Id</th>
    <th id="name"> Name</th>
    <th id="address"> Address</th>
    <th id="position"> Position</th>
    <th id="Delete"> Delete</th>
    <th id="Update"> Update</th>
    </tr>   
`;
tbody.appendChild(tr);
// Add Asc Sorting Event
tr.addEventListener("click", function (event) {
    const prop = event.target.id;
    if (prop) {
        employees.sort((a, b) => a[prop] > b[prop] ? 1 : -1);
        displayTable(employees, currentPage, rowsPerPage);
    }
});
// Add Desc Sorting Event
tr.addEventListener("dblclick", function (event) {
    const prop = event.target.id;

    if (prop) {
        employees.sort((a, b) => a[prop] < b[prop] ? 1 : -1);
        displayTable(employees, currentPage, rowsPerPage);
    }
});
    paginatedEmployees.forEach((employee, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.address}</td>
            <td>${employee.position}</td>
            <td class="delete-btn" ><button id="Del" type="button"  data-index="${start + index}" class="btn btn-danger">Remove</button></td>
            <td class="Update-btn" ><button id="Update" type="button"  data-index="${start + index}" class="btn btn-info">Update</button></td>
            `;
        tbody.appendChild(tr);
    });

    setupPagination(employees, rowsPerPage, currentPage);
}

// Function to Set Up Pagination
function setupPagination(employees, rowsPerPage, currentPage) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; // Clear previous pagination

    const totalPages = Math.ceil(employees.length / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = "btn btn-info m-1";
        if (i === currentPage) button.className=("btn btn-dark");

        button.addEventListener("click", () => {
            displayTable(employees, i, rowsPerPage);
        });

        pagination.appendChild(button);
    }
}

// Event Listeners
window.addEventListener("load", function () {
    let employees = JSON.parse(localStorage.getItem("Emps2")) || [];
    let rowsPerPage = 10; // Default rows per page
    let currentPage = 1;

    const counterInput = document.querySelector('input[type="number"]');
    const searchInput = document.querySelector('input[type="text"]');
    const table = document.getElementsByTagName("table")[0];
    const headerRow = document.getElementsByTagName("tr")[0];

    displayTable(employees, currentPage, rowsPerPage);

    // Update Rows Per Page Based on Counter Input
    counterInput.addEventListener("change", function () {
        rowsPerPage = parseInt(this.value, 10) || 5; 
        currentPage = 1; // Reset to the first page
        displayTable(employees, currentPage, rowsPerPage);
    });

    // Delete Employee Row
    table.addEventListener("click", function (event) {
        console.log(event.target.id);
        if (event.target.id=="Del") {
            const index = +event.target.dataset.index;
            console.log(index);
            employees.splice(index, 1);
            localStorage.setItem("Emps2", JSON.stringify(employees));
            displayTable(employees, currentPage, rowsPerPage);
        }
    });

    // Search Employees
    searchInput.addEventListener("keyup", function () {
        const searchTerm = this.value.trim().toLowerCase();
        const filteredEmployees = employees.filter(emp =>
            emp.name.toLowerCase().includes(searchTerm) ||
            emp.address.toLowerCase().includes(searchTerm) ||
            emp.position.toLowerCase().includes(searchTerm)||
            emp.id.toString().includes(searchTerm)
        );

        currentPage = 1; // Reset to the first page
        displayTable(filteredEmployees, currentPage, rowsPerPage);
    });


});// end of load



