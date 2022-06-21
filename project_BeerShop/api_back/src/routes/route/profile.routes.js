import { order_by_user } from '../../controllers/profile.controller.js';
import { update_user, update_pass } from '../../controllers/profile.controller.js';
import authRequest from '../../middleware/auth.js';
import express from 'express';

const router = express.Router();

router.get('/', authRequest, order_by_user);

router.post('/api/v1/update_user/:id', update_user);
router.post('/api/v1/update_pass/:id', update_pass);

export default router;