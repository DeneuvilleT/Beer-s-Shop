import { URL } from "../config/index";
import axios from "axios";

// New user
export const newUser = async (userForm) => {

   try {
      const res = await axios.post(`${URL}/register/api/v1/add_user`, {

         lastname: userForm[0].value,
         firstname: userForm[1].value,
         email: userForm[2].value,
         password: userForm[3].value,
         adress: userForm[4].value,
         city: userForm[5].value,
         zip_code: userForm[6].value,
      });

      if (res.data.status === 200) {
         await axios.post(`${URL}/register/api/v1/send_mail`, {
            
            email: userForm[2].value,
         });

         userForm.reset();
         return res.data;

      } else {
         userForm.reset();
         return res.data;

      }

   } catch (error) {
      console.log(error);
   };
};


// Update
export const updateUser = async (userForm, user) => {

   try {
      const res = await axios.post(`${URL}/profile/api/v1/update_user/${user.id}`, {

         lastname: userForm[0].value  === '' ? user.lastname   : userForm[0].value,
         firstname: userForm[1].value === '' ? user.firstname  : userForm[1].value,
         email: userForm[2].value     === '' ? user.email      : userForm[2].value,
         adress: userForm[3].value    === '' ? user.adress     : userForm[3].value,
         city: userForm[4].value      === '' ? user.city       : userForm[4].value,
         zip_code: userForm[5].value  === '' ? user.zip_code   : userForm[5].value,
      });
      
      if (res.data.status === 200) {
         userForm.reset();
         return res.data;

      } else {
         userForm.reset();
         return res.data;

      }

   } catch (error) {
      console.log(error);
   };
};


// PassWord
export const updatePass = async (form, user) => {

   try {
      const res = await axios.post(`${URL}/profile/api/v1/update_pass/${user.id}`, {

         password: form.value
      });

      if (res.data.status === 200) {
         form.value = ''; 
         return res.data;

      } else {
         form.value = '';
         return res.data;

      }

   } catch (error) {
      console.log(error);
   };
};


// Login
export const logUser = async (logForm) => {
   
   try {
      
      const req = await axios.post(`
      ${URL}/register/api/v1/log_user`, {
         
         emailLog: logForm[0].value,
         passwordLog: logForm[1].value,
      });
      
      const res = await req.data;

      if (res.status === 200) {
         logForm.reset();
         localStorage.setItem("token", res.token);
         return res;
         
      } else {
         logForm.reset();
         return res;
      };
      
   } catch (error) {
      console.log(error);
   };
};


// Generate headers for check auth
export const setHeaders = async (url) => {

   try {
      const req = await axios.get(url,
         { headers: { 'x-access-token': localStorage.getItem("token") } },
      );

      const res = await req.data;
      return res;

   } catch (error) {
      console.log(error);
   };
};