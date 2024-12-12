export const data = {
    guestCart: [],
    CurrentUser:  {
        "_id": "user2",
        "Name": "Alice Seller",
        "Email": "seller@example.com",
        "Password": "ABCabc0123!@#",
        "Phone": "01011245011",
        "City": "cairo",
        "Street": "bla bla blaablaa ",
        "Role": "Seller",
        "CreatedAt": "2024-11-27T12:35:00Z",
        "TotalSales": 99999
    },
    Users: [
        {
            "_id": "user2",
            "Name": "Alice Seller",
            "Email": "seller@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01011245011",
            "City": "cairo",
            "Street": "bla bla blaablaa ",
            "Role": "Seller",
            "CreatedAt": "2024-11-27T12:35:00Z",
            "TotalSales": 99999
        }, {
            "_id": "user1",
            "Name": "John Doe",
            "Email": "admin@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01211145011",
            "City": "cairo",
            "Street": "bla bla blaablaa ",
            "Role": "Admin",
            "CreatedAt": "2024-11-27T12:34:56Z"
        }, {
            "_id": "user3",
            "Name": "Bob Buyer",
            "Email": "buyer@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01511145011",
            "City": "cairo",
            "Street": "bla bla blaablaa ",
            "Role": "User",
            "CreatedAt": "2024-11-27T12:36:00Z"
        },

        {
            "_id": "user4",
            "Name": "Emma Smith",
            "Email": "emma.smith@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01022334455",
            "City": "cairo",
            "Street": "123 Elm Street",
            "Role": "Seller",
            "CreatedAt": "2024-11-28T08:00:00Z",
            "TotalSales": 75000
        },
        {
            "_id": "user5",
            "Name": "Liam Johnson",
            "Email": "liam.johnson@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01233445566",
            "City": "alexandria",
            "Street": "456 Oak Avenue",
            "Role": "Admin",
            "CreatedAt": "2024-11-28T08:15:00Z"
        },
        {
            "_id": "user6",
            "Name": "Sophia Williams",
            "Email": "sophia.williams@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01122334455",
            "City": "giza",
            "Street": "789 Pine Lane",
            "Role": "User",
            "CreatedAt": "2024-11-28T08:30:00Z"
        },
        {
            "_id": "user7",
            "Name": "James Brown",
            "Email": "james.brown@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01222334455",
            "City": "cairo",
            "Street": "101 Maple Drive",
            "Role": "Seller",
            "CreatedAt": "2024-11-28T08:45:00Z",
            "TotalSales": 60000
        },
        {
            "_id": "user8",
            "Name": "Olivia Jones",
            "Email": "olivia.jones@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01033445566",
            "City": "sharm el-sheikh",
            "Street": "202 Birch Way",
            "Role": "User",
            "CreatedAt": "2024-11-28T09:00:00Z"
        },
        {
            "_id": "user9",
            "Name": "Benjamin Garcia",
            "Email": "benjamin.garcia@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01522334455",
            "City": "cairo",
            "Street": "303 Cedar Lane",
            "Role": "Admin",
            "CreatedAt": "2024-11-28T09:15:00Z"
        },
        {
            "_id": "user10",
            "Name": "Charlotte Martinez",
            "Email": "charlotte.martinez@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01133445566",
            "City": "alexandria",
            "Street": "404 Dogwood Court",
            "Role": "Seller",
            "CreatedAt": "2024-11-28T09:30:00Z",
            "TotalSales": 85000
        },
        {
            "_id": "user11",
            "Name": "William Hernandez",
            "Email": "william.hernandez@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01144556677",
            "City": "cairo",
            "Street": "505 Spruce Street",
            "Role": "User",
            "CreatedAt": "2024-11-28T09:45:00Z"
        },
        {
            "_id": "user12",
            "Name": "Amelia Lopez",
            "Email": "amelia.lopez@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01055667788",
            "City": "luxor",
            "Street": "606 Willow Way",
            "Role": "Seller",
            "CreatedAt": "2024-11-28T10:00:00Z",
            "TotalSales": 70000
        },
        {
            "_id": "user13",
            "Name": "Michael Gonzalez",
            "Email": "michael.gonzalez@example.com",
            "Password": "ABCabc0123!@#",
            "Phone": "01266778899",
            "City": "cairo",
            "Street": "707 Cypress Lane",
            "Role": "Admin",
            "CreatedAt": "2024-11-28T10:15:00Z"
        }



    ],
    Categories: [
        { "_id": "Cat1", "Name": "Chairs", "Description": "Various types of chairs for different purposes." },
        { "_id": "Cat2", "Name": "Tables", "Description": "Dining, work, and coffee tables." },
        { "_id": "Cat3", "Name": "Beds", "Description": "Comfortable and stylish beds for your home." },
        { "_id": "Cat4", "Name": "Cabinets", "Description": "Storage solutions for every room." }
    ],
    Products: [
        {
            "_id": "prod1",
            "Name": "Wooden Chair",
            "Description": "A sturdy wooden chair for dining or work.",
            "Price": 59.99,
            "Stock": 50,
            "CategoryID": "Cat1",
            "SellerID": "user2",
            "Images": [
                "../assets/pic3.webp",
                "image2_url"
            ],
            "CreatedAt": "2024-11-27T12:37:00Z",
            "NumOfSales": 5,
            "Approved": false
        },
        {
            "_id": "prod2",
            "Name": "Glass Table",
            "Description": "A stylish glass-top table.",
            "Price": 120.0,
            "Stock": 20,
            "CategoryID": "Cat2",
            "SellerID": "user2",
            "Images": [
                "../assets/pic3.webp",
                "image4_url"
            ],
            "CreatedAt": "2024-11-27T12:38:00Z",
            "NumOfSales": 5,
            "Approved": false
        },
        {
            "_id": "prod3",
            "Name": "Wooden Chair",
            "Description": "A sturdy wooden chair for dining or work.",
            "Price": 59.99,
            "Stock": 50,
            "CategoryID": "Cat1",
            "SellerID": "user5",
            "Images": [
                "../assets/1.png",
                "image2_url"
            ],
            "CreatedAt": "2024-11-27T12:37:00Z",
            "NumOfSales": 5,
            "Approved": true
        }
    ],
    Orders: [
        {
            "_id": "A",
            "UserID": "user1",
            "Items": [
                {
                    "ProductID": "prod3",
                    "SellerId": "user7",
                    "Quantity": 2,
                    "Price": 59.99
                }, {
                    "ProductID": "prod3",
                    "SellerId": "user7",
                    "Quantity": 2,
                    "Price": 59.99
                }, {
                    "ProductID": "prod3",
                    "SellerId": "user7",
                    "Quantity": 2,
                    "Price": 59.99
                }
            ],
            "TotalAmount": 239.98,
            "Status": "Pending",
            "CreatedAt": "2024-11-27T12:40:00Z"
        },
        {
            "_id": "B",
            "UserID": "user3",
            "Items": [
                {
                    "ProductID": "prod1",
                    "SellerId": "user2",
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
                    "SellerId": "user2",
                    "Quantity": 1,
                    "Price": 120.0
                }
            ],
            "TotalAmount": 239.98,
            "Status": "Pending",
            "CreatedAt": "2024-11-27T12:40:00Z"
        },
        {
            "_id": "C",
            "UserID": "user3",
            "Items": [
                {
                    "ProductID": "prod1",
                    "SellerId": "user2",
                    "Quantity": 2,
                    "Price": 59.99
                }, {
                    "ProductID": "prod3",
                    "SellerId": "user7",
                    "Quantity": 2,
                    "Price": 59.99
                }, {
                    "ProductID": "prod3",
                    "SellerId": "user7",
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
                    "SellerId": "user2",
                    "Quantity": 1,
                    "Price": 120.0
                }
            ],
            "TotalAmount": 565.98,
            "Status": "Pending",
            "CreatedAt": "2024-01-27T12:40:00Z"
        },
        {
            "_id": "D",
            "UserID": "user3",
            "Items": [
                {
                    "ProductID": "prod1",
                    "SellerId": "user2",
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
                    "SellerId": "user2",
                    "Quantity": 1,
                    "Price": 120.0
                }
            ],
            "TotalAmount": 239.98,
            "Status": "Shipped",
            "CreatedAt": "2024-12-27T12:40:00Z"
        },
        {
            "_id": "E",
            "UserID": "user3",
            "Items": [
                {
                    "ProductID": "prod1",
                    "SellerId": "user2",
                    "Quantity": 2,
                    "Price": 75
                },
                {
                    "ProductID": "prod2",
                    "SellerId": "user2",
                    "Quantity": 1,
                    "Price": 120.0
                }
            ],
            "TotalAmount": 350,
            "Status": "Delivered",
            "CreatedAt": "2024-08-27T12:40:00Z"
        },
        {
            "_id": "Z",
            "UserID": "user3",
            "Items": [
                {
                    "ProductID": "prod1",
                    "SellerId": "user2",
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
                    "SellerId": "user2",
                    "Quantity": 1,
                    "Price": 120.0
                }
            ],
            "TotalAmount": 550,
            "Status": "Canceled",
            "CreatedAt": "2024-09-27T12:40:00Z"
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
            "UserID": "user8",
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

const AdminPages = ['AccountsDataTable.html', 'OrdersDataTable.html', 'home.page', 'Products&Orders.html'];
const UserPages = ['home.page'];
const SellerPages = ['home.page'];
const GuestPages = ['home.page', 'ProductDetails'];

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

// cart related

export function getProductById(id) {
    return data.Products.find((product) => product._id === id);
}

export function getCurrentCart() {
    return data.CurrentUser ? data.CurrentUser.cart : data.guestCart;
}

export function changeCartItemCount(id, quantity) {
    const cart = getCurrentCart();
    const index = cart.findIndex((item) => item._id === id);

    if (index === -1) {
        console.error(`Item with ID ${id} not found in cart.`);
        return;
    }

    cart[index].Quantity = quantity;

    if (!data.CurrentUser) {
        data.guestCart = cart;
    } else {
        data.CurrentUser.cart = cart;
        const userIndex = data.Users.findIndex(
            (user) => user._id === data.CurrentUser._id
        );
        data.Users[userIndex].cart = cart;
    }

    saveDataInLocalStorage();
}

export function DeleteFromCart(id) {
    const cart = getCurrentCart();
    const newCart = cart.filter((item) => item._id !== id);

    if (!data.CurrentUser) {
        data.guestCart = newCart;
    } else {
        data.CurrentUser.cart = newCart;
        const userIndex = data.Users.findIndex(
            (user) => user._id === data.CurrentUser._id
        );
        data.Users[userIndex].cart = newCart;
    }

    saveDataInLocalStorage();
}

///////////////////////////////////

export function addUser(User) {
    data.Users.push(User);
    saveDataInLocalStorage();
}

export function addProduct(product) {
    data.Products.push(product);
    saveDataInLocalStorage();
}

export function getUserById(id) {
    return data.Users.find((user) => user._id === id);
}
export function SetUserById(user) {
    data.Users.find((user) => user._id === id) = user;
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
export function getSellerSalesByMonth() {
    let monthlySalesArr = new Array(12).fill(0)
    data.Orders.forEach(x => {
        // * new Date(x.CreatedAt).getMonth() Will return The number of month Of Order
        x.Items.forEach(i => {
            if (i.SellerId == data.CurrentUser._id) {
                monthlySalesArr[new Date(x.CreatedAt).getMonth()] += (i.Price * i.Quantity)
            }
        })
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

    if (!data.CurrentUser) {
        console.log("Guest Customer");
        isAuthorized = checkAuthorization(GuestPages);
    } else {
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


// * Receive Items and Decrease Total Sales Of Seller Used When (Deleting-Canceling) Orders Or Deleting (Seller-User) Accounts 
export function decreaseTotalSales(items) {
    items.forEach(function (item) {
        data.Users.forEach(function (u) {
            if (u._id == item.SellerId)
                u.TotalSales -= (item.Quantity * item.Price);
        });
        saveDataInLocalStorage();
    });
}

// * Receive Items and Increase Stocks of the products 
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

// * Send Seller Id To Delete All of his Products This Happen When Deleting Seller Accounts
export function DeleteProducts(sellerId) {
    data.Products = data.Products.filter(product => product.SellerID !== sellerId);
    saveDataInLocalStorage();
}

// * Return The Products with Approve state = False 
export function PendingProducts() {
    loadDataFromLocalStorage()
    return data.Products = data.Products.filter(product => product.Approved == false);
}

//* Change Product Approval State to Approved (True) 
export function ApproveProducts(ProductId) {
    data.Products.find(p => p._id == ProductId).Approved = true;
    saveDataInLocalStorage()
}

// * View Products Specefic for Current Seller 
export function SellerProducts() {
    loadDataFromLocalStorage()
    return data.Products.filter(p => p.SellerID === data.CurrentUser._id);
}
export function SellerOrders() {
    loadDataFromLocalStorage()
    return data.Orders.filter(function (o) {
        return o.Items.some(function (i) {
            return i.SellerId == data.CurrentUser._id;
        });
    });
}

//* take order id and change status to Canceled
export function CancelOrder(orderId) {
    data.Orders.find(p => p._id == orderId).Status = "Canceled";
    saveDataInLocalStorage()
}

// * Get Specific Order 
export function GetOrder(orderId) {
    loadDataFromLocalStorage()
    return data.Orders.find(p => p._id == orderId)
}

export function DeleteSepecificproduct(productId) {
    data.Products = data.Products.filter(product => product._id !== productId);
    console.log(data.Products)
    saveDataInLocalStorage();
}


export function TotalSales() {
    loadDataFromLocalStorage()
    let totalSales = 0;
    data.Users.forEach(function (u) {
        if (u.Role == "Seller") {
            if (!isNaN(u.TotalSales) && typeof u.TotalSales === "number") {
                totalSales += u.TotalSales;
            }
        }
    })
    return totalSales.toFixed(2)
}
