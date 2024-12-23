import { data,loadDataFromLocalStorage } from "../js/Data.js";

const link = document.getElementById("LinkHome");
link.addEventListener("click",function(e){
e.preventDefault();
loadDataFromLocalStorage();
const role = data.CurrentUser?.Role;
if (role == "Seller") {
    window.location.assign("../html/SellerHome.html");
}
else if (role == "Admin") {
    window.location.assign("../html/AdminHome.html");
}
else window.location.href = "homeMain.html";
});

