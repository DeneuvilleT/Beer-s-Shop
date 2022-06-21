import Admin from "../models/admin.model.js";


export const home_admin = async (req, res, next) => {

   if (req.session.isLogged) {
      try {

         const datas = await Admin.getAll();

         if (!datas.length) {
            throw Error;

         } else {
            return res.status(200).send(datas);

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


export const all_orders = async (req, res, next) => {

   try {

      const orders = await Admin.getAllOrders();
      if (!orders[0].length) {
         throw Error;

      } else {
         return res.status(200).send(orders[0]);

      };

   } catch (error) {
      console.log(error)
   };
};


export const order_detail = async (req, res, next) => {

   const id = req.params.id;

   try {

      const orders = await Admin.getOneOrder(id);

      if (!orders[0].length) {
         throw Error;

      } else {
         return res.status(200).send(orders[0]);

      };

   } catch (error) {
      console.log(error);
   };
};



export const add_product = async (req, res, next) => {

   const datas = {
      title: req.body.title,
      container: req.body.container.toLowerCase(),
      cover: req.body.cover,
      description: req.body.description,
      price: req.body.price,
   };

   const sql = `INSERT INTO product (id, title, container, cover, description, price) 
   VALUES (NULL,?,?,?,?,?)`;

   try {
      await Admin.setProduct(sql, datas);
      res.json({
         status: 200,
         msg: "Produit ajouté à la base de donnée",
      });

   } catch (error) {
      console.log(error);
   };
};



export const delete_user = async (req, res, next) => {

   const id = req.params.id;

   try {

      await Profile.getDeleteUser(id)
      res.json({
         status: 200,
         msg: "Client supprimé",
      });

   } catch (error) {
      res.json({
         status: 401,
         msg: "Supression impossible, le client est probablement lié à une commande",
      });

   };
};


export const delete_order = async (req, res, next) => {

   const id = req.params.id;

   try {

      await Admin.getDeleteOrder(id)
      res.json({
         status: 200,
         msg: "Commande supprimée",
      });

   } catch (error) {
      res.json({
         status: 401,
         msg: "Probléme lors de la supression de la commande",
      });

   };
};


export const delete_product = async (req, res, next) => {

   const id = req.params.id;

   try {

      await Admin.getDeleteProduct(id)
      res.json({
         status: 200,
         msg: "Supprimé",
      });

   } catch (error) {
      res.json({
         status: 401,
         msg: "Supression impossible, le produit est probablement lié à une commande",
      });

   };
};