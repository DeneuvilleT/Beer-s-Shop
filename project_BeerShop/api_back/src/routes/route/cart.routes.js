import {
   home_cart,
   finalise_cart,
   finalise_order,
} from '../../controllers/cart.controller.js';

import express from 'express';


const router = express.Router();

router.get('/', home_cart);

router.post('/api/v1/finalise_cart/', finalise_cart);
router.post('/api/v1/finalise_order/', finalise_order);


export default router;