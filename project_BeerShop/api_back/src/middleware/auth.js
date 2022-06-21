import jwt from 'jsonwebtoken';
import 'dotenv/config';


const authRequest = async (req, res, next) => {

   const token = req.headers["x-access-token"];

   if (token === undefined) {
      return res.json({
         status: 401,
         msg: "Vous n'avez pas l'autorisation nécessaire"
      })

   } else {
      jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
         if (error) {
            return res.json({
               status: 401,
               msg: "Accés refusé"
            })

         } else {
          
            req.session.isLogged = true;
            req.session.user = decoded.datas[0]
            req.session.role = decoded.datas[0].status;
            next();
         };
      });
   };
};


export const generateToken = (datas) => {
   return jwt.sign(datas, process.env.SECRET_TOKEN);
};


export default authRequest;