import { data, addUser, loadDataFromLocalStorage,DeleteUserByEmail, addProduct, saveDataInLocalStorage } from "../Data.js";

export function AddProducts(isUpdate,SelectedProduct) {

   console.log(`This is ${isUpdate}`)
   console.log(`This is ${SelectedProduct}`)
   const Name = $("#in-Name").val();
   console.log(Name);
   const Desc = $("#in-Desc").val();
   console.log(Desc);
   const Price = $("#in-Price").val();
   console.log(Price);
   const Stock = $("#in-Stock").val();
   console.log(Stock);
   const Cat = $("#in-Cat").val();
   console.log(Cat);
   let img1 = $("#in-img1").val();
   console.log(img1);
   let img2 = $("#in-img2").val();
   console.log(img1);
   console.log(img2);

   

   if (Name === "" || Name.length < 3 || !isNaN(Name)) {
      Swal.fire({
         icon: 'error',
         title: 'Invalid Product Name',
         text: 'Product Name must contain at least 3 characters and not be empty.',
      });
      return;
   }
   if (Desc === "" || Desc.length < 20 || !isNaN(Desc)) {
      Swal.fire({
         icon: 'error',
         title: 'Invalid Description',
         text: 'Description must contain at least 20 characters and not be empty.',
      });
      return;
   }
   if (Price <=0) {
      Swal.fire({
         icon: 'error',
         title: 'Invalid Price range',
         text: 'Price Must be bigger than zero ',
      });
      return;
   }
   if (Stock <=0) {
      Swal.fire({
         icon: 'error',
         title: 'Invalid Stock range',
         text: 'Stock Must be bigger than zero ',
      });
      return;
   }

   if (Cat === "" ) {
      Swal.fire({
         icon: 'error',
         title: 'Invalid Category ',
         text: 'You must choose a category',
      });
      return;
   }
   
   if(!isUpdate){
      if (img1 === "" || img2=== "") {
         Swal.fire({
            icon: 'error',
            title: 'Invalid Img ',
            text: 'You must choose an img',
         });
         return;
      }
   }

   if(img1){
      img1=CreatePath(img1);
   }else{
      img1=SelectedProduct.Images[0]
   }
   if(img2){
      img2=CreatePath(img2);
   }else{
      img2=SelectedProduct.Images[1]
   }

      if (img1 === img2) {
         Swal.fire({
            icon: 'error',
            title: 'Duplicate Img Detected',
            text: 'You must choose an Different img',
         });
         return;
      }


   
   if(!isUpdate){
      const newProduct = {
         _id: `Product${Date.now()}`,
         Name: Name,
         Description: Desc,
         Price: +Price,
         Stock: +Stock,
         SellerID:data.CurrentUser?._id,
         CategoryID: Cat,
         Images: [img1,img2],
         CreatedAt: new Date().toISOString(),
         NumOfSales:0,
         Approved:false
      };
      addProduct(newProduct);
   }else{
      const product = {
         _id: SelectedProduct._id ,
         Name: Name,
         Description: Desc,
         Price: +Price,
         Stock: +Stock,
         SellerID:data.CurrentUser._id,
         CategoryID: Cat,
         Images: [img1,img2],
         CreatedAt: SelectedProduct.CreatedAt,
         NumOfSales:SelectedProduct.NumOfSales,
         Approved:SelectedProduct.Approved
      };
      const index = data.Products.findIndex(p => p._id === SelectedProduct._id);
if (index !== -1) {
    data.Products[index] = product;
}
      saveDataInLocalStorage()
   }

   if(!isUpdate){
      Swal.fire('Success', 'Product Added successfully!', 'success').then(() => {
         loadDataFromLocalStorage();
      });
   }else{
      Swal.fire('Success', 'Product Updated successfully!', 'success').then(() => {
         loadDataFromLocalStorage();
      });
   }

}


// * Alter The img Path
function CreatePath(img){

   img=img.split("\\").pop();
   img='../assets/'+img;
   return img

}