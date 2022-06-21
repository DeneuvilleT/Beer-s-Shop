import pool from "../config/db.js";

class Admin {

   static async setProduct(sql, datas) {
      const [query] = await pool.execute(sql, [...Object.values(datas)]);
      return [query];
   };

   static async getAll() {
      const sql1 = `SELECT * FROM user`;
      const sql2 = `SELECT * FROM product`;
      const sql3 = `SELECT * FROM order_resume`;

      const [query1] = await pool.execute(sql1);
      const [query2] = await pool.execute(sql2);
      const [query3] = await pool.execute(sql3);

      return [query1, query2, query3];
   };

   static async getAllOrders() {
      const sql = `SELECT * FROM order_resume`;
      const [query] = await pool.execute(sql);
      return [query];
   };

   static async getOneOrder(id) {
      const sql = `
      SELECT * FROM order_detail 
      INNER JOIN order_resume ON order_detail.id_order = order_resume.id 
      INNER JOIN product ON product.id = order_detail.id_product
      INNER JOIN user ON user.id = order_resume.id_buyer
      WHERE order_detail.id_order = ?`;
      const [query] = await pool.execute(sql, [id]);
      return [query];
   };

   static async getDeleteOrder(id) {
      const sql = `DELETE FROM order_resume WHERE id = ?`;
      const query = await pool.execute(sql, [id]);
      return query;
   };

   static async getDeleteProduct(id) {
      const sql = `DELETE FROM product WHERE id = ?`;
      const query = await pool.execute(sql, [id]);
      return query;
   };

};


export default Admin;