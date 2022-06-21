import { URL } from "../config/index";
import axios from "axios";

export const allProduct = async () => {

   try {
      const req = await axios.get(`${URL}/products`)
      return req;

   } catch (error) {
      console.log(error);
   };
};


export const addProduct = async (productForm) => {

   try {
      const req = await axios.post(`${URL}/admin/api/v1/add_product`, {

         title: productForm[0].value,
         container: productForm[1].value,
         cover: productForm[2].value,
         description: productForm[3].value,
         price: productForm[4].value
      });
      
      return req;

   } catch (error) {
      console.log(error);
   };
};

