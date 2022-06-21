import { check_user } from '../controllers/page.controller.js';
import { home_page } from '../controllers/page.controller.js';
import register_router from './route/register.routes.js';
import product_router from './route/product.routes.js';
import profile_router from './route/profile.routes.js';
import admin_router from './route/admin.routes.js';
import cart_router from './route/cart.routes.js';
import authRequest from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

router.get("/", home_page);
router.use("/cart", cart_router);
router.use("/admin", admin_router);
router.use("/profile", profile_router);
router.use("/products", product_router);
router.use("/register", register_router);

router.get("/checkLog", authRequest, check_user)

export default router;