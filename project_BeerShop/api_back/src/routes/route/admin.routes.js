import {
   home_admin,
   all_orders,
   delete_user,
   delete_order,
   delete_product,
   add_product,
   order_detail,
} from '../../controllers/admin.controller.js';

import express from 'express';
import authRequest from '../../middleware/auth.js';

const router = express.Router();


// INIT
router.get('/', authRequest, home_admin);
router.get('/orders', all_orders);

// DELETE 
router.get('/api/v1/delete_user/:id', delete_user);
router.get('/api/v1/delete_order/:id', delete_order);
router.get('/api/v1/delete_product/:id', delete_product);

// ADD Product
router.post('/api/v1/add_product', add_product);

// DETAIL ORDER
router.get('/api/v1/order_detail/:id', order_detail);


export default router;