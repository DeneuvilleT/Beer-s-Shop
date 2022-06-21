import Register from "../models/register.model.js";
import Cart from "../models/cart.model.js";
import bcrypt from 'bcrypt';

export const order_by_user = async (req, res, next) => {

   if (req.session.isLogged) {
      try {
         
         const id = req.session.user.id
         const orders = await Cart.getOrderByUser(id);

         if (!orders[0].length) {
            throw Error;

         } else {
            return res.status(200).send(orders[0]);

         };

      } catch (error) {
         console.log(error)
      };
   } else {
      return res.json({
         status: 401,
         msg: "Accés refusé"
      });
   };
};


export const update_user = async (req, res, next) => {

   const id = req.params.id;

   const datas = {

      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      adress: req.body.adress,
      city: req.body.city,
      zip_code: req.body.zip_code,
   };

   try {
      await Register.updateUser(datas, id);
      return res.json({
         status: 200,
         msg: "Votre profil a été mis à jour",
      });

   } catch (error) {
      console.log(error);
   };
};


export const update_pass = async (req, res, next) => {

   const id = req.params.id;

   const hased = await bcrypt.hash(req.body.password, 10);

   try {
      await Register.updatePass(hased, id);
      return res.json({
         status: 200,
         msg: "Votre mot de passe a été mis à jour",
      });

   } catch (error) {
      console.log(error);
   };
};