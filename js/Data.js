export const data = {
    guestCart: [],
    CurrentUser: null,
    Users: [
        {
            "_id": "user1",
            "Name": "John Doe",
            "Email": "admin@example.com",
            "Password": "hashed_password1",
            "Phone": "123456789",
            "City": "Cairo",
            "Street":"bla bla blaablaa ",
            "Role": "Admin",
            "CreatedAt": "2024-11-27T12:34:56Z"
        },
        {
            "_id": "user2",
            "Name": "Alice Seller",
            "Email": "seller@example.com",
            "Password": "hashed_password2",
            "Phone": "987654321",
            "City": "Cairo",
            "Street":"bla bla blaablaa ",
            "Role": "Seller",
            "CreatedAt": "2024-11-27T12:35:00Z"
        },
        {
            "_id": "user3",
            "Name": "Bob Buyer",
            "Email": "buyer@example.com",
            "Password": "hashed_password3",
            "Phone": "123987456",
            "City": "Cairo",
            "Street":"bla bla blaablaa ",
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
            "NumOfSales": 5
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
            "UserID": "user3",
            "Items": [
                {
                    "ProductID": "prod1",
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
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
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
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
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
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
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
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
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
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
                    "Quantity": 2,
                    "Price": 59.99
                },
                {
                    "ProductID": "prod2",
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
    Reviews: [
        {
            "_id": "review1",
            "ProductID": "prod1",
            "UserID": "user3",
            "Rating": 4,
            "Comment": "Great quality, sturdy chair.",
            "CreatedAt": "2024-11-27T12:42:00Z"
        }
    ]
}

// export default data;


export function loadDataFromLocalStorage() {
    console.log("Data LOADED:>>zzzz ");
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
export function getUserByEmail(email) {
    return data.Users.find((user) => user.Email === email);
}

export function getUsers(){
    loadDataFromLocalStorage();
    return data.Users;
}
export function getOrders(){
    loadDataFromLocalStorage();
    return data.Orders;
}


// * Will Return array Containg Total Sales of Each Month 
// * This Will be the Input for the Graph in Admin Dashboard 
export function getSalesByMonth(){
    let monthlySalesArr=new Array(12).fill(0)
    data.Orders.forEach(x=>{
        // * new Date(x.CreatedAt).getMonth() Will return The number of month Of Order
        monthlySalesArr[new Date(x.CreatedAt).getMonth()]+=x.TotalAmount;
    });
    return monthlySalesArr;
}
