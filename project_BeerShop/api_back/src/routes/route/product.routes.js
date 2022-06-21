import {
   home_product,
} from '../../controllers/product.controller.js';

import express from 'express';


const router = express.Router();

router.get('/', home_product);


export default router;