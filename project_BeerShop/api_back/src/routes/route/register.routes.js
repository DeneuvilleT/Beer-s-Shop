import {
   home_register,
   add_user,
   log_user,
   user_validate,
   send_user_mail,
} from '../../controllers/register.controller.js';

import express from 'express';

const router = express.Router();

router.get('/', home_register);

router.get('/api/v1/user_validate/:email', user_validate);

router.post('/api/v1/add_user', add_user);
router.post('/api/v1/log_user', log_user);
router.post('/api/v1/send_mail', send_user_mail);

export default router;