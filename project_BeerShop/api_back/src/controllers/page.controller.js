import Product from "../models/product.model.js";
import Register from "../models/register.model.js";

export const home_page = async (req, res, next) => {
   try {
      const products = await Product.getAllProducts();
      if (!products[0].length) {
         throw Error

      } else {
         res.status(200).send(products[0]);

      };
   } catch (error) {
      console.log(error);
   };
}


export const check_user = async (req, res, next) => {

   const id = req.session.user.id

   try {
      const cart = await Register.getOneUser(id);
      if (!cart[0].length) {
         res.status(401);
         throw Error
      } else {
         res.status(200).send(cart[0]);
      };

   } catch (error) {
      console.log(error);
   };
};


