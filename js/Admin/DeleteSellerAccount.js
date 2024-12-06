
import { data } from "../Data.js";

export function DeleteSeller(Sellerid) {


    const selectedProducts = data.Products.filter(function (e) {
        return e.SellerID == Sellerid 
    });
    console.log("Blaaaa")
     console.log(selectedProducts);
    // selectedorders.forEach(function (or) {
    //     console.log(or.Items)
    //     decreaseTotalSales(or.Items)
    //     increaseStock(or.Items);
    //     DeleteOrders(Sellerid);
    // });
    // DeleteUser(Sellerid);
}


// * decrease  order Price from Seller TotalSales When order is canceled or customer Account is deleted 
function decreaseTotalSales(items) {
    items.forEach(function (item) {
        data.Users.forEach(function (u) {
            if (u._id == item.SellerId)
                u.TotalSales -= (item.Quantity * item.Price);
        });

        saveDataInLocalStorage();
    });
}

function increaseStock(items) {
    items.forEach(function (item) {
        data.Products.forEach(function (p) {
            if (p._id == item.ProductID)
                p.Stock += item.Quantity;
        });

        saveDataInLocalStorage();
    });
}
// * Delete Order of Customer 
function DeleteOrders(userId) {
    data.Orders = data.Orders.filter(order => order.UserID !== userId);

    saveDataInLocalStorage();

}
