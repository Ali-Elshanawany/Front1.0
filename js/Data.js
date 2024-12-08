export const data = {
    guestCart: [],
    CurrentUser:   {
        "_id": "user1",
        "Name": "John Doe",
        "Email": "admin@example.com",
        "Password": "hashed_password1",
        "Phone": "123456789",
        "City": "cairo",
        "Street": "bla bla blaablaa ",
        "Role": "Admin",
        "CreatedAt": "2024-11-27T12:34:56Z"
    },
    Users: [
        {
            "_id": "user1",
            "Name": "John Doe",
            "Email": "admin@example.com",
            "Password": "hashed_password1",
            "Phone": "123456789",
            "City": "cairo",
            "Street": "bla bla blaablaa ",
            "Role": "Admin",
            "CreatedAt": "2024-11-27T12:34:56Z"
        },
        {
            "_id": "user2",
            "Name": "Alice Seller",
            "Email": "seller@example.com",
            "Password": "hashed_password2",
            "Phone": "987654321",
            "City": "cairo",
            "Street": "bla bla blaablaa ",
            "Role": "Seller",
            "CreatedAt": "2024-11-27T12:35:00Z",
            "TotalSales":99999
        },
        {
            "_id": "user3",
            "Name": "Bob Buyer",
            "Email": "buyer@example.com",
            "Password": "hashed_password3",
            "Phone": "123987456",
            "City": "cairo",
            "Street": "bla bla blaablaa ",
            "Role": "User",
            "CreatedAt": "2024-11-27T12:36:00Z"
        }
    ],
    Categories: [
        {
            "_id": "cat1",
            "Name": "Chairs",
            "Description": "Seating furniture for all purposes."
        },
        {
            "_id": "cat2",
            "Name": "Tables",
            "Description": "Dining and work tables."
        }
    ],
    Products: [
        {
            "_id": "prod1",
            "Name": "Wooden Chair",
            "Description": "A sturdy wooden chair for dining or work.",
            "Price": 59.99,
            "Stock": 50,
            "CategoryID": "cat1",
            "SellerID": "user2",
            "Images": [
                "image1_url",
                "image2_url"
            ],
            "CreatedAt": "2024-11-27T12:37:00Z",
            "NumOfSales": 5,
            "Approved":true
        },
        {
            "_id": "prod2",
            "Name": "Glass Table",
            "Description": "A stylish glass-top table.",
            "Price": 120.0,
            "Stock": 20,
            "CategoryID": "cat2",
            "SellerID": "user2",
            "Images": [
                "image3_url",
                "image4_url"
            ],
            "CreatedAt": "2024-11-27T12:38:00Z",
            "NumOfSales": 5
        }
    ],
    Orders: [
        {
            "_id": "order33331",
            "UserID": "user1",
            "Items": [
                {
                    "ProductID": "prod1",
                    "SellerId":"user2",
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
                    "SellerId":"user2",
                    "Quantity": 1,
                    "Price": 120.0
                }
            ],
            "TotalAmount": 239.98,
            "Status": "Pending",
            "CreatedAt": "2024-11-27T12:40:00Z"
        },
        {
            "_id": "order1",
            "UserID": "user3",
            "Items": [
                {
                    "ProductID": "prod1",
                    "SellerId":"user2",
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
                    "SellerId":"user2",
                    "Quantity": 1,
                    "Price": 120.0
                }
            ],
            "TotalAmount": 239.98,
            "Status": "Pending",
            "CreatedAt": "2024-11-27T12:40:00Z"
        },
        {
            "_id": "order133",
            "UserID": "user3",
            "Items": [
                {
                    "ProductID": "prod1",
                    "SellerId":"user2",
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
                    "SellerId":"user2",
                    "Quantity": 1,
                    "Price": 120.0
                }
            ],
            "TotalAmount": 565.98,
            "Status": "Pending",
            "CreatedAt": "2024-01-27T12:40:00Z"
        },
        {
            "_id": "order1",
            "UserID": "user3",
            "Items": [
                {
                    "ProductID": "prod1",
                    "SellerId":"user2",
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
                    "SellerId":"user2",
                    "Quantity": 1,
                    "Price": 120.0
                }
            ],
            "TotalAmount": 239.98,
            "Status": "Shipped",
            "CreatedAt": "2024-12-27T12:40:00Z"
        },
        {
            "_id": "order1",
            "UserID": "user3",
            "Items": [
                {
                    "ProductID": "prod1",
                    "SellerId":"user2",
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
                    "SellerId":"user2",
                    "Quantity": 1,
                    "Price": 120.0
                }
            ],
            "TotalAmount": 239.98,
            "Status": "Processing",
            "CreatedAt": "2024-08-27T12:40:00Z"
        },
        {
            "_id": "order1",
            "UserID": "user3",
            "Items": [
                {
                    "ProductID": "prod1",
                    "SellerId":"user2",
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
                    "SellerId":"user2",
                    "Quantity": 1,
                    "Price": 120.0
                }
            ],
            "TotalAmount": 239.98,
            "Status": "Pending",
            "CreatedAt": "2024-09-27T12:40:00Z"
        }
    ],
    Cart: [
        {
            "_id": "cart1",
            "UserID": "user3",
            "Items": [
                {
                    "ProductID": "prod1",
                    "Quantity": 1
                },
                {
                    "ProductID": "prod2",
                    "Quantity": 2
                }
            ],
            "UpdatedAt": "2024-11-27T12:41:00Z"
        }
    ],
    Tickets: [
        {
            "_id": "review1",
            "UserID": "user3",
            "Comment": "A",
            "CreatedAt": "2024-11-27T12:42:00Z"
        },
        {
            "_id": "review2",
            "UserID": "user3",
            "Comment": "B",
            "CreatedAt": "2024-11-27T12:42:00Z"
        },
        {
            "_id": "review1",
            "UserID": "user3",
            "Comment": "Z",
            "CreatedAt": "2024-11-27T12:42:00Z"
        },
        {
            "_id": "review1",
            "UserID": "user3",
            "Comment": "Great quality, sturdy chair.",
            "CreatedAt": "2024-11-27T12:42:00Z"
        },
        {
            "_id": "review1",
            "UserID": "user3",
            "Comment": "Great quality, sturdy chair.",
            "CreatedAt": "2024-11-27T12:42:00Z"
        },
        {
            "_id": "review1",
            "UserID": "user3",
            "Comment": "Great quality, sturdy chair.",
            "CreatedAt": "2024-11-27T12:42:00Z"
        },
        {
            "_id": "review1",
            "UserID": "user3",
            "Comment": "Great quality, sturdy chair.",
            "CreatedAt": "2024-11-27T12:42:00Z"
        }
    ]
}

const AdminPages = ['AccountsDataTable.html', 'OrdersDataTable.html', 'home.page','Products&Orders.html'];
const UserPages = ['home.page'];
const SellerPages = ['home.page'];
const GuestPages = ['home.page','ProductDetails'];

// export default data;


export function loadDataFromLocalStorage() {
    console.log("Data LOADED:>> ");
    for (const key in data) {
        data[key] = JSON.parse(localStorage.getItem(key)) || data[key];
    }
}
export function saveDataInLocalStorage() {
    for (const key in data) {
        localStorage.setItem(key, JSON.stringify(data[key]));
    }
}
export function saveInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getCurrentUser() {
    return data.CurrentUser;
}
export function addUser(User) {
    data.Users.push(User);
    saveDataInLocalStorage();
}

export function getUserById(id) {
    return data.Users.find((user) => user._id === id);
}
export function SetUserById(user) {
    data.Users.find((user) => user._id === id)=user;
}

export function getUserByEmail(email) {
    return data.Users.find((user) => user.Email === email);
}

export function getUsers() {
    loadDataFromLocalStorage();
    return data.Users;
}
export function getOrders() {
    loadDataFromLocalStorage();
    return data.Orders;
}


// * Will Return array Containg Total Sales of Each Month 
// * This Will be the Input for the Graph in Admin Dashboard 
export function getSalesByMonth() {
    let monthlySalesArr = new Array(12).fill(0)
    data.Orders.forEach(x => {
        // * new Date(x.CreatedAt).getMonth() Will return The number of month Of Order
        monthlySalesArr[new Date(x.CreatedAt).getMonth()] += x.TotalAmount;
    });
    return monthlySalesArr;
}

export function isAuthorized() {
    console.log("Authorization Check Started");

    const host = window.location.origin;
    const webPage = location.href.split('/').pop().toLowerCase(); //* Get the current page
    let isAuthorized = false;

    // Define a reusable function to check authorization
    const checkAuthorization = (pages) => {
        return pages.some(page => page.toLowerCase() === webPage);
    };

    if(!data.CurrentUser){
        console.log("Guest Customer");
        isAuthorized = checkAuthorization(GuestPages);
    }else{
        switch (data.CurrentUser.Role) {
            case "Admin":
                console.log("Admin Authorized");
                isAuthorized = checkAuthorization(AdminPages);
                break;
            case "Seller":
                console.log("Seller Authorized");
                isAuthorized = checkAuthorization(SellerPages);
                break;
            case "User":
                console.log("User Authorized");
                isAuthorized = checkAuthorization(UserPages);
                break;
            case null:
                console.error("Guest Customer");
                isAuthorized = checkAuthorization(GuestPages);
                break;
        }

    }
    if (!isAuthorized) {
        console.log("Access Denied");
        window.location.replace(host + "/Front1.0/html/403.html");
    } else {
        console.log("Access Granted");
    }
}

export function DeleteUser(userId) {
    data.Users = data.Users.filter(user => user._id !== userId);
    console.log(data.Users)
    saveDataInLocalStorage();
}
export function DeleteUserByEmail(email) {
    data.Users = data.Users.filter(user => user.Email !== email);
    console.log(data.Users)
    saveDataInLocalStorage();
}

export function decreaseTotalSales(items) {
    items.forEach(function (item) {
        data.Users.forEach(function (u) {
            if (u._id == item.SellerId)
                u.TotalSales -= (item.Quantity * item.Price);
        });
        saveDataInLocalStorage();
    });
}

export function increaseStock(items) {
    items.forEach(function (item) {
        data.Products.forEach(function (p) {
            if (p._id == item.ProductID)
                p.Stock += item.Quantity;
        });

        saveDataInLocalStorage();
    });
}

//* used when deleting a user 
export function DeleteOrders(userId) {
    data.Orders = data.Orders.filter(order => order.UserID !== userId);
    saveDataInLocalStorage();
}
export function DeleteProducts(sellerId) {
    data.Products = data.Products.filter(product => product.SellerID !== sellerId);
    saveDataInLocalStorage();
}