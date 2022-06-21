import { URL } from "../config/index";
import axios from "axios";

export const removeItem = async (item, index) => {

   try {
      const req = await axios.get(`${URL}/admin/api/v1/delete_${item}/${index}`);

      const reqJson = await req.data;
      return reqJson;

   } catch (error) {
      console.log(error);
   };
};


export const orderDetail = async (index) => {

   try {
      const req = await axios.get(`${URL}/admin/api/v1/order_detail/${index}`);

      const reqJson = await req.data;
      return reqJson;

   } catch (error) {
      console.log(error);
   };
};
