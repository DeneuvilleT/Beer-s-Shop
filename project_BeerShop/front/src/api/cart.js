import { URL } from '../config/index';
import axios from "axios";


export const finishBuying = async (infos, cart, cartTotal) => {

   try {

      // Generate Order
      const validateOrder =
         await axios.post(`${URL}/cart/api/v1/finalise_order/`, {

            status: "in progress",
            id_buyer: infos.id,
            
         });

      // Generate Order Details
      await cart.forEach((item) => {
         axios.post(`${URL}/cart/api/v1/finalise_cart/`, {

            id_product: item.id,
            item_quantity: item.item_quantity,
            price_each: item.price,
            total: cartTotal,
            id_order: validateOrder.data.id,

         });
      });

   } catch (error) {
      console.log(error);
   };
};