import Product from "../models/product.model.js"


export const home_product = async (req, res, next) => {
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
};


export const product_detail = async (req, res, next) => {

   const id = req.params.id;

   try {
      const products = await Product.getOneProduct(id);
      if (!products[0].length) {
         throw Error

      } else {
         res.status(200).send(products[0]);

      };
   } catch (error) {
      console.log(error);
   }
}