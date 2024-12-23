import { data, addUser, loadDataFromLocalStorage, DeleteUserByEmail, TotalSales,saveDataInLocalStorage } from "../Data.js";

export function AddAccounts(isUpdate, selecteduser) {
  
   function encryptPassword(password) {
      return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64); 
   }
   
   console.log(`This is ${isUpdate}`)

   const email = $("#in-email").val();
   console.log(email);
   const name = $("#in-name").val();
   console.log(name);
   const password = $("#in-password").val();
   console.log(password);
   const phone = $("#in-Phone").val();
   console.log(phone);
   const city = $("#in-City").val();
   console.log(city);
   const street = $("#in-Street").val();
   console.log(street);
   const role = $('input[name="Role"]:checked').val();

   if (name === "" || name.length < 3) {
      Swal.fire({
         icon: 'error',
         title: 'Invalid Username',
         text: 'Username must contain at least 3 characters and not be empty.',
      });
      return;
   }

   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (!emailPattern.test(email)) {
      Swal.fire({
         icon: 'error',
         title: 'Invalid Email',
         text: 'Please enter a valid email address.',
      });
      return;
   }

   const phonePattern = /^(011|012|010|015)\d{8}$/;
   if (!phonePattern.test(phone)) {
      Swal.fire({
         icon: 'error',
         title: 'Invalid Phone Number',
         text: 'Phone number must start with 011, 012, 010, or 015 and contain 11 digits.',
      });
      return;
   }

   if (city === "") {
      Swal.fire({
         icon: 'error',
         title: 'City Not Selected',
         text: 'Please select a city.',
      });
      return;
   }

   const streetPattern = /[a-zA-Z]/;
   if (!streetPattern.test(street)) {
      Swal.fire({
         icon: 'error',
         title: 'Invalid Street',
         text: 'Street must contain at least one letter.',
      });
      return;
   }

   if (!role) {
      Swal.fire({
         icon: 'error',
         title: 'User Type Not Selected',
         text: 'Please select a user type (Admin or Seller or User).',
      });
      return;
   }

   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
   if (!passwordPattern.test(password)) {
      Swal.fire({
         icon: 'error',
         title: 'Invalid Password',
         text: 'Password must contain at least 6 characters, including an uppercase letter, a lowercase letter, and a special character.',
      });
      return;
   }

   if (!isUpdate) {
      if (isEmailRegistered(email)) {
         Swal.fire({
            icon: 'error',
            title: 'Email Already Registered',
            text: 'This email is already registered. Please use a different one.',
         });
         return;
      }
   }

   const encryptedPassword = encryptPassword(password);



   if (!isUpdate) {
      const newUser = {
         _id: `user${Date.now()}`,
         Name: name,
         Email: email,
         Phone: phone,
         City: city,
         Street: street,
         Password: encryptedPassword,
         Role: role,
         CreatedAt: new Date().toISOString(),
         TotalSales: role === "Seller" ? 0 : undefined,
         cart: role === "User" ? [] : undefined,
         //orders:userType=="User" ? [] : undefined

      }
      addUser(newUser);
   } else {
      const newUser = {
         _id: selecteduser._id,
         Name: name,
         Email: email,
         Phone: phone,
         City: city,
         Street: street,
         Password: password,
         Role: selecteduser.Role,
         CreatedAt: selecteduser.CreatedAt,
         TotalSales: role === "Seller" ? 0 : undefined,
         orders:userType=="User" ? [] : undefined

      }
      const index = data.Users.findIndex(u => u._id === selecteduser._id);
      if (index !== -1) {
         data.Users[index] = newUser;
      }
      saveDataInLocalStorage()
   }


   console.log("User added successfully!");

   if(!isUpdate){
      Swal.fire('Success', 'User registered successfully!', 'success').then(() => {
         loadDataFromLocalStorage();
      });
   }else{
      Swal.fire('Success', 'User Updated successfully!', 'success').then(() => {
         loadDataFromLocalStorage();
      });
   }

}

function isEmailRegistered(email) {
   return data.Users.some(user => user.Email === email);
}