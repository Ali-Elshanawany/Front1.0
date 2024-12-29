export const data = {
    guestCart: [],
    CurrentUser:null,
       
    Users: [
    {
        "_id": "User1",
        "Name": "User1",
        "Email": "User1@User.com",
        "Phone": "01011145011",
        "City": "cairo",
        "Street": "El-Rehab",
        "Password": "ZT/N5YlatVuZmyKEzit2LzWOM1FklGr9BLurr98mDYk=",
        "Role": "User",
        "CreatedAt": "2024-12-23T14:38:05.385Z",
        "cart": [],
        "orders": []
    },
    {
        "_id": "User2",
        "Name": "User2",
        "Email": "User2@User.com",
        "Phone": "01211145011",
        "City": "gharbia",
        "Street": "El-Ashraf",
        "Password": "ZT/N5YlatVuZmyKEzit2LzWOM1FklGr9BLurr98mDYk=",
        "Role": "User",
        "CreatedAt": "2024-12-23T14:38:29.535Z",
        "cart": [],
        "orders": []
    },
    {
        "_id": "User3",
        "Name": "User3",
        "Email": "User3@User.com",
        "Phone": "01211145011",
        "City": "alexandria",
        "Street": "Sporting",
        "Password": "ZT/N5YlatVuZmyKEzit2LzWOM1FklGr9BLurr98mDYk=",
        "Role": "User",
        "CreatedAt": "2024-12-23T14:38:51.366Z",
        "cart": [],
        "orders": []
    },
    {
        "_id": "Seller1",
        "Name": "Seller1",
        "Email": "Seller1@Seller.com",
        "Phone": "01511145011",
        "City": "aswan",
        "Street": "Nile Way",
        "Password": "ZT/N5YlatVuZmyKEzit2LzWOM1FklGr9BLurr98mDYk=",
        "Role": "Seller",
        "CreatedAt": "2024-12-23T14:39:44.303Z",
        "TotalSales": 12000
    },
    {
        "_id": "Seller2",
        "Name": "Seller2",
        "Email": "Seller2@Seller.com",
        "Phone": "01009117927",
        "City": "minya",
        "Street": "Bahr",
        "Password": "ZT/N5YlatVuZmyKEzit2LzWOM1FklGr9BLurr98mDYk=",
        "Role": "Seller",
        "CreatedAt": "2024-12-23T14:40:51.271Z",
        "TotalSales": 109500
    },
    {
        "_id": "Seller3",
        "Name": "Seller3",
        "Email": "Seller3@Seller.com",
        "Phone": "01009117927",
        "City": "red_sea",
        "Street": "Sahl",
        "Password": "ZT/N5YlatVuZmyKEzit2LzWOM1FklGr9BLurr98mDYk=",
        "Role": "Seller",
        "CreatedAt": "2024-12-23T14:41:08.430Z",
        "TotalSales": 0
    },
    {
        "_id": "Admin1",
        "Name": "Admin1",
        "Email": "Admin1@Admin.com",
        "Phone": "01109117927",
        "City": "gharbia",
        "Street": "El-Sultan Mourad",
        "Password": "ZT/N5YlatVuZmyKEzit2LzWOM1FklGr9BLurr98mDYk=",
        "Role": "Admin",
        "CreatedAt": "2024-12-23T14:41:42.631Z"
    },
    {
        "_id": "Admin2",
        "Name": "Admin2",
        "Email": "Admin2@Admin.com",
        "Phone": "01209117927",
        "City": "kafr_el_sheikh",
        "Street": "Al-Estad",
        "Password": "ZT/N5YlatVuZmyKEzit2LzWOM1FklGr9BLurr98mDYk=",
        "Role": "Admin",
        "CreatedAt": "2024-12-23T14:42:12.263Z"
    },
    {
        "_id": "Admin3",
        "Name": "Admin3",
        "Email": "Admin3@Admin.com",
        "Phone": "01209117927",
        "City": "dakahlia",
        "Street": "Al-Estad",
        "Password": "ZT/N5YlatVuZmyKEzit2LzWOM1FklGr9BLurr98mDYk=",
        "Role": "Admin",
        "CreatedAt": "2024-12-23T14:42:29.623Z"
    }
],
    Categories: [
        { "_id": "cat1", "Name": "Chairs", "Description": "Various types of chairs for different purposes." },
        { "_id": "cat2", "Name": "Tables", "Description": "Dining, work, and coffee tables." },
        { "_id": "cat3", "Name": "Master Bedrooms", "Description": "Comfortable and stylish beds for your home." },
        { "_id": "cat4", "Name": "Kitchens", "Description": "Storage solutions for every room." },
        { "_id": "cat5", "Name": "Dining Rooms", "Description": "Various types of chairs for different purposes." },
        { "_id": "cat6", "Name": "Living Rooms", "Description": "Dining, work, and coffee tables." },
        { "_id": "cat7", "Name": "Entertainment", "Description": "Comfortable and stylish beds for your home." },
        { "_id": "cat8", "Name": "Dressing Rooms", "Description": "Storage solutions for every room." }
    ],
    Products:[
        {
            "_id": "Product1734965600608",
            "Name": "Chair1",
            "Description": "chair is crafted from high-quality materials like solid wood, metal, or premium upholstery, ensuring lasting comfort and timeless appeal. With a variety of designs ranging from classic to contemporary, our chairs are perfect for enhancing your living spaces, workspaces, and dining areas.",
            "Price": 500,
            "Stock": 4,
            "SellerID": "Seller1",
            "CategoryID": "cat1",
            "Images": [
                "../assets/chair.jpg",
                "../assets/chair2.jpg"
            ],
            "CreatedAt": "2024-12-23T14:53:20.608Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734965622808",
            "Name": "Chair2",
            "Description": "chair is crafted from high-quality materials like solid wood, metal, or premium upholstery, ensuring lasting comfort and timeless appeal. With a variety of designs ranging from classic to contemporary, our chairs are perfect for enhancing your living spaces, workspaces, and dining areas.",
            "Price": 750,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat1",
            "Images": [
                "../assets/chair pro4.avif",
                "../assets/chair4.jpj.avif"
            ],
            "CreatedAt": "2024-12-23T14:53:42.808Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734965817288",
            "Name": "Tabel1",
            "Description": "Transform your spaces with our stunning collection of tables, crafted to combine functionality and aesthetic appeal. From sleek coffee tables that serve as the centerpiece of your living room to sturdy dining tables perfect for family gatherings, we offer designs to suit every need and style.",
            "Price": 1500,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat2",
            "Images": [
                "../assets/table4.jpg",
                "../assets/table.jpg"
            ],
            "CreatedAt": "2024-12-23T14:56:57.288Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734965852399",
            "Name": "Tabel2",
            "Description": "Transform your spaces with our stunning collection of tables, crafted to combine functionality and aesthetic appeal. From sleek coffee tables that serve as the centerpiece of your living room to sturdy dining tables perfect for family gatherings, we offer designs to suit every need and style.",
            "Price": 1500,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat2",
            "Images": [
                "../assets/table2.jpg",
                "../assets/table3.jpg"
            ],
            "CreatedAt": "2024-12-23T14:57:32.399Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734966041039",
            "Name": "Master Bedroom1",
            "Description": "Create your dream sanctuary with our elegant collection of master bedroom furniture. Designed for comfort and sophistication, our range includes luxurious beds, spacious wardrobes, stylish dressers, and bedside tables that perfectly blend form and function.",
            "Price": 15000,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat3",
            "Images": [
                "../assets/bedroom1.jpg",
                "../assets/bedroom2.jpg"
            ],
            "CreatedAt": "2024-12-23T15:00:41.039Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734966054247",
            "Name": "Master Bedroom2",
            "Description": "Create your dream sanctuary with our elegant collection of master bedroom furniture. Designed for comfort and sophistication, our range includes luxurious beds, spacious wardrobes, stylish dressers, and bedside tables that perfectly blend form and function.",
            "Price": 25000,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat3",
            "Images": [
                "../assets/bedroom4.jpg",
                "../assets/bedroom-blackjpg.jpg"
            ],
            "CreatedAt": "2024-12-23T15:00:54.247Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734966138584",
            "Name": "Kitchens",
            "Description": "Upgrade your kitchen with our stylish and functional furniture and accessories, designed to make cooking and dining a joy. Our collection features versatile dining sets, sturdy kitchen islands, sleek storage cabinets, and ergonomic bar stools to meet your every need.",
            "Price": 12000,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat4",
            "Images": [
                "../assets/kitchen1.jpj..avif",
                "../assets/kitchen.avif"
            ],
            "CreatedAt": "2024-12-23T15:02:18.584Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734966156535",
            "Name": "Kitchen2",
            "Description": "Upgrade your kitchen with our stylish and functional furniture and accessories, designed to make cooking and dining a joy. Our collection features versatile dining sets, sturdy kitchen islands, sleek storage cabinets, and ergonomic bar stools to meet your every need.",
            "Price": 12000,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat4",
            "Images": [
                "../assets/kitchen-3.jpg",
                "../assets/kitchen-4.jpg"
            ],
            "CreatedAt": "2024-12-23T15:02:36.535Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734966215191",
            "Name": "Dining Room1",
            "Description": "Bring your family and friends together with our exquisite collection of dining room furniture. Featuring elegant dining tables, comfortable chairs, spacious sideboards, and stylish display cabinets, our range is designed to enhance your dining experience.",
            "Price": 8000,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat5",
            "Images": [
                "../assets/-dining-room-4.jpg",
                "../assets/dining-room-3.jpg"
            ],
            "CreatedAt": "2024-12-23T15:03:35.191Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734966238751",
            "Name": "Dining Room2",
            "Description": "Bring your family and friends together with our exquisite collection of dining room furniture. Featuring elegant dining tables, comfortable chairs, spacious sideboards, and stylish display cabinets, our range is designed to enhance your dining experience.",
            "Price": 10000,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat5",
            "Images": [
                "../assets/dinningroom1.jpg",
                "../assets/dining-table-1.jpg"
            ],
            "CreatedAt": "2024-12-23T15:03:58.751Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734966302135",
            "Name": "Living Room",
            "Description": "Transform your living room into the heart of your home with our stunning collection of furniture and décor. From cozy sofas and elegant coffee tables to practical TV stands and stylish shelving units, our range is designed to blend comfort, functionality, and style.",
            "Price": 16000,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat6",
            "Images": [
                "../assets/living-room-3jpg.jpg",
                "../assets/dining-room-2.jpg"
            ],
            "CreatedAt": "2024-12-23T15:05:02.135Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734966355887",
            "Name": "Living Room2",
            "Description": "Transform your living room into the heart of your home with our stunning collection of furniture and décor. From cozy sofas and elegant coffee tables to practical TV stands and stylish shelving units, our range is designed to blend comfort, functionality, and style.",
            "Price": 16000,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat6",
            "Images": [
                "../assets/living-room-11.jpg",
                "../assets/living-room-1.jpg"
            ],
            "CreatedAt": "2024-12-23T15:05:55.887Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734966430550",
            "Name": "Entertainment1",
            "Description": "Elevate your entertainment experience with our premium range of furniture designed to enhance both functionality and style. Whether you're looking for sleek TV stands, versatile media consoles, or spacious entertainment centers, our collection offers the perfect solutions to organize your devices and accessories.",
            "Price": 23000,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat7",
            "Images": [
                "../assets/entertainment.jpeg",
                "../assets/entertainment-2.jpg"
            ],
            "CreatedAt": "2024-12-23T15:07:10.550Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734966461759",
            "Name": "Entertainment2",
            "Description": "Elevate your entertainment experience with our premium range of furniture designed to enhance both functionality and style. Whether you're looking for sleek TV stands, versatile media consoles, or spacious entertainment centers, our collection offers the perfect solutions to organize your devices and accessories.",
            "Price": 30000,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat7",
            "Images": [
                "../assets/enter-4.jpg",
                "../assets/enter-3.jpg"
            ],
            "CreatedAt": "2024-12-23T15:07:41.759Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734966645319",
            "Name": "Dressing Room1",
            "Description": "Design a stylish and functional dressing room with our curated selection of furniture and storage solutions. From spacious wardrobes and elegant dressers to chic vanity tables and full-length mirrors, our collection helps you create an organized and luxurious personal retreat.",
            "Price": 14000,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat8",
            "Images": [
                "../assets/dressing-2.jpg",
                "../assets/dressing-1.jpg"
            ],
            "CreatedAt": "2024-12-23T15:10:45.319Z",
            "NumOfSales": 0,
            "Approved": false
        },
        {
            "_id": "Product1734966659326",
            "Name": "Dressing Room2",
            "Description": "Design a stylish and functional dressing room with our curated selection of furniture and storage solutions. From spacious wardrobes and elegant dressers to chic vanity tables and full-length mirrors, our collection helps you create an organized and luxurious personal retreat.",
            "Price": 14000,
            "Stock": 50,
            "SellerID": "Seller1",
            "CategoryID": "cat8",
            "Images": [
                "../assets/dressing-3.jpg",
                "../assets/dressing-4.avif"
            ],
            "CreatedAt": "2024-12-23T15:10:59.326Z",
            "NumOfSales": 0,
            "Approved": false
        },
        //Seller2
        {
            "_id": "Product1",
            "Name": "Chair1",
            "Description": "chair is crafted from high-quality materials like solid wood, metal, or premium upholstery, ensuring lasting comfort and timeless appeal. With a variety of designs ranging from classic to contemporary, our chairs are perfect for enhancing your living spaces, workspaces, and dining areas.",
            "Price": 500,
            "SellerID": "Seller2",
            "Stock": 50,
            "CategoryID": "cat1",
            "Images": [
                "../assets/chair.jpg",
                "../assets/chair2.jpg"
            ],
            "CreatedAt": "2024-12-23T14:53:20.608Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product2",
            "Name": "Chair2",
            "Description": "chair is crafted from high-quality materials like solid wood, metal, or premium upholstery, ensuring lasting comfort and timeless appeal. With a variety of designs ranging from classic to contemporary, our chairs are perfect for enhancing your living spaces, workspaces, and dining areas.",
            "Price": 750,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat1",
            "Images": [
                "../assets/chair pro4.avif",
                "../assets/chair4.jpj.avif"
            ],
            "CreatedAt": "2024-12-23T14:53:42.808Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product3",
            "Name": "Tabel1",
            "Description": "Transform your spaces with our stunning collection of tables, crafted to combine functionality and aesthetic appeal. From sleek coffee tables that serve as the centerpiece of your living room to sturdy dining tables perfect for family gatherings, we offer designs to suit every need and style.",
            "Price": 1500,
            "Stock": 50,
            
            "SellerID": "Seller2",
            "CategoryID": "cat2",
            "Images": [
                "../assets/table4.jpg",
                "../assets/table.jpg"
            ],
            "CreatedAt": "2024-12-23T14:56:57.288Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product4",
            "Name": "Tabel2",
            "Description": "Transform your spaces with our stunning collection of tables, crafted to combine functionality and aesthetic appeal. From sleek coffee tables that serve as the centerpiece of your living room to sturdy dining tables perfect for family gatherings, we offer designs to suit every need and style.",
            "Price": 1500,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat2",
            "Images": [
                "../assets/table2.jpg",
                "../assets/table3.jpg"
            ],
            "CreatedAt": "2024-12-23T14:57:32.399Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product5",
            "Name": "Master Bedroom1",
            "Description": "Create your dream sanctuary with our elegant collection of master bedroom furniture. Designed for comfort and sophistication, our range includes luxurious beds, spacious wardrobes, stylish dressers, and bedside tables that perfectly blend form and function.",
            "Price": 15000,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat3",
            "Images": [
                "../assets/bedroom1.jpg",
                "../assets/bedroom2.jpg"
            ],
            "CreatedAt": "2024-12-23T15:00:41.039Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product6",
            "Name": "Master Bedroom2",
            "Description": "Create your dream sanctuary with our elegant collection of master bedroom furniture. Designed for comfort and sophistication, our range includes luxurious beds, spacious wardrobes, stylish dressers, and bedside tables that perfectly blend form and function.",
            "Price": 25000,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat3",
            "Images": [
                "../assets/bedroom4.jpg",
                "../assets/bedroom-blackjpg.jpg"
            ],
            "CreatedAt": "2024-12-23T15:00:54.247Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product7",
            "Name": "Kitchens",
            "Description": "Upgrade your kitchen with our stylish and functional furniture and accessories, designed to make cooking and dining a joy. Our collection features versatile dining sets, sturdy kitchen islands, sleek storage cabinets, and ergonomic bar stools to meet your every need.",
            "Price": 12000,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat4",
            "Images": [
                "../assets/kitchen1.jpj..avif",
                "../assets/kitchen.avif"
            ],
            "CreatedAt": "2024-12-23T15:02:18.584Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product8",
            "Name": "Kitchen2",
            "Description": "Upgrade your kitchen with our stylish and functional furniture and accessories, designed to make cooking and dining a joy. Our collection features versatile dining sets, sturdy kitchen islands, sleek storage cabinets, and ergonomic bar stools to meet your every need.",
            "Price": 12000,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat4",
            "Images": [
                "../assets/kitchen-3.jpg",
                "../assets/kitchen-4.jpg"
            ],
            "CreatedAt": "2024-12-23T15:02:36.535Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product9",
            "Name": "Dining Room1",
            "Description": "Bring your family and friends together with our exquisite collection of dining room furniture. Featuring elegant dining tables, comfortable chairs, spacious sideboards, and stylish display cabinets, our range is designed to enhance your dining experience.",
            "Price": 8000,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat5",
            "Images": [
                "../assets/-dining-room-4.jpg",
                "../assets/dining-room-3.jpg"
            ],
            "CreatedAt": "2024-12-23T15:03:35.191Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product10",
            "Name": "Dining Room2",
            "Description": "Bring your family and friends together with our exquisite collection of dining room furniture. Featuring elegant dining tables, comfortable chairs, spacious sideboards, and stylish display cabinets, our range is designed to enhance your dining experience.",
            "Price": 10000,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat5",
            "Images": [
                "../assets/dinningroom1.jpg",
                "../assets/dining-table-1.jpg"
            ],
            "CreatedAt": "2024-12-23T15:03:58.751Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product11",
            "Name": "Living Room",
            "Description": "Transform your living room into the heart of your home with our stunning collection of furniture and décor. From cozy sofas and elegant coffee tables to practical TV stands and stylish shelving units, our range is designed to blend comfort, functionality, and style.",
            "Price": 16000,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat6",
            "Images": [
                "../assets/living-room-3jpg.jpg",
                "../assets/dining-room-2.jpg"
            ],
            "CreatedAt": "2024-12-23T15:05:02.135Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product12",
            "Name": "Living Room2",
            "Description": "Transform your living room into the heart of your home with our stunning collection of furniture and décor. From cozy sofas and elegant coffee tables to practical TV stands and stylish shelving units, our range is designed to blend comfort, functionality, and style.",
            "Price": 16000,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat6",
            "Images": [
                "../assets/living-room-11.jpg",
                "../assets/living-room-1.jpg"
            ],
            "CreatedAt": "2024-12-23T15:05:55.887Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product13",
            "Name": "Entertainment1",
            "Description": "Elevate your entertainment experience with our premium range of furniture designed to enhance both functionality and style. Whether you're looking for sleek TV stands, versatile media consoles, or spacious entertainment centers, our collection offers the perfect solutions to organize your devices and accessories.",
            "Price": 23000,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat7",
            "Images": [
                "../assets/entertainment.jpeg",
                "../assets/entertainment-2.jpg"
            ],
            "CreatedAt": "2024-12-23T15:07:10.550Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product14",
            "Name": "Entertainment2",
            "Description": "Elevate your entertainment experience with our premium range of furniture designed to enhance both functionality and style. Whether you're looking for sleek TV stands, versatile media consoles, or spacious entertainment centers, our collection offers the perfect solutions to organize your devices and accessories.",
            "Price": 30000,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat7",
            "Images": [
                "../assets/enter-4.jpg",
                "../assets/enter-3.jpg"
            ],
            "CreatedAt": "2024-12-23T15:07:41.759Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product15",
            "Name": "Dressing Room1",
            "Description": "Design a stylish and functional dressing room with our curated selection of furniture and storage solutions. From spacious wardrobes and elegant dressers to chic vanity tables and full-length mirrors, our collection helps you create an organized and luxurious personal retreat.",
            "Price": 14000,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat8",
            "Images": [
                "../assets/dressing-2.jpg",
                "../assets/dressing-1.jpg"
            ],
            "CreatedAt": "2024-12-23T15:10:45.319Z",
            "NumOfSales": 0,
            "Approved": true
        },
        {
            "_id": "Product16",
            "Name": "Dressing Room2",
            "Description": "Design a stylish and functional dressing room with our curated selection of furniture and storage solutions. From spacious wardrobes and elegant dressers to chic vanity tables and full-length mirrors, our collection helps you create an organized and luxurious personal retreat.",
            "Price": 14000,
            "Stock": 50,
            "SellerID": "Seller2",
            "CategoryID": "cat8",
            "Images": [
                "../assets/dressing-3.jpg",
                "../assets/dressing-4.avif"
            ],
            "CreatedAt": "2024-12-23T15:10:59.326Z",
            "NumOfSales": 0,
            "Approved": true
        }
    ]
    
    
    ,
    Orders:[
        {
            "_id": "Order1734968292230",
            "UserID": "User1",
            "Items": [
                {
                    "_id": "Product1",
                    "Name": "Chair1",
                    "Description": "chair is crafted from high-quality materials like solid wood, metal, or premium upholstery, ensuring lasting comfort and timeless appeal. With a variety of designs ranging from classic to contemporary, our chairs are perfect for enhancing your living spaces, workspaces, and dining areas.",
                    "Price": 500,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat1",
                    "Images": [
                        "../assets/chair.jpg",
                        "../assets/chair2.jpg"
                    ],
                    "CreatedAt": "2024-12-23T14:53:20.608Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 5
                },
                {
                    "_id": "Product3",
                    "Name": "Tabel1",
                    "Description": "Transform your spaces with our stunning collection of tables, crafted to combine functionality and aesthetic appeal. From sleek coffee tables that serve as the centerpiece of your living room to sturdy dining tables perfect for family gatherings, we offer designs to suit every need and style.",
                    "Price": 1500,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat2",
                    "Images": [
                        "../assets/table4.jpg",
                        "../assets/table.jpg"
                    ],
                    "CreatedAt": "2024-12-23T14:56:57.288Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 2
                }
            ],
            "TotalAmount": 5500,
            "Status": "Pending",
            "CreatedAt": "2024-01-23T15:38:12.230Z",
            "customerDetails": {
                "streetAddress": "Tantaaaa",
                "additionalPhoneNumber": "01011145011",
                "City": "Tanta",
                "Zip": "31511"
            }
        },
        {
            "_id": "Order1734969331486",
            "UserID": "User1",
            "Items": [
                {
                    "_id": "Product1",
                    "Name": "Chair1",
                    "Description": "chair is crafted from high-quality materials like solid wood, metal, or premium upholstery, ensuring lasting comfort and timeless appeal. With a variety of designs ranging from classic to contemporary, our chairs are perfect for enhancing your living spaces, workspaces, and dining areas.",
                    "Price": 500,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat1",
                    "Images": [
                        "../assets/chair.jpg",
                        "../assets/chair2.jpg"
                    ],
                    "CreatedAt": "2024-12-23T14:53:20.608Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 5
                },
                {
                    "_id": "Product3",
                    "Name": "Tabel1",
                    "Description": "Transform your spaces with our stunning collection of tables, crafted to combine functionality and aesthetic appeal. From sleek coffee tables that serve as the centerpiece of your living room to sturdy dining tables perfect for family gatherings, we offer designs to suit every need and style.",
                    "Price": 1500,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat2",
                    "Images": [
                        "../assets/table4.jpg",
                        "../assets/table.jpg"
                    ],
                    "CreatedAt": "2024-12-23T14:56:57.288Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 2
                },
                {
                    "_id": "Product5",
                    "Name": "Master Bedroom1",
                    "Description": "Create your dream sanctuary with our elegant collection of master bedroom furniture. Designed for comfort and sophistication, our range includes luxurious beds, spacious wardrobes, stylish dressers, and bedside tables that perfectly blend form and function.",
                    "Price": 15000,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat3",
                    "Images": [
                        "../assets/bedroom1.jpg",
                        "../assets/bedroom2.jpg"
                    ],
                    "CreatedAt": "2024-12-23T15:00:41.039Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 1
                },
                {
                    "_id": "Product4",
                    "Name": "Tabel2",
                    "Description": "Transform your spaces with our stunning collection of tables, crafted to combine functionality and aesthetic appeal. From sleek coffee tables that serve as the centerpiece of your living room to sturdy dining tables perfect for family gatherings, we offer designs to suit every need and style.",
                    "Price": 1500,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat2",
                    "Images": [
                        "../assets/table2.jpg",
                        "../assets/table3.jpg"
                    ],
                    "CreatedAt": "2024-12-23T14:57:32.399Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 1
                },
                {
                    "_id": "Product1734966156535",
                    "Name": "Kitchen2",
                    "Description": "Upgrade your kitchen with our stylish and functional furniture and accessories, designed to make cooking and dining a joy. Our collection features versatile dining sets, sturdy kitchen islands, sleek storage cabinets, and ergonomic bar stools to meet your every need.",
                    "Price": 12000,
                    "Stock": 50,
                    "SellerID": "Seller1",
                    "CategoryID": "cat4",
                    "Images": [
                        "../assets/kitchen-3.jpg",
                        "../assets/kitchen-4.jpg"
                    ],
                    "CreatedAt": "2024-12-23T15:02:36.535Z",
                    "NumOfSales": 0,
                    "Approved": false,
                    "Quantity": 1
                }
            ],
            "TotalAmount": 34000,
            "Status": "Pending",
            "CreatedAt": "2024-02-23T15:55:31.487Z",
            "customerDetails": {
                "streetAddress": "Tantaaaa",
                "additionalPhoneNumber": "01011145011",
                "City": "Tanta",
                "Zip": "31511"
            }
        },
        {
            "_id": "Order1734969356814",
            "UserID": "User1",
            "Items": [
                {
                    "_id": "Product8",
                    "Name": "Kitchen2",
                    "Description": "Upgrade your kitchen with our stylish and functional furniture and accessories, designed to make cooking and dining a joy. Our collection features versatile dining sets, sturdy kitchen islands, sleek storage cabinets, and ergonomic bar stools to meet your every need.",
                    "Price": 12000,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat4",
                    "Images": [
                        "../assets/kitchen-3.jpg",
                        "../assets/kitchen-4.jpg"
                    ],
                    "CreatedAt": "2024-12-23T15:02:36.535Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 1
                },
                {
                    "_id": "Product12",
                    "Name": "Living Room2",
                    "Description": "Transform your living room into the heart of your home with our stunning collection of furniture and décor. From cozy sofas and elegant coffee tables to practical TV stands and stylish shelving units, our range is designed to blend comfort, functionality, and style.",
                    "Price": 16000,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat6",
                    "Images": [
                        "../assets/living-room-11.jpg",
                        "../assets/living-room-1.jpg"
                    ],
                    "CreatedAt": "2024-12-23T15:05:55.887Z",
                    "NumOfSales": 0,
                    "Approved": false,
                    "Quantity": 1
                },
                {
                    "_id": "Product16",
                    "Name": "Dressing Room2",
                    "Description": "Design a stylish and functional dressing room with our curated selection of furniture and storage solutions. From spacious wardrobes and elegant dressers to chic vanity tables and full-length mirrors, our collection helps you create an organized and luxurious personal retreat.",
                    "Price": 14000,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat8",
                    "Images": [
                        "../assets/dressing-3.jpg",
                        "../assets/dressing-4.avif"
                    ],
                    "CreatedAt": "2024-12-23T15:10:59.326Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 1
                }
            ],
            "TotalAmount": 42000,
            "Status": "Pending",
            "CreatedAt": "2024-03-23T15:55:56.815Z",
            "customerDetails": {
                "streetAddress": "Tantaaaa",
                "additionalPhoneNumber": "01011145011",
                "City": "Tanta",
                "Zip": "31511"
            }
        },
        {
            "_id": "Order1734969370158",
            "UserID": "User1",
            "Items": [
                {
                    "_id": "Product12",
                    "Name": "Living Room2",
                    "Description": "Transform your living room into the heart of your home with our stunning collection of furniture and décor. From cozy sofas and elegant coffee tables to practical TV stands and stylish shelving units, our range is designed to blend comfort, functionality, and style.",
                    "Price": 16000,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat6",
                    "Images": [
                        "../assets/living-room-11.jpg",
                        "../assets/living-room-1.jpg"
                    ],
                    "CreatedAt": "2024-12-23T15:05:55.887Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 2
                }
            ],
            "TotalAmount": 32000,
            "Status": "Pending",
            "CreatedAt": "2024-05-23T15:56:10.159Z",
            "customerDetails": {
                "streetAddress": "Tantaaaa",
                "additionalPhoneNumber": "01011145011",
                "City": "Tanta",
                "Zip": "31511"
            }
        },
        {
            "_id": "Order1734969393718",
            "UserID": "User1",
            "Items": [
                {
                    "_id": "Product3",
                    "Name": "Tabel1",
                    "Description": "Transform your spaces with our stunning collection of tables, crafted to combine functionality and aesthetic appeal. From sleek coffee tables that serve as the centerpiece of your living room to sturdy dining tables perfect for family gatherings, we offer designs to suit every need and style.",
                    "Price": 1500,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat2",
                    "Images": [
                        "../assets/table4.jpg",
                        "../assets/table.jpg"
                    ],
                    "CreatedAt": "2024-12-23T14:56:57.288Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 1
                },
                {
                    "_id": "Product2",
                    "Name": "Chair2",
                    "Description": "chair is crafted from high-quality materials like solid wood, metal, or premium upholstery, ensuring lasting comfort and timeless appeal. With a variety of designs ranging from classic to contemporary, our chairs are perfect for enhancing your living spaces, workspaces, and dining areas.",
                    "Price": 750,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat1",
                    "Images": [
                        "../assets/chair pro4.avif",
                        "../assets/chair4.jpj.avif"
                    ],
                    "CreatedAt": "2024-12-23T14:53:42.808Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 1
                },
                {
                    "_id": "Product1",
                    "Name": "Chair1",
                    "Description": "chair is crafted from high-quality materials like solid wood, metal, or premium upholstery, ensuring lasting comfort and timeless appeal. With a variety of designs ranging from classic to contemporary, our chairs are perfect for enhancing your living spaces, workspaces, and dining areas.",
                    "Price": 500,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat1",
                    "Images": [
                        "../assets/chair.jpg",
                        "../assets/chair2.jpg"
                    ],
                    "CreatedAt": "2024-12-23T14:53:20.608Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 1
                }
            ],
            "TotalAmount": 2750,
            "Status": "Pending",
            "CreatedAt": "2024-06-23T15:56:33.718Z",
            "customerDetails": {
                "streetAddress": "Tantaaaa",
                "additionalPhoneNumber": "01011145011",
                "City": "Tanta",
                "Zip": "31511"
            }
        },
        {
            "_id": "Order1734969409622",
            "UserID": "User1",
            "Items": [
                {
                    "_id": "Product2",
                    "Name": "Chair2",
                    "Description": "chair is crafted from high-quality materials like solid wood, metal, or premium upholstery, ensuring lasting comfort and timeless appeal. With a variety of designs ranging from classic to contemporary, our chairs are perfect for enhancing your living spaces, workspaces, and dining areas.",
                    "Price": 750,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat1",
                    "Images": [
                        "../assets/chair pro4.avif",
                        "../assets/chair4.jpj.avif"
                    ],
                    "CreatedAt": "2024-12-23T14:53:42.808Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 5
                },
                {
                    "_id": "Product1",
                    "Name": "Chair1",
                    "Description": "chair is crafted from high-quality materials like solid wood, metal, or premium upholstery, ensuring lasting comfort and timeless appeal. With a variety of designs ranging from classic to contemporary, our chairs are perfect for enhancing your living spaces, workspaces, and dining areas.",
                    "Price": 500,
                    "Stock": 50,
                    "SellerID": "Seller2",
                    "CategoryID": "cat1",
                    "Images": [
                        "../assets/chair.jpg",
                        "../assets/chair2.jpg"
                    ],
                    "CreatedAt": "2024-12-23T14:53:20.608Z",
                    "NumOfSales": 0,
                    "Approved": true,
                    "Quantity": 3
                }
            ],
            "TotalAmount": 5250,
            "Status": "Pending",
            "CreatedAt": "2024-07-23T15:56:49.622Z",
            "customerDetails": {
                "streetAddress": "Tantaaaa",
                "additionalPhoneNumber": "01011145011",
                "City": "Tanta",
                "Zip": "31511"
            }
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



// export default data;


export function loadDataFromLocalStorage() {
    console.log("Data LOADED:>> ");
    for (const key in data) {
        data[key] = JSON.parse(localStorage.getItem(key)) || data[key];
    }
    return data;
}
export function saveDataInLocalStorage() {
    for (const key in data) {
        localStorage.setItem(key, JSON.stringify(data[key]));
    }

}
// export function saveInLocalStorage(key, value) {
//    for(const key in data){
//     localStorage.setItem(key,json.stringify(value))
//    }
// }


export function getCurrentUser() {
    loadDataFromLocalStorage();
    loadDataFromLocalStorage();
    return data.CurrentUser;
}

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

export function generateRandomId() {
    return `Order${Date.now()}`;
    return `Order${Date.now()}`;
}

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
    const index = data.Users.findIndex((u) => u._id === user._id);
    if (index !== -1) {
        data.Users[index] = user; // Update the user at the found index
    }
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
    loadDataFromLocalStorage()

    let monthlySalesArr = new Array(12).fill(0);
    data.Orders.forEach(x => {
        // Check if the order's status is not "Canceled"
       if (x.Status !== "Canceled") {
          // * new Date(x.CreatedAt).getMonth() Will return The number of month Of Order
            monthlySalesArr[new Date(x.CreatedAt).getMonth()] += x.TotalAmount;
       }
    });
    return monthlySalesArr;
}
export function getSellerSalesByMonth() {
    loadDataFromLocalStorage()
    let monthlySalesArr = new Array(12).fill(0)
    data.Orders.forEach(x => {
        // * new Date(x.CreatedAt).getMonth() Will return The number of month Of Order
        x.Items.forEach(i => {
            if (i.SellerID == data.CurrentUser?._id && x.Status!="Canceled") {
                monthlySalesArr[new Date(x.CreatedAt).getMonth()] += (i.Price * i.Quantity)
            }
        })
    });
    return monthlySalesArr;
}

const AdminPages = ['AccountsDataTable.html', 'OrdersDataTable.html', 'products&orders.html' , 'AdminHome.html' , 'adminprofile.html' , 'OverviewAdmin.html'];
const UserPages = ['Cart.html' , 'CheckOut.html' , 'homeMain.html' , 'users-profile.html'];
const SellerPages = ["SellerProductDashboard.html","OrdersDataTable.html" , 'SellerHome.html' , 'sellerprofile.html'];
const GuestPages = ['ProductDetails','register.html' , 'Cart.html' , 'homeMain.html' , 'login.html'];



export function isAuthorized() {
    loadDataFromLocalStorage()
    console.log("Authorization Check Started");

    const host = window.location.origin;
    const webPage = location.href.split('/').pop().toLowerCase(); //* Get the current page
    let isAuthorized = false;
    console.log("***************************")
    console.log(webPage)

    // Define a reusable function to check authorization
    const checkAuthorization = (pages) => {
        return pages.some(page => page.toLocaleLowerCase() === webPage.toLocaleLowerCase());
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
    console.log("******************************");
    console.log(isAuthorized);
    if (!isAuthorized) {
        console.log("Access Denied");
        //window.location.replace(host + "/../html/403.html");
        window.location.assign("../html/403.html");
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
            if (u._id == item.SellerID)
                u.TotalSales -= (item.Quantity * item.Price);
        });
        saveDataInLocalStorage();
    });
}

// * Receive Items and Increase Stocks of the products 
export function increaseStock(items) {
    loadDataFromLocalStorage();
    console.log("Entered Increase Stock")
    console.log(items)
    items.forEach(function (item) {

        console.log("-----------------------------------------")
        console.log(item)
        console.log("-----------------------------------------")

        data.Products.forEach(function (p) {
            if (p._id == item._id)
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
export function DeleteProductsById(productId) {
    data.Products = data.Products.filter(product => product._id !==productId);
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
    return data.Products.filter(p => p.SellerID === data.CurrentUser?._id);
}
export function SellerOrders() {
    loadDataFromLocalStorage()
    return data.Orders.filter(function (o) {
        return o.Items.some(function (i) {
            return i.SellerID == data.CurrentUser._id;
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
