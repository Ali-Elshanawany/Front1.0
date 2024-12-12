export const data = {
    guestCart: [],
    CurrentUser:  {
        "_id": "user1734031165922",
        "Name": "Seller1",
        "Email": "Seller1@Seller.com",
        "Phone": "01011145011",
        "City": "dakahlia",
        "Street": "second street ",
        "Password": "asdASD123!@3",
        "Role": "Seller",
        "CreatedAt": "2024-12-12T19:19:25.922Z",
        "TotalSales": 1500
    },
    Users: [
        {
            "_id": "user1734030945450",
            "Name": "Admin1",
            "Email": "Admin1@Admin.com",
            "Phone": "01011145011",
            "City": "cairo",
            "Street": "Tanta",
            "Password": "asdASD123!@3",
            "Role": "Admin",
            "CreatedAt": "2024-12-12T19:15:45.450Z"
        },
        {
            "_id": "user1734030970403",
            "Name": "Admin2",
            "Email": "Admin2@Admin.com",
            "Phone": "01011145011",
            "City": "gharbia",
            "Street": "al-ashraf",
            "Password": "asdASD123!@3",
            "Role": "Admin",
            "CreatedAt": "2024-12-12T19:16:10.403Z"
        },
        {
            "_id": "user1734031105369",
            "Name": "Admin3",
            "Email": "Admin3@Admin.com",
            "Phone": "01011145011",
            "City": "alexandria",
            "Street": "miami",
            "Password": "asdASD123!@3",
            "Role": "Admin",
            "CreatedAt": "2024-12-12T19:18:25.369Z"
        },
        {
            "_id": "user1734031165922",
            "Name": "Seller1",
            "Email": "Seller1@Seller.com",
            "Phone": "01011145011",
            "City": "dakahlia",
            "Street": "second street ",
            "Password": "asdASD123!@3",
            "Role": "Seller",
            "CreatedAt": "2024-12-12T19:19:25.922Z",
            "TotalSales": 1500
        },
        {
            "_id": "user1734031188592",
            "Name": "Seller2",
            "Email": "Seller2@Seller.com",
            "Phone": "01111145011",
            "City": "fayoum",
            "Street": "fa street ",
            "Password": "asdASD123!@3",
            "Role": "Seller",
            "CreatedAt": "2024-12-12T19:19:48.592Z",
            "TotalSales": 5000
        },
        {
            "_id": "user1734031222895",
            "Name": "Seller3",
            "Email": "Seller3@Seller.com",
            "Phone": "01211145011",
            "City": "gharbia",
            "Street": "El-Helw",
            "Password": "asdASD123!@3",
            "Role": "Seller",
            "CreatedAt": "2024-12-12T19:20:22.896Z",
            "TotalSales": 9600
        },
        {
            "_id": "user1734031261613",
            "Name": "User1",
            "Email": "User1@User.com",
            "Phone": "01211145011",
            "City": "red_sea",
            "Street": "main street",
            "Password": "asdASD123!@3",
            "Role": "User",
            "CreatedAt": "2024-12-12T19:21:01.613Z",
            "cart": []
        },
        {
            "_id": "user1734031285140",
            "Name": "User2",
            "Email": "User2@User.com",
            "Phone": "01211145011",
            "City": "minya",
            "Street": "Omar",
            "Password": "asdASD123!@3",
            "Role": "User",
            "CreatedAt": "2024-12-12T19:21:25.140Z",
            "cart": []
        },
        {
            "_id": "user1734031302175",
            "Name": "User3",
            "Email": "User3@User.com",
            "Phone": "01211145011",
            "City": "sharqia",
            "Street": "bahr",
            "Password": "asdASD123!@3",
            "Role": "User",
            "CreatedAt": "2024-12-12T19:21:42.175Z",
            "cart": []
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
            "_id": "Product1734031752664",
            "Name": "Product 1",
            "Description": "This is a brief description for Product 1",
            "Price": "100",
            "Stock": "20",
            "SellerID": "user1734031165922",
            "CategoryID": "Cat1",
            "Images": [
                "../assets/1.png",
                "../assets/2.png"
            ],
            "CreatedAt": "2024-12-12T19:29:12.664Z",
            "NumOfSales": 15,
            "Approved": true
        },
        {
            "_id": "Product1734031767767",
            "Name": "Product 2",
            "Description": "This is a brief description for Product 2",
            "Price": "200",
            "Stock": "30",
            "SellerID": "user1734031165922",
            "CategoryID": "Cat1",
            "Images": [
                "../assets/1.png",
                "../assets/2.png"
            ],
            "CreatedAt": "2024-12-12T19:29:27.767Z",
            "NumOfSales": 12,
            "Approved": true
        },
        {
            "_id": "Product1734031783865",
            "Name": "Product 3",
            "Description": "This is a brief description for Product 3",
            "Price": "250",
            "Stock": "35",
            "SellerID": "user1734031165922",
            "CategoryID": "Cat2",
            "Images": [
                "../assets/1.png",
                "../assets/2.png"
            ],
            "CreatedAt": "2024-12-12T19:29:43.865Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734031796361",
            "Name": "Product 4",
            "Description": "This is a brief description for Product 4",
            "Price": "50",
            "Stock": "50",
            "SellerID": "user1734031222895",
            "CategoryID": "Cat2",
            "Images": [
                "../assets/1.png",
                "../assets/2.png"
            ],
            "CreatedAt": "2024-12-12T19:29:56.361Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734031815018",
            "Name": "Product 5",
            "Description": "This is a brief description for Product 5",
            "Price": "640",
            "Stock": "10",
            "SellerID": "user1734031222895",
            "CategoryID": "Cat3",
            "Images": [
                "../assets/1.png",
                "../assets/2.png"
            ],
            "CreatedAt": "2024-12-12T19:30:15.018Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734031829750",
            "Name": "Product 6",
            "Description": "This is a brief description for Product 6",
            "Price": "430",
            "Stock": "30",
            "SellerID": "user1734031222895",
            "CategoryID": "Cat3",
            "Images": [
                "../assets/1.png",
                "../assets/2.png"
            ],
            "CreatedAt": "2024-12-12T19:30:29.750Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734031842546",
            "Name": "Product 7",
            "Description": "This is a brief description for Product 7",
            "Price": "220",
            "Stock": "35",
            "SellerID": "user1734031222895",
            "CategoryID": "Cat3",
            "Images": [
                "../assets/1.png",
                "../assets/2.png"
            ],
            "CreatedAt": "2024-12-12T19:30:42.546Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product1734031860699",
            "Name": "Product 8",
            "Description": "This is a brief description for Product 8",
            "Price": "360",
            "Stock": "45",
            "SellerID": "user1734031222895",
            "CategoryID": "Cat4",
            "Images": [
                "../assets/1.png",
                "../assets/2.png"
            ],
            "CreatedAt": "2024-12-12T19:31:00.699Z",
            "NumOfSales": 0,
            "Approved": true
        }
    ],
    Orders:[
        {
            "_id": "A",
            "UserID": "user1734031261613",
            "Items": [
                {
                    "ProductID": "Product1734031752664",
                    "SellerId": "user1734031165922",
                    "Quantity": 2,
                    "Price": 100
                },
                {
                    "ProductID": "Product1734031767767",
                    "SellerId": "user1734031165922",
                    "Quantity": 2,
                    "Price": 200
                }
            ],
            "TotalAmount": 600,
            "Status": "Pending",
            "CreatedAt": "2024-11-27T12:40:00Z"
        }
        ,{
            "_id": "B",
            "UserID": "user1734031285140",
            "Items": [
                {
                    "ProductID": "Product1734031752664",
                    "SellerId": "user1734031165922",
                    "Quantity": 2,
                    "Price": 100
                },
                {
                    "ProductID": "Product1734031767767",
                    "SellerId": "user1734031165922",
                    "Quantity": 2,
                    "Price": 200
                }
            ],
            "TotalAmount": 600,
            "Status": "Pending",
            "CreatedAt": "2024-11-27T12:40:00Z"
        },
        {
            "_id": "c",
            "UserID": "user1734031261613",
            "Items": [
                {
                    "ProductID": "Product1734031860699",
                    "SellerId": "user1734031222895",
                    "Quantity": 1,
                    "Price": 360
                }
            ],
            "TotalAmount": 360,
            "Status": "Pending",
            "CreatedAt": "2024-11-27T12:40:00Z"
        }
        ,{
            "_id": "d",
            "UserID": "user1734031285140",
            "Items": [
                {
                    "ProductID": "Product1734031860699",
                    "SellerId": "user1734031222895",
                    "Quantity": 1,
                    "Price": 360
                },
                {
                    "ProductID": "Product1734031842546",
                    "SellerId": "user1734031222895",
                    "Quantity": 2,
                    "Price": 220
                }
            ],
            "TotalAmount": 800,
            "Status": "Pending",
            "CreatedAt": "2024-11-27T12:40:00Z"
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
