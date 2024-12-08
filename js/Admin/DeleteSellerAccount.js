
import { data, decreaseTotalSales, increaseStock, saveDataInLocalStorage,DeleteProducts,DeleteUser } from "../Data.js";

export function DeleteSeller(Sellerid) {
    const selectedProducts = data.Products.filter(function (e) {
        return e.SellerID == Sellerid 
    });

    let selectedOrdersSet = new Set();

selectedProducts.forEach(function (p) {
    const ordersForProduct = data.Orders.filter(function (e) {
        return e.Items.some(function (i) {
            return i.ProductID == p._id && e.Status!="Canceled";
        });
    });

    ordersForProduct.forEach((order) => selectedOrdersSet.add(order));
});

// * Convert Set to Array
const selectedOrders = Array.from(selectedOrdersSet);

// * Changing Orders status to cancel 
data.Orders.forEach(function(o){
        selectedOrders.forEach(function(so){
            if(so._id==o._id){
                o.Status="Canceled";
            }
        });
});
saveDataInLocalStorage();

// * Decreaseing the Total Sales & Increase the Stocks For Canceled Orders 
selectedOrders.forEach(function(selectedOrder){
    decreaseTotalSales(selectedOrder.Items);
    increaseStock(selectedOrder.Items);
});
DeleteProducts(Sellerid);
DeleteUser(Sellerid);
}
