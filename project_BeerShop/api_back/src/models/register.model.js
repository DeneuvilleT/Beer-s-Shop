import pool from "../config/db.js";

class Register {

   static async setUser(datas) {
      const sql = `
      INSERT INTO user (id, lastname, firstname, email, password, adress,city, zip_code, status, validate) 
      VALUES (NULL,?,?,?,?,?,?,?,'buyer',0)`
      const [query] = await pool.execute(sql, [...Object.values(datas)]);
      return [query];
   };

   static async updateUser(datas, id) {
      const sql = `
      UPDATE user SET lastname = ?, firstname = ?, email = ?, adress = ?,city = ?, zip_code = ? WHERE id= ${id} `;
      const [query] = await pool.execute(sql, [...Object.values(datas)]);
      return [query];
   };

   static async updatePass(data, id) {
      const sql = `
      UPDATE user SET password = ? WHERE id= ${id} `;
      const [query] = await pool.execute(sql, [data]);
      return [query];
   };

   static async getAllUsers() {
      const sql = `SELECT * FROM user`;
      const [query] = await pool.execute(sql);
      return [query];
   };

   static async setValidateUser(mail) {
      const sql1 = "SELECT * FROM user WHERE user.email = ?";
      const [query1] = await pool.execute(sql1, [mail]);

      const sql2 = `UPDATE user SET validate = 1 WHERE user.email = ?`;
      const [query2] = await pool.execute(sql2, [mail]);

      return [query1];
   };

   static async getOneUser(id) {
      const sql = `SELECT * FROM user WHERE id = ?`;
      const [query] = await pool.execute(sql, [id]);
      return [query];
   };

};


export default Register;