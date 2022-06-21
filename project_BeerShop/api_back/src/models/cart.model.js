import pool from "../config/db.js";

class Cart {

   static async setOrder(sql, datas) {
      const [query] = await pool.execute(sql, [...Object.values(datas)]);
      return [query];
   };


   static async getOrderByUser(id) {
      const sql = `
      SELECT * FROM order_resume 
      WHERE order_resume.id_buyer = ?`; 
      const [query] = await pool.execute(sql, [id]);
      return [query];
   };

};

export default Cart;