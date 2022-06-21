import pool from "../config/db.js";

class Product {

   static async getAllProducts() {
      const sql = `SELECT * FROM product`;
      const [query] = await pool.execute(sql);
      return [query];
   };

};

export default Product;