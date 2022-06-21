import Cart from "../models/cart.model.js";
import Register from "../models/register.model.js";



export const home_cart = async (req, res, next) => {

   const id = req.session.user.id

   try {
      const cart = await Register.getOneUser(id);
      if (!cart[0].length) {
         throw Error

      } else {
         res.status(200).send(cart[0]);
      };

   } catch (error) {
      console.log(error);
   };
};


export const finalise_order = async (req, res, next) => {

   const datas = {
      status: req.body.status,
      id_buyer: req.body.id_buyer,
   };

   const sql = `INSERT INTO order_resume 
   ( id, order_date, status, id_buyer) VALUES (NULL,NOW(),?,?)`

   try {
      const order = await Cart.setOrder(sql, datas);

      return res.json({
         id: order[0].insertId,
         status: 200,
         msg: "La facture a été généré",
      });

   } catch (error) {
      console.log(error);
   }
}


export const finalise_cart = async (req, res, next) => {

   const datas = {
      id_product: req.body.id_product,
      item_quantity: req.body.item_quantity,
      price_each: req.body.price_each,
      total: req.body.total,
      id_order: req.body.id_order,
   };

   const sql = `INSERT INTO order_detail ( id, id_product, quantity, 
   price_each, total, id_order) VALUES (NULL,?,?,?,?,?)`

   try {

      const order = await Cart.setOrder(sql, datas);

      return res.json({
         id: order[0].insertId,
         status: 200,
         msg: "Votre panier est validé",
      });

   } catch (error) {
      console.log(error);
   }
}
